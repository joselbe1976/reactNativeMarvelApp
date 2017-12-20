import * as types from '../types/characters'
import { fetch } from '../../webservices/werbservices'
import { Actions } from 'react-native-router-flux'

function updateSeriesList(value) { 
    return {
        type: types.CHARACTERS_UPDATE_LIST,
        value: value
    }
}

function setSeriesFetching(value) {
    return {
        type: types.CHARACTERS_SET_FETCHING,
        value: value
    }
}

export function updateSeriesSelected(serie) {
    return {
        type: types.CHARACTERS_UPDATE_CHARACTER,
        character: serie
    }
}

export function fetchSeriesList(characters) {

    console.log('fetchSeriesList', 'characters',characters)

    return (dispatch, getState) => {

        dispatch(setSeriesFetching(true))
    
        const fetchUrl = '/series?characters=' + characters.id  //lista de Series de un personaje
        fetch( fetchUrl ).then(response => {

            console.log("fetchCharactersList"," response: ", response.data)
            dispatch(setSeriesFetching(false))
            dispatch(updateSeriesList(response.data.results)) // Actualizamos el reducer con el listado

        }).catch( error => {

            console.log("fetchCharactersList error: ", error)
            dispatch(setSeriesFetching(false))

        })
    }
}
