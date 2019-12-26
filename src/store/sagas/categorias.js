import api from "../../services/api";
import { call, put } from "redux-saga/effects";
import { Creators as CategoriasActions } from "../ducks/categorias";

export function* getCategorias() {
  try {
    const response = yield call(api.get, "/categorias");
    yield put(CategoriasActions.getCategoriasSuccess(response.data));
  } catch (err) {
    yield put(CategoriasActions.getCategoriasFailure("Erro ao buscar categorias da API"));
  }
}