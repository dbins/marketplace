import api from "../../services/api";
import { call, put } from "redux-saga/effects";
import { Creators as MapasActions } from "../ducks/mapas";

export function* getMapas() {
  try {
    const response = yield call(api.get, "/mapas");
    yield put(MapasActions.getMapasSuccess(response.data));
  } catch (err) {
    yield put(MapasActions.getMapasFailure("Erro ao buscar mapas da API"));
  }
}