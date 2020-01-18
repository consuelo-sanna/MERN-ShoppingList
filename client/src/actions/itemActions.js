/** Dove faremo la richiesta al backend */

import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';


/* manda un'azione al reducer, in questo caso di tipo GET_ITEMS che entra nello
 * switch e restituisce lo stato (in questo caso)
 *
 * a cosa serve dispatch? vedo che mi permette di chiamare un altra azione.. è un thunk?
*/
export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios
        .get('/api/items')   //avendo aggiunto il proxy non mi serve URI
        .then( res => dispatch({
            type: GET_ITEMS,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    };


export const addItem = (item) => (dispatch,getState) => {
    axios
        .post('/api/items', item, tokenConfig(getState))
        .then(res => dispatch({
            type: ADD_ITEM,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};


export const deleteItem = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/items/${id}`, tokenConfig(getState))
        .then(res => dispatch({
            type: DELETE_ITEM,
            payload: id
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};



export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    };
};