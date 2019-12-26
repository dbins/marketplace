import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Page4 from './pages/Page4';
import Page5 from './pages/Page5';
import Page6 from './pages/Page6';
import Page7 from './pages/Page7';
import Page8 from './pages/Page8';
import Page9 from './pages/Page9';

export default createAppContainer(
  createBottomTabNavigator(
    {
      Home: { screen: createStackNavigator(
        {
          Page5,
          Page6,
          Page7,
          Page8,
          Page9,
        },
        {
          defaultNavigationOptions: {
            header: null,
          },
        },
      ),navigationOptions: {
                tabBarVisible: true,
                tabBarLabel: 'Home',
                tabBarIcon: (
                  <Icon name="home" size={20} color="rgba(255,255,255,0.6)" />
                )
	  }},
	  Page1,
      Page2,
      Page3,
      Page4,
    },
    {
      resetOnBlur: true,
      tabBarOptions: {
        keyboardHidesTabBar: true,
        activeTintColor: '#FFF',
        inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
        style: {
          backgroundColor: '#00008b',
        },
      },
    },
  ),
);
