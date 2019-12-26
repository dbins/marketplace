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
  FlatList,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Creators as FavoritosActions} from '../store/ducks/favoritos';
import Header from '../components/Header';
import Modal from 'react-native-modal';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-cards';
import Images from './Images';
import styled from 'styled-components/native';
var width = Dimensions.get('window').width - 30; //full width
const height = 220;

const ContainerBotoes = styled.SafeAreaView`
  flex: 1;
  flex-direction: row;
`;

const Imagem = styled.Image`
  width: 128px;
  height: 128px;
  margin: 5px;
`;

const BotaoMeio = styled.TouchableOpacity`
  margin: 2px;
  width: 50%;
  align-items: center;
`;

const TextoBotao = styled.Text`
  color: #ffffff;
`;

class Page9 extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
    getFavoritosRequest: PropTypes.func.isRequired,
    favoritos: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          categoria: PropTypes.string,
          imagem: PropTypes.string,
        }),
      ),
      loading: PropTypes.bool,
    }),
  };
  
   constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      item: {
		  imagem: '',
		  nome: '',
		  endereco: '',
		  ddd: '',
		  telefone: ''
	  },
    };
  }

  componentDidMount() {
    this.props.getFavoritosRequest();
  }
  
  toggleModal = item => {
    this.setState({item: item});
    this.setState({isModalVisible: !this.state.isModalVisible});
  };
  
  static navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({tintColor}) => (
      <Icon name="home" size={20} color={tintColor} />
    ),
  };
  
   renderGridItem(item) {
    var imagem = item.imagem.replace('.jpg', '');
    imagem = imagem.replace('-', '');
    return (
	  <View>	
      <TouchableOpacity onPress={() => this.toggleModal(item)}>
        <View style={{margin:10,padding:4}}>
          <Image source={Images.logos[imagem]} style={{height:150}}/>
          <Text>{item.nome}</Text>
          <Text>{item.ddd} - {item.telefone}</Text>
        </View>
      </TouchableOpacity>
	  <TouchableOpacity style={{paddingLeft:10,flex: 1, flexDirection: "row", alignItens: "center"}}>
		 <Image source={require('../assets/delete.png')}/>
		 <Text style={{paddingLeft:10}}>Excluir</Text>
	  </TouchableOpacity>
	  </View>
    );
  }

  render() {
    return (
      <View>
        <Header title="Favoritos" navigation={this.props.navigation} />
         
		  <ScrollView>
          <FlatList
			data={this.props.favoritos.data}
			renderItem={({item}) => this.renderGridItem(item)}
			keyExtractor={item => item.codigo}
			numColumns={2}
			stickyHeaderIndices={[0]}
  style={{marginBottom: 50}}
		  />
        </ScrollView>
		<Modal isVisible={this.state.isModalVisible}>
          <View style={{flex: 1, backgroundColor: '#fff', padding: 20}}>
            <Image
              source={this.state.item.imagem}
              style={{width: 250, height: 200}}
            />
            <Text>{this.state.item.nome}</Text>
            <Text>{this.state.item.endereco}</Text>
            <Text>
              {this.state.item.ddd} - {this.state.item.telefone}
            </Text>
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
  cartao: {
    height: 200,
    marginBottom: 20,
  },
});

const mapStateToProps = state => ({
  favoritos: state.favoritos,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(FavoritosActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Page9);
