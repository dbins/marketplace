import api from "../../services/api";
import { call, put } from "redux-saga/effects";
import { Creators as FavoritosActions } from "../ducks/favoritos";

export function* getFavoritos() {
  try {
    const response = yield call(api.get, "/favoritos");
    yield put(FavoritosActions.getFavoritosSuccess(response.data));
	
  } catch (err) {
    yield put(FavoritosActions.getFavoritosFailure("Erro ao buscar favoritos da API"));
  }
}