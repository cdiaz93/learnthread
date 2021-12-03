import {isUndefined} from 'util';
import Cookies from 'universal-cookie';
import axios from 'axios';
import {APIHOST as host} from '../../app.json'

const cookies = new Cookies ();

export function calculaEspiracionSesion() {
    const now =new Date().getTime();
    const newDate = now + 60 * 30 * 1000;
    return new Date (newDate);
}

export function getSession(){
    return isUndefined(cookies.get('_s')) ? false : cookies.get('_s');
}

function renovarSession(){
    const sesion = getSession();
    if (!sesion) window.location.href ='/login';

    cookies.set('_s', sesion,{
    path: '/',
        expires: calculaEspiracionSesion(),
    });

    return sesion;
}

export const request ={
    get: function(services){
        let token = renovarSession();
        return axios.get (`${host}${services}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },

    post :function (services, data) {
        let token = renovarSession();
        return axios.post(`${host}${services}`, data, {
            headers: {
                Authorization : `Bearer ${token}`,
            },
        });
        
    },

    put :function (services, data) {
        let token = renovarSession();
        return axios.put(`${host}${services}`, data, {
            headers: {
                Authorization : `Bearer ${token}`,
            },
        });
        
    },

    delete: function (services){
        let token =renovarSession();
        return axios.delete(`${host}${services}`, {
            headers:{
                    Authorization: `Bearer ${token}`,
            },
        });
    },

    
};