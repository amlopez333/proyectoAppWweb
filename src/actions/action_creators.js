export var setState = function(state) {
    return {
        type: 'SET_STATE',
        state
    };
};

export var search = function(filter) {
    return {
        type: 'SEARCH',
        filter
    };
};

export var cancelSearch = function() {
    return {
        type: 'CANCEL_SEARCH'
    }
};

export var updateRevisionDate = function(itemId, date) {
    return {
        type: 'UPDATE_REVISION_DATE',
        itemId,
        date
    };
};

export var addItem = function(placa, codigo, marca, modelo, ubicacion, responsable, idResponsable, categoria, idCategoria, descripcion) {
    return {
        type: 'ADD_ITEM',
        placa,
        codigo,
        marca,
        modelo,
        ubicacion,
        responsable,
        idResponsable,
        categoria,
        idCategoria,
        descripcion
    };
};

export var headerChange = function(title, desc, iconNm) {
    return {
        type: 'HEADER_CHANGE',
        title,
        desc,
        iconNm
    };
};