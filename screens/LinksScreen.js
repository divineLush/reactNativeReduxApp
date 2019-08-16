import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  FlatList,
  Text,
} from 'react-native';
import SearchResults from '../components/SearchResults';
import * as Actions from '../state/actions';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

class LinksScreen extends React.Component {
  render() {
    return (
      <View>
        <SearchResults listings={ this.props.listings } />
      </View>
    );
  }
}

LinksScreen.navigationOptions = {
  title: 'Search Results',
};

function mapStateToProps(state, props) {
  let path = state.listingsReducer
  return {
    loading: path.loading,
    listings: path.listings,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LinksScreen)
