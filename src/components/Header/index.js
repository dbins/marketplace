import React, {forwardRef} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const Content = styled.View`
  height: ${54 + getStatusBarHeight()};
  padding-top: ${getStatusBarHeight()};
  background-color: transparent;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Botoes = styled.View`
  width: 30%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 20px;
  color: #000000;
  font-weight: bold;
  align-self: center;
  margin-top: 5px;
  width: 70%;
`;

const Botao = styled(Icon)`
  color: #000000;
  background-color: transparent;
  font-size: 20px;
`;

function Header({title, navigation}, ref) {
  return (
    <Content>
      <Title>{title}</Title>
      <Botoes>
        <TouchableOpacity onPress={() => navigation.navigate('Page7')}>
          <Botao name="help" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Page6')}>
          <Botao name="notifications" />
        </TouchableOpacity>
      </Botoes>
    </Content>
  );
}

export default Header;
