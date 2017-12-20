import * as types from '../types/characters'
import { fetch } from '../../webservices/werbservices'
import { Actions } from 'react-native-router-flux'

function updateCharactersList(value) { 
    return {
        type: types.CHARACTERS_UPDATE_LIST,
        value: value
    }
}

function setCharactersFetching(value) {
    return {
        type: types.CHARACTERS_SET_FETCHING,
        value: value
    }
}

export function updateCharacterSelected(character) {
    return {
        type: types.CHARACTERS_UPDATE_CHARACTER,
        character: character
    }
}

export function fetchCharactersList() {
    return (dispatch, getState) => {

        dispatch(setCharactersFetching(true))
    
        const fetchUrl = '/characters?limit=50&offset=50'  //lista de personajes
        fetch( fetchUrl ).then(response => {

            //console.log("fetchCharactersList"," response: ", response.data)
            dispatch(setCharactersFetching(false))
            dispatch(updateCharactersList(response.data.results)) // Actualizamos el reducer con el listado

        }).catch( error => {

            console.log("fetchCharactersList error: ", error)
            dispatch(setCharactersFetching(false))

        })
    }
}
