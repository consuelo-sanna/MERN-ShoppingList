/*  Reducers è una cartella che deve contenere le root, per mettere tutto insieme
 *
 */

 import { combineReducers } from 'redux';
 import itemReducer from './itemReducer';

 export default combineReducers({
     item: itemReducer
 });