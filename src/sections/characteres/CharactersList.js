import React, { Component } from 'react'
import { FlatList, View, StyleSheet , Text, ActivityIndicator } from 'react-native'
import { Colors } from '../../commons'
import { Actions } from 'react-native-router-flux'


// Importamos nuestra celda
import CharacterCell from './CharacterCell'

// Redux
import { connect } from 'react-redux'
import * as CharactersActions from '../../redux/actions/characters'

class CharactersList extends Component {


    componentWillMount() {
        this.props.fetchCharactersList()
    }

    renderItem(item, index) {
        return <CharacterCell item={item} onSelect={ (character) => this.onSelect(character) } />
    }
    onSelect(character) {
        this.props.updateSelected(character)
    }

    renderFooter() {
        return <ActivityIndicator
            animating={this.props.isFetching}
            size="large"
            color="grey"
            style={{ marginVertical: 20 }}
        />
    }


    render() {
        return (
            <View style={styles.container}>

                <FlatList 
                    data            = { this.props.list }
                    renderItem      = { ({item, index}) => this.renderItem(item, index) }
                    keyExtractor    = { (item, index) => index }
                    extraData       = { this.props }
                    ListFooterComponent={() => this.renderFooter()}
                />

            </View>
        )
        
    }

}



const mapStateToProps = (state) => {

    return {
        list        : state.characters.list,
        character   : state.characters.item,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {

        fetchCharactersList: () => {
            dispatch(CharactersActions.fetchCharactersList())
        },

        updateSelected: (character) => {
            dispatch(CharactersActions.updateCharacterSelected(character))
            Actions.CharacterView({ title: character.name }) //Ir al detalle aqui y pongo el nombre aqui
        },
        

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CharactersList)


const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },

})