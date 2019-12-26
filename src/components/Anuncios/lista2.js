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

export default class Lista2 extends Component {
  renderGridItem(item) {
    var imagem = item.imagem.replace('.jpg', '');
    imagem = imagem.replace('-', '');
    return (
      <TouchableOpacity onPress={() => this.props.toggleModal(item)}>
        <View style={{margin:10,padding:4}}>
          <Image source={Images.logos[imagem]} style={{height:150}}/>
          <Text>{item.nome}</Text>
          <Text>{item.ddd} - {item.telefone}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <FlatList
        data={this.props.dados}
        renderItem={({item}) => this.renderGridItem(item)}
        keyExtractor={item => item.codigo}
		numColumns={2}
        ItemSeparatorComponent={this.props.renderSeparator}
        ListHeaderComponent={this.props.renderHeader}
        stickyHeaderIndices={[0]}
      />
    );
  }
}
