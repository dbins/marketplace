import { all, takeLatest } from "redux-saga/effects"; // takelatest pega a ultima requisicao
import { Types as ClientesTypes } from "../ducks/clientes";
import { Types as MapasTypes } from "../ducks/mapas";
import { Types as CategoriasTypes } from "../ducks/categorias";
import { Types as FavoritosTypes } from "../ducks/favoritos";
import { getClientes } from "./clientes";
import { getMapas } from "./mapas";
import { getCategorias } from "./categorias";
import { getFavoritos } from "./favoritos";
export default function* rootSaga() {
  return yield all([
    takeLatest(ClientesTypes.GET_REQUEST, getClientes),
    takeLatest(MapasTypes.GET_REQUEST, getMapas),
    takeLatest(CategoriasTypes.GET_REQUEST, getCategorias),
	takeLatest(FavoritosTypes.GET_REQUEST, getFavoritos),
  ]);
}
