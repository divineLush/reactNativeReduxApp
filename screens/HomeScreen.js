import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableHighlight,
  ActivityIndicator,
  Image,
  Button
} from 'react-native';
import SearchResults from '../components/SearchResults';
import * as Actions from '../state/actions';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

function urlForQueryAndPage(key, value, pageNumber) {
  const data = {
      country: 'uk',
      pretty: '1',
      encoding: 'json',
      listing_type: 'buy',
      action: 'search_listings',
      page: pageNumber,
  };
  data[key] = value;

  const querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

  return 'https://api.nestoria.co.uk/api?' + querystring;
}

class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchString: '',
      isLoading: false,
      message: '',
      listings: []
    }
  }

  componentDidMount() {
    console.debug(this.props)
    this.props.getListings()
  }

  _onSearchTextChanged = (event) => {
    this.setState({ searchString: event.nativeEvent.text });
  }

  _executeQuery = (query) => {
    this.setState({ isLoading: true });
    fetch(query)
      .then(response => response.json())
      .then(json => this._handleResponse(json.response))
      .catch(error =>
        this.setState({
          isLoading: false,
          message: 'Something bad happened ' + error
      }));
  }

  _handleResponse = (response) => {
    this.setState({ isLoading: false , message: '' });
    if (response.application_response_code.substr(0, 1) === '1') {
      this.setState({ listings: response.listings })
      this.props.setListings(response.listings)
    } else {
      this.setState({ message: 'Location not recognized; please try again.'});
    }
  }
  
  _onSearchPressed = () => {
    const query = urlForQueryAndPage('place_name', this.state.searchString, 1);
    this._executeQuery(query);
  }

  render() {
    const spinner = this.state.isLoading ? <ActivityIndicator size='large'/> : null;
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.description}>
          Search for houses to buy!
        </Text>
        <Text style={styles.description}>
          Search by place-name or postcode.
        </Text>
        <View style={styles.flowRight}>
        <TextInput
          style={styles.searchInput}
          placeholder='Search via name or postcode'
          onChange={ this._onSearchTextChanged }
        />
        <Button
          onPress={ this._onSearchPressed }
          color='#48BBEC'
          title='Go'
        />
        </View>
        <Image 
          source={ require('../assets/images/house.png') } 
          style={ styles.image }
        />
        { spinner }
        <Text style={ styles.description }>{ this.state.message }</Text>
      </ScrollView>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

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
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    // alignItems: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC',
  },
  image: {
    width: 217,
    height: 138,
  },
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

