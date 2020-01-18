/*  Reducers è una cartella che deve contenere le root, per mettere tutto insieme
 *  prende i reducer e li collega combinandoli
 */

 import { combineReducers } from 'redux';
 import itemReducer from './itemReducer';
 import errorReducer from './errorReducer';
 import authReducer from './authReducer';

 export default combineReducers({
     item: itemReducer,
     error: errorReducer,
     auth: authReducer
 });