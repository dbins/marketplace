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
import Carousel from "react-native-banner-carousel";
var width = Dimensions.get('window').width - 30; //full width
const height = 220;
const BannerWidth = Dimensions.get("window").width;
const BannerHeight = 142;
const BannerHeight2 = 47;

const images = [
  require("../assets/banner1.jpg"),
  require("../assets/banner2.jpg"),
  require("../assets/banner3.jpg")
];

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Conteudo = styled.ScrollView`
  flex: 1;
`;

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
  color: #000000;
`;

class Page5 extends Component {
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

  static navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({tintColor}) => (
      <Icon name="home" size={20} color={tintColor} />
    ),
  };
  
  renderPage(image, index) {
    return (
      <View key={index}>
        <Image
          style={{ width: BannerWidth, height: BannerHeight }}
          source={image}
        />
      </View>
    );
  }

  render() {
    return (
      <Container>
        <Header title="Home" navigation={this.props.navigation} />
        <Conteudo>
		<Carousel
            autoplay
            autoplayTimeout={5000}
            loop
            index={0}
            pageSize={BannerWidth}
          >
            {images.map((image, index) => this.renderPage(image, index))}
          </Carousel>
		
          <ContainerBotoes>
            <BotaoMeio
              onPress={() => this.props.navigation.navigate('Page8')}>
              <Imagem source={require('../assets/marketplace.png')} />
              <TextoBotao>Marketplace</TextoBotao>
            </BotaoMeio>
            <BotaoMeio onPress={() => this.props.navigation.navigate('Page6')}>
              <Imagem source={require('../assets/email.png')} />
              <TextoBotao>Notificações</TextoBotao>
            </BotaoMeio>
          </ContainerBotoes>
          <ContainerBotoes>
            <BotaoMeio onPress={() => this.props.navigation.navigate('Page1')}>
              <Imagem source={require('../assets/categorias.png')} />
              <TextoBotao>Categorias</TextoBotao>
            </BotaoMeio>
            <BotaoMeio onPress={() => this.props.navigation.navigate('Page2')}>
              <Imagem source={require('../assets/team.png')} />
              <TextoBotao>Anunciantes</TextoBotao>
            </BotaoMeio>
          </ContainerBotoes>
          <ContainerBotoes>
            <BotaoMeio onPress={() => this.props.navigation.navigate('Page3')}>
              <Imagem source={require('../assets/maps-and-flags.png')} />
              <TextoBotao>Localização</TextoBotao>
            </BotaoMeio>
            <BotaoMeio onPress={() => this.props.navigation.navigate('Page4')}>
              <Imagem source={require('../assets/marker.png')} />
              <TextoBotao>Perto de Mim</TextoBotao>
            </BotaoMeio>
          </ContainerBotoes>
          <ContainerBotoes>
            <BotaoMeio onPress={() => this.props.navigation.navigate('Page7')}>
              <Imagem source={require('../assets/ajuda.png')} />
              <TextoBotao>Ajuda</TextoBotao>
            </BotaoMeio>
            <BotaoMeio onPress={() => this.props.navigation.navigate('Page9')}>
              <Imagem source={require('../assets/heart.png')} />
              <TextoBotao>Favoritos</TextoBotao>
            </BotaoMeio>
          </ContainerBotoes>
        </Conteudo>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
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

export default connect(mapStateToProps, mapDispatchToProps)(Page5);
