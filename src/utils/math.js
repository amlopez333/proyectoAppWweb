export const round10 = function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}