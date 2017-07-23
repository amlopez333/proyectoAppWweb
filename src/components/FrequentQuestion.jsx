import React, { Component } from 'react';

class FrequentQuestion extends Component{
    render(){
        return(
            <div className="FAQ">            
            <h2 className="Question">¿Qué es el Mercado de Valores?</h2>
            <p className="Answer">          
                El mercado de valores está compuesto por todas aquellas operaciones en las que se 
                ceden instrumentos de carácter transferible.
                Puede ser dividido en:
                <ul>
                    <li><b>Mercado Bursátil: </b> operaciones organizadas y reglamentadas por 
                    instituciones formales y expecializadas, llamadas Bolsa de Valores.</li>
                    <li><b>Mercado fuera de la Bolsa: </b> aquellas operaciones que se 
                    realizan fuera de recintos bursátiles. Estas son efectuadas por intermediarios 
                    que actúan de forma paralela a los corredores de bolsa (Sociedades financieras, 
                    agentes de valores, etc).</li>
                </ul>                                
            </p>            
            <h2 className="Question">¿Qué es una acción?</h2>
            <p className="Answer">
                Una acción es instrumentos de renta variable emitidos por sociedades anónimas, 
                que representan un título de propiedad sobre una fracción de patrimonio
                 de la empresa, es decir, un comprador de una acción pasa a ser propietario de 
                 parte de la empresa emisora.
            </p>
            <h2 className="Question">¿Qué es un inversionista?</h2>
            <p className="Answer">Es la persona natural o jurídica que invierte sus
                recursos en la adquisición de acciones, obligaciones u otro valor 
                para lograr rentabilidad y liquidez, así como obtener ganancias en las
                transferencias de valores, en función de las alzas y bajas de las 
                cotizaciones.
            </p>
            <h2 className="Question">¿Qué es tolerancia de riesgo?</h2>
            <p className="Answer">
                Se refiere al nivel de riesgo que se está dispuesto a aceptar frente a periodos 
                de volatilidad del mercado. Para obtener una mayor rentabilidad en el largo plazo,
                un inversionista deberá asumir un mayor riesgo. Es probable que esta varíe
                a través de largos periodos de tiempo.
            </p>
            <h2 className="Question">¿Por qué invertir en el Mercado de valores?</h2>
            <p className="Answer">
                El mercado brinda al inversionista:<br/>
                <ul>
                    <li>Un mercado tranparente que tiene como fin una óptima formación de 
                        precios.</li>
                    <li>Opción de escoger entre diversas alternativas en función a las preferencias 
                        de riesgo y rendimientos.</li>
                    <li>Posibilidad de mayor rentabilidad por su inversión.</li>
                    <li>Posibilidad de diversificar sus inversiones.</li>
                </ul>
            </p>           
            
            </div>
        )
    }
}

export default FrequentQuestion