import React, { Component } from 'react'
import { FlatList, View, StyleSheet , Text } from 'react-native'
import { Colors } from '../../commons'
import { Actions } from 'react-native-router-flux'


// Importamos nuestra celda
import SeriesCell from './SeriesCell'

// Redux
import { connect } from 'react-redux'
import * as SeriesActions from '../../redux/actions/series'

class SeriesList extends Component {


    componentWillMount() {
        console.log('componentWillMount', 'this.props',this.props)

        this.props.fetchSeriesList(this.props.character)
    }

    renderItem(item, index) {
        return <SeriesCell item={item}  />
    }


    render() {
        return (
            <View>

            <FlatList 
                data            = { this.props.list }
                renderItem      = { ({item, index}) => this.renderItem(item, index) }
                keyExtractor    = { (item, index) => item.id }
                extraData       = { this.props }
            />

            </View>
        )
    }

}



const mapStateToProps = (state) => {

    console.log('exec mapStateToProps', state)
    return {
        list        : state.characters.list,
        character   : state.characters.item,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchSeriesList: (character) => {
            dispatch(SeriesActions.fetchSeriesList(character))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SeriesList)


const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },

})