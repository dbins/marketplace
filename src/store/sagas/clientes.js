import api from '../../services/api';
import { call, put } from 'redux-saga/effects';
import { Creators as ClientesActions } from '../ducks/clientes';

export function* getClientes(info) {
  console.tron.log(info);
  try {
	var filtro = "";
	if (info.payload.data != "0"){
		filtro = "?imagem=" + info.payload.data;
	}
    const response = yield call(api.get, '/clientes' + filtro);
    yield put(ClientesActions.getClientesSuccess(response.data));
  } catch (err) {
    yield put(ClientesActions.getClientesFailure('Erro ao buscar clientes da API'));
  }
}