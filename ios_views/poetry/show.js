import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
  } from 'react-native';

import Util from './../util';

class Show extends Component{

  constructor(props){
    super(props);
    this.state = {
      id: this.props.id,
      title: this.props.title,
      poet: this.props.poet,
      content: this.props.content,
    };

  }
  render(){
    return(
      <ScrollView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.title}>{this.state.title}</Text>
          <Text style={styles.poet}>{this.state.poet}</Text>
          <Text style={styles.text}>{this.state.content.replace(/<br \/>/g, "\n").replace(/<p>/g, '').replace(/<\/p>/g, '')}</Text>
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  center:{
    justifyContent:'center',
    alignItems: 'center'
  },
  icon:{
    width:300,
    height:530
  },
  items:{
    width:300,
    marginBottom:10,
    shadowOpacity: 1,
    shadowColor: '#ccc',
    shadowOffset:{width: 1*Util.pixel, height: Util.pixel},
  },
  title:{
    fontSize:28,
    fontWeight:'800',
    marginBottom:15,
    marginLeft:10,
    marginTop:20
  },
  poet:{
    fontSize:20,
    fontWeight:'500',
    marginBottom:15,
    marginLeft:10,
    marginTop:10
  },
  text:{
    fontSize:18,
    fontWeight:'300',
    marginBottom:15,
    marginLeft:10,
    marginTop:20
  }
});

module.exports = Show;