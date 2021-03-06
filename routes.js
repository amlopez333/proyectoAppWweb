const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = require('./models/user');
const buySchema = require('./models/buy');
const sellSchema = require('./models/sell');
const express = require('express');
const router = express.Router();
//mongo config, should be done using environment variables or config file
const mongoDB = process.env.DB || 'mongodb://localhost/daquantrader';
//
//mongoose.connect(mongoDB);
//const connection = mongoose.connection;
//connect.on('error', console.error.bind(console, 'MongoDB connection error: '));

//login
router.post('/login', function(req, res, next){
    const email = req.body.email;
    const password = req.body.password
    mongoose.connect(mongoDB);
    const connection = mongoose.connection;
    //connection.on('error', console.error.bind(console, 'MongoDB connection error: '));
    connection.on('error', function(error){
        connection.close();
        error.status = 500;
        return next(error);
    });
    connection.once('open', function() {
    console.log('tuna');
});
    userSchema.findOne(function(error, result){
        if(error){
            return res.status(200).json({message: 'Invalid Login: ' + error.message});
        };
        connection.close();
        if(result){
            return res.status(200).json({userId: result._id});
        }
        return res.status(420).json({message: 'Invalid Login'})
    }).and([{email: email},{password: password}])
});
router.post('/register', function(req, res, next){
    const user = new userSchema({
        name: req.body.name,
        lastName: req.body.lastName,
        ssn: req.body.ssn,
        email: req.body.email,
        password: req.body.password,
        accountType: 'Savings Account',
        accountNumber: '002-156975-12264',
        currentCashBalance: 10000,
        portfolio: []
    });
    mongoose.connect(mongoDB);
    const connection = mongoose.connection;
    //connection.on('error', console.error.bind(console, 'MongoDB connection error: '));
    connection.on('error', function(error){
        connection.close();
        error.status = 500;
        return next(error);
    });
    user.save(function(error, result){
        if(error){
            connection.close();
            return res.status(420).json({message: 'Error registering ' + error.message});
        }
        connection.close();
        return res.status(201).json({message: 'Registered'})  
    })
});
router.post('/buy/:userId', function(req, res, next){
    const userId = req.params.userId;
    const ticker = req.body.ticker;
    const name = req.body.name
    const price = Number(req.body.price);
    const amount = Number(req.body.amount);
    mongoose.connect(mongoDB);
    const connection = mongoose.connection;
    //connection.on('error', console.error.bind(console, 'MongoDB connection error: '));
    connection.on('error', function(error){
        connection.close();
        error.status = 500;
        return next(error);
    });
    const buy = new buySchema({
        userId: userId,
        ticker: ticker,
        name: name,
        price: price,
        amount: amount
    });
    buy.save(function(error, result){
        if(error){
            connection.close();
            return res.status(420).json({message: 'Error buying ' + error.message});
        }
        userSchema.findById(userId, function(error, user){
            if(error){
                connection.close();
                return res.status(420).json({message: 'Error selling ' + error.message});
            }
            user.portfolio.push({_id: mongoose.Types.ObjectId(), ticker: ticker, name: name, price: price, dateBought: new Date(), amount: amount })
            user.currentCashBalance -= price*amount - 6.75
            //console.log(user.portfolio.id(_id).amount);
            user.save(function(error, result){
                console.log(error, result);
            })
            connection.close();
            return res.status(201).json({message: 'Created'});
        })
       
    });
});
router.post('/sell/:userId', function(req, res, next){
    const userId = req.params.userId;
    const _id = req.body.portfolioId;
    //const ssn = req.body.ssn;
    const ticker = req.body.ticker;
    const name = req.body.name
    const price = req.body.price;
    const amount = req.body.amount;
    console.log(_id);
    mongoose.connect(mongoDB);
    const connection = mongoose.connection;
    //connection.on('error', console.error.bind(console, 'MongoDB connection error: '));
    connection.on('error', function(error){
        connection.close();
        error.status = 500;
        return next(error);
    });
    console.log('tuna');
    const sell = new sellSchema({
        userId: userId,
        ticker: ticker,
        name: name,
        price: price,
        amount: amount
    });
    sell.save(function(error, result){
        if(error){
            connection.close();
            return res.status(420).json({message: 'Error selling ' + error.message});
        }   //connection.close();
    });
    userSchema.findById(userId, function(error, user){
            if(error){
                connection.close();
                return res.status(420).json({message: 'Error selling ' + error.message});
            }
            if(user.portfolio.id(_id).amount - amount === 0){
                user.portfolio.id(_id).remove();
                user.save(function(error, result){
                //console.log(user.portfolio.id(_id).amount);
                })
                connection.close();
                return res.status(201).json({message: 'Created'});
            }
            user.portfolio.id(_id).amount -= amount
            user.currentCashBalance += price*amount - 6.75
            //console.log(user.portfolio.id(_id).amount);
            user.save(function(error, result){
                console.log(error, result);
            })
            connection.close();
            return res.status(201).json({message: 'Created'});
        })
});
router.get('/portfolios/:userId', function(req, res, next){
    const userId = req.params.userId;
    mongoose.connect(mongoDB);
    const connection = mongoose.connection;
    //connection.on('error', console.error.bind(console, 'MongoDB connection error: '));
    connection.on('error', function(error){
        connection.close();
        error.status = 500;
        return next(error);
    });
    userSchema.findById(userId, function(error, user){
        connection.close();
        return res.status(200).json({message: 'OK', data: {currentCashBalance: user.currentCashBalance, portfolio: user.portfolio}});
    })
});

module.exports = router;




