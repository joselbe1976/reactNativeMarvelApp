import React, { Component } from 'react'
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { Colors } from '../commons'

export default class Button extends Component {

    static defaultProps = {
        labelStyle: {},
        containerStyle: {},
        spinnerColor: 'white',
        label: '',
        onPress: () => {},
        isFetching: false,
    }

    _onPress() {
        if(!this.props.isFetching) {
            this.props.onPress()
        }
    }

    
    render() {
        return (
            <TouchableOpacity style={[styles.container, this.props.containerStyle]} onPress={ () => this._onPress() } >
                <Text style={[styles.label, this.props.labelStyle]}>{ this.props.label }</Text>
                { this.props.isFetching ? <ActivityIndicator animating={true} color={this.props.spinnerColor} style={styles.spinner} /> : null }
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            backgroundColor: Colors.button_background,
            borderRadius: 12,
            flexDirection: 'row',
        },
    
        label: {
            color: Colors.button_label_Color,
            fontWeight: '600',
            fontSize: 16,
        },
    
        spinner: {
            marginLeft: 20,
        }
    })
    