import React, { Component } from 'react'
import { FlatList, View, StyleSheet , Text , ActivityIndicator} from 'react-native'
import { Colors } from '../../commons'
import { Actions } from 'react-native-router-flux'


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

})