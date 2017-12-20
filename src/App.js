/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Text } from 'react-native';

import { Actions, Scene, Router } from 'react-native-router-flux';
import * as webservices from './webservices/werbservices'

import { Colors } from './commons'

/****************** Nuestros componentes *******************/
import CharactersList from './sections/characteres/CharactersList'
import CharacterView from './sections/characteres/CharacterView'
/************************************************/



/****************** REDUX *******************/
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'
import * as reducers from './redux/reducers' // Nuestros reducers
const reducer = combineReducers(reducers) // Combinamos nuestros reducers
const store = createStore( // Creamos el store con:
    reducer, // Nuestros reducer
    applyMiddleware(thunk) // Nuestro middleware redux-thunk
)

// ******* fin redux ****************************


export default class App extends Component {

  componentWillMount() {
    webservices.configureAxios()
    StatusBar.setBarStyle('light-content') // iOS StatusBar light style
  }

  render() {
    console.disableYellowBox = true;

    return (
      <Provider store={store} >
                <Router>
                    <Scene key="root">

                        <Scene
                            key={ 'CharactersList' }
                            component={ CharactersList }
                            navigationBarStyle={styles.navBar}
                            navBarButtonColor={'white'}
                            title={'Personajes Marvel'}
                        />
                        <Scene
                        key={ 'CharacterView' }
                        component={ CharacterView }
                        navigationBarStyle={styles.navBar}
                        navBarButtonColor={'white'}
         
                      />
                        

                    </Scene>
                </Router>
            </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  navBar: {
    backgroundColor: Colors.navBar,
  },
});
