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
import Accordion from '../components/Accordion';
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

const menu = [
  {
    id: '0',
    title: 'Quem pode anunciar no Marketplace',
    data: 'O Marketplace é aberto para qualquer anunciante de nossa região',
  },
  {
    id: '1',
    title: 'Existe a venda de produtos pelo aplicativo',
    data: 'Não. O aplicativo é apenas para divulgar anúncios',
  },
  {
    id: '2',
    title: 'Como localizar anunciantes perto de mim?',
    data: 'Ative o GPS do seu smartphone e clique no menu Perto de Mim',
  },
  {
    id: '3',
    title: 'Como eu posso entrar em contato para tirar alguma dúvida?',
    data:
      'Ligue para nosso atendimento no número 234-5678 de segunda a sexta das 08:00 as 18:00',
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
  color: #ffffff;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
`;

const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {padding: 30},
})``;

const ViewAccordion = styled.View`
  flex: 1;
  padding-top: 20px;
`;

class Page7 extends Component {
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

  renderAccordions = () => {
    const items = [];
    for (item of menu) {
      items.push(
        <Accordion key={item.id} title={item.title} data={item.data} />,
      );
    }
    return items;
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
      <Container>
        <Conteudo>
          <Header title="Ajuda" navigation={this.props.navigation} />
          <ViewAccordion>{this.renderAccordions()}</ViewAccordion>
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

export default connect(mapStateToProps, mapDispatchToProps)(Page7);
