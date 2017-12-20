import axios from 'axios'
import * as constants from './constants'

//Configura Axios, para todas las llamadas
export function configureAxios() {
    axios.defaults.baseURL = constants.BASE_URL;
    axios.defaults.headers.common['Referer'] = constants.MARVEL_REFERER;
    axios.defaults.headers.post['Content-Type'] = constants.BASE_CONTENT_TYPE;
}

export function fetch(url) {
    return new Promise(function(resolve, reject) {

        console.log('fetch del web service')

        //A las URL de solicitidud añadimos siempre el API KEY Publica
        const urlFinal = url + '&apikey=' + constants.MARVEL_PUBLIC_API_KEY

        axios.get(urlFinal).then( response => {

            if(response.data)
                resolve( response.data )
            else 
                reject( response )

        }).catch( error => {
            reject( error )
        });

    })
}
