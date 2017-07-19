const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};
const locale = 'es-CR';
export var getTodayWithFormat = function() {
    return new Date().toLocaleDateString(locale, options);
};
export var getToday = function() {
    return new Date();
};
export const formatDate = function(date){
    return new Date(date).toLocaleDateString(locale, options);
}