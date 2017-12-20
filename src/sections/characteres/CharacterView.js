import React, { Component } from 'react'
import { View, StyleSheet, Image, Text, Linking } from 'react-native'
import { Button } from '../../widgets' 
import { Colors } from '../../commons'

// Redux
import { connect } from  'react-redux'

import * as CharactersActions from '../../redux/actions/characters'


class CharacterView extends Component {

    onViewSeries(character) {
        this.props.ViewCharacterSeries(character)
    }

    render() {
        
        //extraigo character de las propos
        const { character } = this.props
        
        //meto en variables los valores
        const image = character.thumbnail ? { uri: character.thumbnail.path + '/landscape_xlarge.' + character.thumbnail.extension } : require('../../resources/mark.png')
        const description = character.description ? character.description : 'Personaje Marvel sin descripción'

        //validate the Wiki URL. Pillo la primera solo, hay varias en el api
        const urlWiki = character.urls? character.urls[0].url : null
        const numSeries = character.series.items.length

        return (
            <View style={styles.container}>

                <Image source={image} style={styles.image} resizeMode={'cover'} /> 
                <View style={styles.textContainer}>
                    <Text style={styles.description}>{ description } </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <Button label={'Ver Wiki'} onPress={ () => Linking.openURL(urlWiki) } isFetching={this.props.isFetching} />
                </View>
                <View style={styles.buttonContainer}>
                   <Button label={'Ver series ' + numSeries} onPress={ () => this.onViewSeries(character) } isFetching={this.props.isFetching} />
                </View>
            </View>
        )
    }
}

/*
<Button label={'Ver series'} onPress={ () => this.onViewSeries(character) } isFetching={this.props.isFetching} />
*/

     



const mapStateToProps = (state) => {
    return {
        character: state.characters.item,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        ViewCharacterSeries: (character) => {
            /*
            if(character) {
                dispatch(CharactersActions.deleteCharacter(character))
            }
            */
          //  character && dispatch(CharactersActions.deleteCharacter(character))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterView)

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },

    description: {
        flex: 1,
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    },


    image: {
        width: '100%',
        height: 200,
    },

    buttonContainer: {
        margin: 20,
    },
});
