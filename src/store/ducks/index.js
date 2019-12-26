import { combineReducers } from "redux";
import clientes from "./clientes";
import mapas from "./mapas";
import categorias from "./categorias";
import favoritos from "./favoritos";
export default combineReducers({
 clientes,
 mapas,
 categorias,
 favoritos
});