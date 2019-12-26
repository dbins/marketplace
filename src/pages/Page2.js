import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  Button,
  Image,
  View,
  ListView,
  ScrollView,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ListItem, SearchBar} from 'react-native-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as ClientesActions } from '../store/ducks/clientes';
import Images from './Images';
import Header from '../components/Header';
import Anuncios from '../components/Anuncios';
var width = Dimensions.get('window').width - 30; //full width
const height = 220;
//https://www.npmjs.com/package/react-native-xml2js

var categoria = 0;
const clientes = [
	{"nome":"a","endereco":"domingos teodoro gallo 12","ddd":"14","telefone":"3351- 2573","cidade":"PIRAJU", "estado":"SP","imagem":require('../assets/acougue.jpg'),"codigo":"9"},
    {"nome":"a","endereco":"francisco a. almeida560","ddd":"14","telefone":"3351- 2573","cidade":"PIRAJU", "estado":"SP","imagem":require('../assets/acougue.jpg'),"codigo":"12"},
        {"nome":"agilize com","endereco":"av. dr. domingos teodoro galo 91 centro","ddd":"0","telefone":"","cidade":"PIRAJU", "estado":"SP","imagem":require('../assets/construcao.jpg'),"codigo":"517"},
        {"nome":"alic","endereco":"rua davi arruda sobrinho 200 bairro augusto morini","ddd":"0","telefone":"","cidade":"PIRAJU", "estado":"SP","imagem":require('../assets/vestuario.jpg'),"codigo":"567"},
        {"nome":"arquiteta let","endereco":"rua major mariano 1056 - centro","ddd":"14","telefone":" 3351-728","cidade":"PIRAJU", "estado":"SP","imagem":require('../assets/servicos.jpg'),"codigo":"469"},
        {"nome":"arquiteta marielle calesco","endereco":"rua major mariano 1056 ","ddd":"14","telefone":" 3351-728","cidade":"PIRAJU", "estado":"SP","imagem":require('../assets/servicos.jpg'),"codigo":"586"},
        {"nome":"art gardens","endereco":"av. milton asp","ddd":"14","telefone":" 9720-329","cidade":"PIRAJU", "estado":"SP","imagem":require('../assets/servicos.jpg'),"codigo":"661"},
        {"nome":"auto escola objetiva","endereco":"rua 13 de maio 844","ddd":"0","telefone":"","cidade":"PIRAJU", "estado":"SP","imagem":require('../assets/automotivo.jpg'),"codigo":"525"},
        {"nome":"auto escola sta maria","endereco":"rua carlos de campos 670","ddd":"14","telefone":" 3351-1","cidade":"PIRAJU", "estado":"SP","imagem":require('../assets/automotivo.jpg'),"codigo":"650"},
        {"nome":"auto moto escola","endereco":"r carlos de campos 287 - centro","ddd":"14","telefone":"3351-2001","cidade":"PIRAJU", "estado":"SP","imagem":require('../assets/automotivo.jpg'),"codigo":"21"},
        {"nome":"auto moto escola","endereco":"r carlos de campos 287 - centro","ddd":"14","telefone":"3351-2001","cidade":"PIRAJU", "estado":"SP","imagem":require('../assets/automotivo.jpg'),"codigo":"20"},
        {"nome":"bar do binha","endereco":"rua 13 de maio 192","ddd":"14","telefone":" 3351-3","cidade":"PIRAJU", "estado":"SP","imagem":require('../assets/bares.jpg'),"codigo":"478"},
        {"nome":"bar do brimo","endereco":"rua carlos de campos 622","ddd":"14","telefone":" 3351-3","cidade":"PIRAJU", "estado":"SP","imagem":require('../assets/bares.jpg'),"codigo":"477"},
        {"nome":"bar do jovem","endereco":"rua 13 de maio 790","ddd":"14","telefone":" 3351-3","cidade":"PIRAJU", "estado":"SP","imagem":require('../assets/bares.jpg'),"codigo":"474"},
        {"nome":"bar e lanchonete matos","endereco":"p","ddd":"14","telefone":" 3351-2","cidade":"PIRAJU", "estado":"SP","imagem":require('../assets/bares.jpg'),"codigo":"476"},
        {"nome":"bar e mercearia da est","endereco":"av. humberto martignoni 986","ddd":"14","telefone":" 3351-1","cidade":"PIRAJU", "estado":"SP","imagem":require('../assets/bares.jpg'),"codigo":"475"},
];
class Page2 extends Component {

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func
    }).isRequired,
    getClientesRequest: PropTypes.func.isRequired,
    clientes: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          codigo: PropTypes.string,
          nome: PropTypes.string,
		  endereco: PropTypes.string,
		  ddd: PropTypes.string,
		  telefone: PropTypes.string,
		  cidade: PropTypes.string,
		  estado: PropTypes.string,
          imagem: PropTypes.string,
        })
      ),
      loading: PropTypes.bool
    })
  };
  
  static navigationOptions = {
    tabBarLabel: 'Anunciantes',
    tabBarIcon: ({tintColor}) => (
      <Icon name="list" size={20} color={tintColor} />
    ),
  };

  constructor(props) {
    super(props);

    this.state = {
	  categoria: "0",
      loading: false,
      data: [],
      error: null,
      isModalVisible: false,
      item: {},
    };

    this.arrayholder = [];
  }

  toggleModal = item => {
	//console.tron.log(item);
	var imagem = item.imagem.replace('.jpg', '');
	imagem = imagem.replace('-', '');
	item.imagem = Images.logos[imagem];
	console.tron.log('MODAL');
	console.tron.log(item);
    this.setState({item: item});
    this.setState({isModalVisible: !this.state.isModalVisible});
  }

  componentDidMount() {
	//this.makeRemoteRequest();
	categoria = this.props.navigation.getParam('imagem', '0');
	this.setState({loading: false, categoria: categoria});
	//this.props.getClientesRequest();
  }

  makeRemoteRequest = () => {
    const url = `https://randomuser.me/api/?&results=20`;
    this.setState({loading: true});

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.results,
          error: res.error || null,
          loading: false,
        });
        this.arrayholder = res.results;
      })
      .catch(error => {
        this.setState({error, loading: false});
      });
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.props.clientes.data.filter(item => {
      const itemData = `${item.nome.toUpperCase()} ${item.endereco.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Pesquisar por..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };
  
 
  componentDidUpdate(prevProps) {
	if (prevProps.navigation.getParam('imagem', '0') !== this.props.navigation.getParam('imagem', '0')) {
		console.tron.log(this.props.navigation.getParam('imagem', '0'));
		this.setState({categoria: this.props.navigation.getParam('imagem', '0')});
	}
 }
  
  renderGridItem( item ) {
	var imagem = item.imagem.replace('.jpg', '');
	imagem = imagem.replace('-', '');
    return (
    <TouchableOpacity onPress={() => this.toggleModal(item)}>
		<ListItem
            leftAvatar={{source: Images.logos[imagem]}}
            title={item.nome}
            subtitle={`${item.ddd} ${item.telefone}`}
        />
    </TouchableOpacity>
    );
	}

  render() {
	return (
      <View style={{flex: 1}}>
	    <Header title="Anunciantes" navigation={this.props.navigation} />
		<Anuncios categoria={this.state.categoria} navigation={this.props.navigation}/>
        <Modal isVisible={this.state.isModalVisible}>
          <View style={{flex: 1, backgroundColor: '#fff', padding: 20}}>
            <Image source={this.state.item.imagem}  style={{width:250,height:200}}/>
			<Text>{this.state.item.nome}</Text>
			<Text>{this.state.item.endereco}</Text>
			<Text>{this.state.item.ddd} - {this.state.item.telefone}</Text>
            <Button  onPress={() => this.toggleModal(this.state.item)}
              title="Fechar"
            />
          </View>
        </Modal>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
});


const mapStateToProps = state => ({
  clientes: state.clientes
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ClientesActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page2);