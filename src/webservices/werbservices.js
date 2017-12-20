import axios from 'axios'
import * as constants from './constants'

export function configureAxios() {
    axios.defaults.baseURL = constants.BASE_URL;
    //axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
}

export function fetch(url) {
    return new Promise(function(resolve, reject) {

        axios.get(url).then( response => {

            if(response.data)
                resolve( response.data )
            else 
                reject( response )

        }).catch( error => {
            reject( error )
        });

    })
}
