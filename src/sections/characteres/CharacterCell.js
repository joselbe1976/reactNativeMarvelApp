import React, { Component } from 'react'
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native'

import { Colors } from '../../commons'

export default class CharacterCell extends Component {

    static defaultProps = {
        item        : {},
        onSelect    : () => {},
    }
    render() {

        const { item, onSelect } = this.props 

        const name = item.name ? item.name : ''
        const image = item.thumbnail ? { uri: item.thumbnail.path + '/landscape_large.' + item.thumbnail.extension } : require('../../resources/mark.png')

   

        return (
            <TouchableOpacity onPress={ () => onSelect(item) }>

                <Image source={ image } resizeMode={'cover'} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{ name }</Text>
                </View>

            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    
    image: {
        width: '100%',
        height: 200,
    },

    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: Colors.backgroundTranparente,
    },

    name: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.textBlack,
    },

})