import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  View,
  TouchableHighlight,
  FlatList,
  Text,
} from 'react-native';

export default class SearchResults extends React.Component {

    render() {
        return (
            <ScrollView>
                {
                    this.props.listings.map((item, key) => 
                            <TouchableHighlight
                                key={ key }
                                underlayColor='#dddddd'>
                                <View>
                                <View style={styles.rowContainer}>
                                    <Image style={styles.thumb} source={{ uri: item.img_url }} />
                                    <View style={styles.textContainer}>
                                    <Text style={styles.price}>{ item.price_formatted.split(' ')[0] }</Text>
                                    <Text style={styles.title}
                                        numberOfLines={1}>{item.title}</Text>
                                    </View>
                                </View>
                                <View style={styles.separator}/>
                                </View>
                            </TouchableHighlight>
                        )
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
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
