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
import styled from 'styled-components/native';
var width = Dimensions.get('window').width - 30; //full width
const height = 220;

const data = [
  {
    id: '1',
    texto:
      'No próximo mês nossos anunciantes vão divulgar as ofertas especiais de final de ano. Fique ligado!',
    imagem: require('../assets/marketplace.jpg'),
  },
  {
    id: '2',
    texto:
      'Conheça o nosso novo anunciante, a GoBarber!',
    imagem: require('../assets/marketplace.jpg'),
  },
  {
    id: '3',
    texto:
      'Precisando de um tênis novo? Não deixe de conhecer a RocketShoes!',
    imagem: require('../assets/marketplace.jpg'),
  },
  {
    id: '4',
    texto:
      'Pizzaria Don Juan. Sabor e qualidade perto de você!',
    imagem: require('../assets/marketplace.jpg'),
  },
  {
    id: '5',
    texto:
      'Padaria Fome Zero. Quem quer pão, levante a mão!',
    imagem: require('../assets/marketplace.jpg'),
  },
];

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Conteudo = styled.ScrollView`
  flex: 1;
`;

const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
`;

const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {padding: 10},
})``;

const Imagem = styled.Image`
  width: 80px;
  height: 80px;
  margin: 10px;
`;

const Texto = styled.Text`
  width: 250px;
  padding: 10px;
`;

const Box = styled.View`
  flex: 1;
  border-color: #000000;
  border-style: solid;
  padding: 20px;
  border-width: 1px;
  margin: 10px;
  background-color: #ffffff;
  flex-direction: row;
`;

class Page6 extends Component {
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

  renderGridItem(item) {
    return (
      <Box key={item.id}>
        <Imagem source={item.imagem} />
        <Texto>{item.texto}</Texto>
      </Box>
    );
  }

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
      <Container>
        <Conteudo>
          <Header title="Notificações" navigation={this.props.navigation} />
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({item}) => this.renderGridItem(item)}
          />
        </Conteudo>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  categorias: state.categorias,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CategoriasActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Page6);
