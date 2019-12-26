import React, {Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Title, Row, ParentHR, Child } from './styles';

export default class Accordion extends Component{

    constructor(props) {
        super(props);
        this.state = { 
          data: props.data,
          expanded : false,
        }
    }
  
  render() {

    return (
       <View key={this.props.key}>
            <Row onPress={()=>this.toggleExpand()}>
                <Title>{this.props.title}</Title>
                <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={'#000000'} />
            </Row>
            <ParentHR />
            {
                this.state.expanded &&
                <Child>
                    <Text>{this.props.data}</Text>    
                </Child>
            }
            
       </View>
    )
  }

  toggleExpand=()=>{
    this.setState({expanded : !this.state.expanded})
  }

}