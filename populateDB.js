db = db.getSiblingDB('daquantrader');

user1 = {
    _id: ObjectId(),
    name: 'Andrés',
    lastName: 'López',
    ssn: '115690009',
    email: 'amlopez333@gmail.com',
    password: 'pruebas',
    accountType: 'Roth IRA',
    accountNumber: '001-5602-789643',
    currentCashBalance: '401567',
    portfolio:[
        {_id: ObjectId(),
        ticker: 'FB',
        name: 'Facebook Inc',
        price: 38.05,
        dateBought: new Date('Aug, 02 2013'),
        amount: 500},
        {_id: ObjectId(),
        ticker: 'FSLR',
        name: 'First Solar, Inc',
        price: 43.97,
        dateBought: new Date('Oct, 04 2013'),
        amount: 300},
        {_id: ObjectId(),
        ticker: 'FDX',
        name: 'FedEx Corporation',
        price: 115.87,
        dateBought: new Date('Oct, 11 2013'),
        amount: 500},
        {_id: ObjectId(),
        ticker: 'AMGN',
        name: 'Amgen, Inc',
        price: 118.68,
        dateBought: new Date('Nov, 01 2013'),
        amount: 500},
        {_id: ObjectId(),
        ticker: 'TSLA',
        name: 'Tesla Inc',
        price: 121.38,
        dateBought: new Date('Nov, 22 2013'),
        amount: 400},
        {_id: ObjectId(),
        ticker: 'JNJ',
        name: 'Johnson & Johnson',
        price: 88.47,
        dateBought: new Date('Jan, 31 2014'),
        amount: 400},
        {_id: ObjectId(),
        ticker: 'ISRG',
        name: 'Intuitive Surgical, Inc',
        price: 353.06,
        dateBought: new Date('May, 04 2014'),
        amount: 500},
        {_id: ObjectId(),
        ticker: 'EXPE',
        name: 'Expedia Inc',
        price: 74.57,
        dateBought: new Date('Oct, 17 2014'),
        amount: 500},
        {_id: ObjectId(),
        ticker: 'MRK',
        name: 'Merck & Co., Inc',
        price: 49.60,
        dateBought: new Date('Sep, 25 2015'),
        amount: 400},
        {_id: ObjectId(),
        ticker: 'NVDA',
        name: 'NVIDIA Corporation',
        price: 67.57,
        dateBought: new Date('Nov, 04 2016'),
        amount: 300}
    ]
}
db.users.insert(user1);