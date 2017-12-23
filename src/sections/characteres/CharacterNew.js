import React, { Component } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Colors } from '../../commons'
import { Input, Button } from '../../widgets'
import ImagePicker from 'react-native-image-picker'


// Redux
import { connect } from 'react-redux'
import * as CharactersActions from '../../redux/actions/characters'


//No action with the form
class CharacterNew extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            nameError: '',

            description: '',
            descriptionError: '',

            image: null,
        }
    }

    validateForm() {
        let valid = true
        let errors = {}

        if(!this.state.name) {
            errors.name = 'Select valid name'
            valid = false
        }

        if(!this.state.description) {
            errors.description = 'write a valid description'
            valid = false
        }

        this.setState({ 
            nameError: errors.name ? errors.name : '',
            descriptionError: errors.description ? errors.description : '',
        })

        return valid
    }

    onSubmit() {

        if( this.validateForm() ) {
            
           //send web service to Add the new character (No implemented)
        } 
    }

    onSelectImageTapped() {
        const options = {
            title: 'Select image',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            //console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else {
                this.setState({
                    image: response
                });
            }
        });

    }

    render() {        
        const imageUri = this.state.image ? { uri: this.state.image.uri } : null
        const imageButtonText = this.state.image ? this.state.image.fileName : 'Select image'

        return (
            <View style={styles.container}>

                <View style={styles.imageContainer}>

                    <Image source={imageUri} style={styles.imageContainerBackground} resizeMode={'cover'} />
                    
                    <TouchableOpacity style={styles.button} onPress={ () => this.onSelectImageTapped() } >
                        <Text style={styles.textButton}>{ imageButtonText }</Text>
                    </TouchableOpacity>

                </View>

                <View style={styles.inputContainer}>
                    <Input
                        onChangeText={(v) => this.setState({ name: v })}
                        value={this.state.name}
                        error={this.state.nameError}
                        label={'Name:'}
                        placeholder={'Spiderman'}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Input
                        onChangeText={(v) => this.setState({ description: v })}
                        value={this.state.description}
                        error={this.state.descriptionError}
                        label={'Description:'}
                        placeholder={'Here Hero description'}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        label={'Save'}
                        onPress={() => this.onSubmit()}
                        isFetching={this.props.isFetching}
                    />
                </View>

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.characters.isFetching,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        postCharacter: (data) => {
           // dispatch(CharactersActions.postCharacter(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterNew)

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    imageContainer: {
        width: '100%',
        height: 200,
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
    },

    imageContainerBackground: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },

    button: {
        padding: 10,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 12,
    },

    textButton: {
        color: 'white',
        fontWeight: '600',
    },

    inputContainer: {
        margin: 20,
    },

    buttonContainer: {
        margin: 20,
    },

})