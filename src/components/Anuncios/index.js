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
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Creators as ClientesActions} from '../../store/ducks/clientes';
import Images from './Images';
import Lista1 from './lista1';
import Lista2 from './lista2';
var width = Dimensions.get('window').width - 30; //full width
const height = 220;
//https://www.npmjs.com/package/react-native-xml2js

class Anuncios extends Component {
  static propTypes = {
	navigation: PropTypes.shape({
      navigate: PropTypes.func,
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
        }),
      ),
      loading: PropTypes.bool,
    }),
  };

  constructor(props) {
    super(props);
    this.state = {
      tipo_catalogo: 2,
      loading: false,
      data: [],
      error: null,
      isModalVisible: false,
      item: {
		  imagem: '',
		  nome: '',
		  endereco: '',
		  ddd: '',
		  telefone: ''
	  },
    };

    this.arrayholder = [];
  }

  toggleModal = item => {
    var imagem = item.imagem.replace('.jpg', '');
    imagem = imagem.replace('-', '');
    item.imagem = imagem;
	this.setState({item: item});
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  componentDidMount() {
	var categoria = this.props.categoria;  
    this.setState({loading: false});
    this.props.getClientesRequest(categoria);
  }
  
  componentDidUpdate(prevProps) {
	if (prevProps.categoria !== this.props.categoria) {
		var categoria = this.props.categoria;  
		this.props.getClientesRequest(categoria);
	}
 }
  
   changeList = item => {
    this.setState({tipo_catalogo: item});
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
	<View>
      <SearchBar
        placeholder="Pesquisar por...."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
	  <View style={{backgroundColor:"#FFFFFF", paddingTop: 10, flexDirection: "row", alignItens: "center",justifyContent: "space-around"}}>
			<TouchableOpacity  onPress={() => this.changeList('1')}>
				<Icon name="list" size={24} color="#000000" />
			</TouchableOpacity>
			<TouchableOpacity  onPress={() => this.changeList('2')}>
				<Icon name="square" size={24} color="#000000" />
			</TouchableOpacity>
		</View>
	</View>  
    );
  };

  render() {
    var resultado = this.props.clientes.data;
    if (this.state.data.length > 0) {
      resultado = this.state.data;
    }
    if (this.props.clientes.loading) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{flex: 1}}>
		
        {this.state.tipo_catalogo == 1 && (
          <Lista1
            dados={resultado}
            navigation={this.props.navigation}
            renderSeparator={this.renderSeparator}
            renderHeader={this.renderHeader}
            toggleModal={this.toggleModal}
          />
        )}
        {this.state.tipo_catalogo == 2 && (
          <Lista2
            dados={resultado}
            navigation={this.props.navigation}
            renderSeparator={this.renderSeparator}
            renderHeader={this.renderHeader}
            toggleModal={this.toggleModal}
          />
        )}
        <Modal isVisible={this.state.isModalVisible}>
          <View style={{flex: 1, backgroundColor: '#fff', padding: 20}}>
            <Image
              source={Images.logos[this.state.item.imagem]}
              style={{width: 300, height: 200}}
            />
            <Text style={styles.titulo}>{this.state.item.nome}</Text>
            <Text>{this.state.item.endereco}</Text>
            <Text>
              {this.state.item.ddd} - {this.state.item.telefone}
            </Text>
			 <TouchableOpacity style={{marginTop:30, paddingLeft:10,flex: 1, flexDirection: "row", alignItens: "center"}}>
				 <Image source={require('../../assets/favorito.png')}/>
				 <Text style={{paddingLeft:20,paddingTop:20}}>Marcar como favorito</Text>
			  </TouchableOpacity>
            <Button
              onPress={() => this.toggleModal(this.state.item)}
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
  titulo: {
	  fontWeight: 'bold',
	  fontSize: 20
  }
});

const mapStateToProps = state => ({
  clientes: state.clientes,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ClientesActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Anuncios);
