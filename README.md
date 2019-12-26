# Marketplace -  React Native

![Aplicativo](imagens/aplicativo.jpg)

Este é um aplicativo de classificados. O aplicativo possui a lista de categorias, anunciantes e um mapa.

Recursos que foram utilizados:

* Axios
* Redux
* Saga
* Reactotron
* React-Native-Maps

## Instalação

- git clone https://github.com/dbins/marketplace
- npm install
- Edite o arquivo /src/services/api.js e insira o endereço de IP da API
- Edite o arquivo /src/config/ReactotronConfig.js e informe o seu IP local. Essa etapa é opcional, é apenas para quem for testar a aplicação usando o Reactotron.
- Ative a API digitando o comando json-server server.json -H 192.168.0.100 -p 3001 -w -d 500. Substitua o "192.168.0.100" pelo IP de sua máquina.
- Abra o emulador. Os testes foram feitos no Windows 10 utilizando o emulador Genymotion (Android)
- react-native run-android
