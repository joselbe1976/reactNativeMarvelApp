import React, { Component } from 'react'
import { FlatList, View, StyleSheet , Text } from 'react-native'
import { Colors } from '../../commons'
import { Actions } from 'react-native-router-flux'

//Native Spinner
var Spinner = require('react-native-spinkit');

// Importamos nuestra celda
import SeriesCell from './SeriesCell'

// Redux
import { connect } from 'react-redux'
import * as SeriesActions from '../../redux/actions/series'

class SeriesList extends Component {


    componentWillMount() {
        this.props.fetchSeriesList(this.props.character)
    }

    renderItem(item, index) {
        console.log('item',item)
        console.log('index',index)
        return <SeriesCell item={item}  />
    }

    renderFooter() {
        return (<View style={styles.spinnerContaniner}>
                    <Spinner  isVisible={this.props.isFetching} size={50} type={'Circle'} color={'white'}/>
                </View>
        )
        
    }

    render() {

        return (
            <View style={styles.container}>
                <FlatList 
                    data            = { this.props.list }
                    renderItem      = { ({item, index}) => this.renderItem(item, index) }
                    keyExtractor    = { (item, index) => item.id }
                    extraData       = { this.props }
                    ListFooterComponent={() => this.renderFooter()}
                />
            </View>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        list        : state.series.list,
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
    spinnerContaniner:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    }
})