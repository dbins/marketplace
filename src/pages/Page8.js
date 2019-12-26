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
import Header from '../components/Header';
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


const Texto = styled.Text`
  color: #000000;
  padding: 10px;
`;

class Page8 extends Component {
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
    tabBarLabel: 'Home',
    tabBarIcon: ({tintColor}) => (
      <Icon name="home" size={20} color={tintColor} />
    ),
  };

  render() {
    return (
      <View>
        <Header title="Marketplace" navigation={this.props.navigation} />
        <View>
          <View style={styles.cartao}>
            <Card>
              <CardImage source={require('../assets/marketplace.jpg')} />
            </Card>
          </View>
		  <Texto>O Marketplace é um aplicativo que lista todos os negócios de nossa região</Texto>
		  <Texto>Listamos mais de 500 anunciantes divididos em 30 categorias</Texto>
		  <Texto>Tem um negócio e deseja anunciar? Entre em contato conosco</Texto>
		  <Texto>anunciar@marketplace.teste.com.br</Texto>
        </View>
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
  categorias: state.categorias,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CategoriasActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Page8);
