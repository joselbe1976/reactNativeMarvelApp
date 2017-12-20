import * as types from '../types/series'

const initialState = {
    isFetching: false,
    list: [],
    item: null, //por si quiero hacer un detalle de la serie seleccionada
}

export default function reducer( state = initialState, action = {} ) {

    switch (action.type) {
        
        case types.SERIES_UPDATE_LIST: 
            return {
                ...state,
                list: action.value,
            };

        case types.CHARACTERS_SET_FETCHING:
            return {
                ...state,
                isFetching: action.value,
            }

        default:
            return state;

    }
        
}