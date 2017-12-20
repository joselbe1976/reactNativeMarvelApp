import React, { Component } from 'react'
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native'

export default class SeriesCell extends Component {

    static defaultProps = {
        item        : {},
        onSelect    : () => {},
    }
    render() {

        const { item, onSelect } = this.props 

        const title = item.title ? item.title : ''
        const image = item.thumbnail ? { uri: item.thumbnail.path + '/landscape_large.' + item.thumbnail.extension } : require('../../resources/mark.png')

        const description = item.description ? item.description : 'Sin descripcion de la serie'

        return (
            <TouchableOpacity onPress={ () => onSelect(item) }>

                <Image source={ image } resizeMode={'cover'} style={styles.image} />

                <View style={styles.textContainer}>
                    <Text style={styles.name}>{ title }</Text>
                
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
        backgroundColor: 'rgba(255,255,255,0.4)',
    },

    name: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },

    description: {
        flex: 1,
        fontSize: 12,
        color: 'black',
    },

})