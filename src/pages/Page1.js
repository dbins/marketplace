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
import {Creators as CategoriasActions} from '../store/ducks/categorias';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-cards';
import Images from './Images';
import Header from '../components/Header';
var width = Dimensions.get('window').width - 30; //full width
const height = 220;

var categorias = [
        {"id":1, "categoria":"Açougue","imagem":require('../assets/acougue.jpg')},
        {"id":2, "categoria":"Advogados","imagem":require('../assets/advogados.jpg')},
        {"id":3, "categoria":"Agronegócio","imagem":require('../assets/agronegocio.jpg')},
        {"id":4, "categoria":"Animais","imagem":require('../assets/animais.jpg')},
        {"id":5, "categoria":"Antiguidades","imagem":require('../assets/antiguidades.jpg')},
        {"id":6, "categoria":"Automotivo","imagem":require('../assets/automotivo.jpg')},
        {"id":7, "categoria":"Bares","imagem":require('../assets/bares.jpg')},
        {"id":8, "categoria":"Bebês","imagem":require('../assets/bebes.jpg')},
        {"id":9, "categoria":"Beleza","imagem":require('../assets/beleza.jpg')},
        {"id":10, "categoria":"Bolsas","imagem":require('../assets/bolsas.jpg')}
];		

class Page1 extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
    getCategoriasRequest: PropTypes.func.isRequired,
    categorias: PropTypes.shape({
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

  componentDidMount() {
    this.props.getCategoriasRequest();
  }
  static navigationOptions = {
    tabBarLabel: 'Categorias',
    tabBarIcon: ({tintColor}) => (
      <Icon name="gift" size={20} color={tintColor} />
    ),
  };
  
 renderGridItem( item ) {
	var imagem = item.imagem.replace('.jpg', '');
	imagem = imagem.replace('-', '');
    return (
    <TouchableOpacity style={styles.botao} onPress={() => this.props.navigation.navigate('Page2', {imagem: item.imagem})}>
      <Image style={styles.imagem} source={Images.logos[imagem]}/>
      <Text style={styles.texto}>{item.categoria}</Text>
    </TouchableOpacity>
    );
	}
  
  render() {
	return (
      <View styles={styles.container}>
	    <Header title="Categorias" navigation={this.props.navigation} />
		<View style={styles.cartao}>
        <Card >
          <CardImage
            source={require('../assets/marketplace.jpg')}
          />
        </Card>
		</View>
		 <FlatList
          data={this.props.categorias.data}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={({ item }) =>this.renderGridItem(item)}
        />
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
	marginBottom: 20
  },
  imagem: {
    width: 150,
    height: 76,
    margin: 5,
    backgroundColor: '#000000'
  },
  botao: {
    margin: 2,
    width: '50%',
    alignItems: 'center'
  },
  texto: {
	color: '#000000'
  }	
});

const mapStateToProps = state => ({
  categorias: state.categorias,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CategoriasActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Page1);
