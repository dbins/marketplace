import React, {Component} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';

import MapView, {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as MapasActions } from '../store/ducks/mapas';
import Header from '../components/Header';
import Images from './Images';

var arrayMarkers = [
  {
    name: 'agilize com',
    address: 'av. dr. domingos teodoro galo 91 centro',
    LatLng: {latitude: -23.193430, longitude: -49.384232},
    type: 'DESTAQUE',
    imagem:'construcao.jpg',
    codigo: '517',
  },
  {
    name: 'alic',
    address: 'rua davi arruda sobrinho 200 bairro augusto morini',
    LatLng: {latitude: -23.193430, longitude: -49.384232},
    type: 'DESTAQUE',
	imagem:'vestuario.jpg',
    codigo: '567',
  },
  {
    name: 'arquiteta marielle calesco',
    address: 'rua major mariano 1056 ',
    LatLng: {latitude: -23.199812, longitude: -49.384830},
    type: 'DESTAQUE',
	imagem:'servicos.jpg',
    codigo: '586',
  },
  {
    name: 'art gardens',
    address: 'av. milton asp',
    LatLng: {latitude: -23.193430, longitude: -49.384232},
    type: 'DESTAQUE',
	imagem:'servicos.jpg',
    codigo: '661',
  },
  {
    name: 'auto escola objetiva',
    address: 'rua 13 de maio 844',
    LatLng: {latitude: -23.193430, longitude: -49.384232},
    type: 'DESTAQUE',
	imagem:'automotivo.jpg',
    codigo: '525',
  },
  {
    name: 'auto escola sta maria',
    address: 'rua carlos de campos 670',
    LatLng: {latitude: -23.196507, longitude: -49.383953},
    type: 'DESTAQUE',
	imagem:'automotivo.jpg',
    codigo: '650',
  },
  {
    name: 'auto moto escola',
    address: 'r carlos de campos 287 - centro',
    LatLng: {latitude: -23.192945, longitude: -49.383717},
    type: 'DESTAQUE',
	imagem:'automotivo.jpg',
    codigo: '20',
  },
  {
    name: 'bar do binha',
    address: 'rua 13 de maio 192',
    LatLng: {latitude: -23.199495, longitude: -49.385670},
    type: 'DESTAQUE',
	imagem:'bares.jpg',
    codigo: '478',
  },
  {
    name: 'bar do brimo',
    address: 'rua carlos de campos 622',
    LatLng: {latitude: -23.196054, longitude: -49.383919},
    type: 'DESTAQUE',
	imagem:'bares.jpg',
    codigo: '477',
  },
  {
    name: 'bar do jovem',
    address: 'rua 13 de maio 790',
    LatLng: {latitude: -23.204617, longitude: -49.383934},
    type: 'DESTAQUE',
	imagem:'bares.jpg',
    codigo: '474',
  },
];

class Page3 extends Component {
  
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func
    }).isRequired,
    getMapasRequest: PropTypes.func.isRequired,
    mapas: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          categoria: PropTypes.string,
          imagem: PropTypes.string,
        })
      ),
      loading: PropTypes.bool
    })
  };
  
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      item: {},
    };

    this.arrayholder = [];
  }
  
  componentDidMount() {
	arrayMarkers = arrayMarkers.map(item => {
		var imagem = item.imagem.replace('.jpg', '');
		imagem = imagem.replace('-', '');
		return ({
			name: item.name,
			address: item.address,
			LatLng: item.LatLng,
			type: item.type,
			imagem: imagem,
			codigo: item.codigo,
		})
	});
	console.tron.log('MOUNT MAPA');
	console.tron.log(arrayMarkers);
  }
  
  renderImagem( item ) {
	var imagem = item.replace('.jpg', '');
	imagem = imagem.replace('-', '');
	console.tron.log(imagem);
    return Images.logos[imagem];
  }	

  static navigationOptions = {
    tabBarLabel: 'Mapa',
    tabBarIcon: ({tintColor}) => (
      <Icon name="map-marker" size={20} color={tintColor} />
    ),
  };
  render() {
    return (
      <View style={styles.container}>
		<Header title="Localização" navigation={this.props.navigation} />
        <MapView
          style={styles.map}
          loadingEnabled={true}
          region={{
            latitude: -23.195864,
            longitude: -49.384892,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          {arrayMarkers.map((marker, i)  => (
            <Marker
			  key={i}
              coordinate={marker.LatLng}
              title={marker.name}
			  description={marker.address}
			  onCalloutPress={this.markerClick}>
			   <MapView.Callout tooltip style={styles.customView}>
				   <View style={styles.calloutText}>
					  <Text><Image source={Images.logos[marker.imagem]} resizeMode="cover" style={{width:200,height:120}}/></Text>
					  <Text style={styles.titulo}>{marker.name}</Text>
					  <Text>{marker.address}</Text>
				   </View>
			   </MapView.Callout>
            </Marker>
          ))}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
 customView: {
	backgroundColor: '#FFFFFF' 
  },	 
  calloutText: {
	backgroundColor: '#FFFFFF' 
  },
  titulo: {
	fontWeight: 'bold'
  } ,
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const mapStateToProps = state => ({
  mapas: state.mapas
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(MapasActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page3);