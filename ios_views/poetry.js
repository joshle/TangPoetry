import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  NavigatorIOS,
  RefreshControl,
  ActivityIndicator
  } from 'react-native';

import Util from './util';
import Category from './poetry/category';

class PoetryView extends Component{
  constructor(props){
    super(props);
    this.state = {
      isShow: false,
      category: null,
      refreshing: false
    };
  }

  render(){
    return(
      <View style={styles.container}>
        {
          this.state.isShow ?
            (<ScrollView
              refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
              }
              style={[styles.container, {paddingTop:20}]}>
              <Category data={this.state.category} navigator={this.props.navigator}/>
            </ScrollView>)
            :
            (<ActivityIndicator
              animating={true}
              style={[{height: 80}]}
              size="large"
              />)
        }
      </View>
    );
  }

  componentDidMount(){
    this._fetchData();
  }

  _fetchData(callback){
    var self = this;

    self.setState({
      isShow: true,
      category: 1,
      refreshing: false
    });
  }

  _onRefresh(){
    var self = this;
    this.setState({refreshing: true});
    this._fetchData();
  }
}


class Poetry extends Component{
  render(){
    return(
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          component: PoetryView,
          title: '分类',
          navigationBarHidden: true
      }}/>
    );
  }
}

class HrLine extends Component{
  render(){
    return (
      <View style={styles.hr}></View>
    );
  }
}

class Space extends Component{
  render(){
    return (
      <View style={styles.space}></View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  hr:{
    borderWidth: Util.pixel,
    borderColor: '#ccc',
    marginTop:20,
    marginBottom:10
  },
  space:{
    height:70
  }
});

module.exports = Poetry;