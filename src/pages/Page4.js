import React, {Component} from 'react';
import {View, StyleSheet, Alert, Text, TouchableOpacity} from 'react-native';

import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Creators as CategoriasActions} from '../store/ducks/categorias';
import Header from '../components/Header';
//https://alligator.io/react/geolocation-react-native/
class Page4 extends Component {

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func
    }).isRequired,
    getCategoriasRequest: PropTypes.func.isRequired,
    categorias: PropTypes.shape({
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

  static navigationOptions = {
    tabBarLabel: 'Perto de Mim',
    tabBarIcon: ({tintColor}) => (
      <Icon name="info" size={20} color={tintColor} />
    ),
  };

  state = {
    location: null,
    latitude: 0,
    longitude: 0,
  };

  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);

        this.setState({location});
        this.setState({latitude: location.coords.latitude});
        this.setState({longitude: location.coords.longitude});
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  render() {
    return (
      <View style={styles.container}>
	    <Header title="Perto de mim" navigation={this.props.navigation} />
        <TouchableOpacity onPress={this.findCoordinates}>
          <Text>Find My Coords?</Text>
          <Text>Location: {this.state.location}</Text>
        </TouchableOpacity>
        <MapView
          style={styles.map}
          loadingEnabled={true}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        />
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

  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const mapStateToProps = state => ({
  categorias: state.categorias,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CategoriasActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Page4);
