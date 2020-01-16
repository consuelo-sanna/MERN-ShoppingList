/** Dove faremo la richiesta al backend */

import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';


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
        }));
    };


export const addItem = (item) => dispatch => {
    axios
        .post('/api/items', item)
        .then(res => dispatch({
            type: ADD_ITEM,
            payload: res.data
        }));
};


export const deleteItem = (id) => dispatch => {
    axios
        .delete(`/api/items/${id}`)
        .then(res => dispatch({
            type: DELETE_ITEM,
            payload: id
        }));
};



export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    };
};