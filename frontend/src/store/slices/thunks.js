import { tokenApi } from "../../api/tokenApi";
import { setToken, checkToken, setTimer } from "./tokenSlice"

/**
 * Peticiones http
 * el getstate nos sirve para tener info del estado como auth
 */
export const getToken = ( usuario) => {
    return async ( dispatch, getState ) => {
        //http://localhost:8000/token/generarToken/rogwi3
        const {data} = await tokenApi.get(`/generarToken/${ usuario}/`);

        //seteo el estado con la data y timer
        dispatch( setToken({ token: data.token_60s, tiempo: 60}));
    }
}
export const usarToken = (usuario, token) => {
    ///usarToken/:usuario/:token
    return async (dispatch, getState) => {
        const {data} = await tokenApi.get(`/usarToken/${ usuario}/${token}`);
        //chekeo si el token es valido
        dispatch( checkToken({ check: data.data}));
    }
}

export const updateTimer = () => {
    return async (dispatch, getState) => {
        dispatch( setTimer());
    }
}