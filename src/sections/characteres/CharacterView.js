import React, { Component } from 'react'
import { View, StyleSheet, Image, Text, Linking } from 'react-native'
import { Button } from '../../widgets' 
import { Colors } from '../../commons'
import { Actions } from 'react-native-router-flux'

// Redux
import { connect } from  'react-redux'

import * as SeriesActions from '../../redux/actions/series'


class CharacterView extends Component {

    onViewSeries(character) {
        this.props.ViewCharacterSeries(character)
    }

    render() {
        
        //extraigo character de las propos
        const { character } = this.props
        
        //meto en variables los valores
        const image = character.thumbnail ? { uri: character.thumbnail.path + '/landscape_xlarge.' + character.thumbnail.extension } : require('../../resources/mark.png')
        const description = character.description ? character.description : 'No description'

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
                    <Button label={'Show Wiki'} onPress={ () => Linking.openURL(urlWiki) } />
                </View>


                <View style={styles.buttonContainer}>
                   <Button label={'Show series (' + numSeries + ')' } onPress={ () => this.onViewSeries(character) } isFetching={this.props.isFetching} />
                </View>

            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        character: state.characters.item,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        ViewCharacterSeries: (character) => {
            character && dispatch(SeriesActions.fetchSeriesList(character))
            Actions.SeriesList({ title: 'Series of ' + character.name })
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
        fontWeight: 'bold',
        color: Colors.textWhite,
    },


    image: {
        width: '100%',
        height: 200,
    },

    buttonContainer: {
        margin: 20,
    },
});
