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
import {ListItem, SearchBar} from 'react-native-elements';
import Images from './Images';
var width = Dimensions.get('window').width - 30; //full width
const height = 220;

export default class Lista1 extends Component {
  renderGridItem(item) {
    var imagem = item.imagem.replace('.jpg', '');
    imagem = imagem.replace('-', '');
    return (
      <TouchableOpacity onPress={() => this.props.toggleModal(item)}>
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
      <FlatList
        data={this.props.dados}
        renderItem={({item}) => this.renderGridItem(item)}
        keyExtractor={item => item.codigo}
        ItemSeparatorComponent={this.props.renderSeparator}
        ListHeaderComponent={this.props.renderHeader}
        stickyHeaderIndices={[0]}
      />
    );
  }
}
