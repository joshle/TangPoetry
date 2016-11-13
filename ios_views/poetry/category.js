import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ListView
  } from 'react-native';

import Util from './../util';
import List from './list';

class Category extends Component{
  constructor(props){
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      type: this.props.type,
      dataSource: ds.cloneWithRows([])
    };

  }
  render(){
    return(
      <ScrollView style={styles.container}>
        <ListView dataSource={this.state.dataSource} enableEmptySections={true}
                  renderRow={(rowData) =>
          (
            <TouchableOpacity style={[styles.item, styles.row]} onPress={this._showList.bind(this, rowData.id, rowData.name)}>
              <View style={[styles.text, styles.center]}>
                <Text style={styles.title} numberOfLines={1}>{rowData.name}</Text>
              </View>
            </TouchableOpacity>
          )
        }/>
      </ScrollView>
    );
  }
  componentDidMount(){
    let self = this;
    let url = 'http://poetry.leadir.com/api/poetries/types';
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    Util.get(url, function(data){
      if(data.data){
        let obj = data.data;
        self.setState({
          dataSource: ds.cloneWithRows(obj)
        });
      }else{
        alert('服务异常,正在紧急修复,请耐心等待');
      }
    }, function(err){
      alert('服务异常,正在紧急修复,请耐心等待2');
    });
  }

  _showList(typeId, title){
    this.props.navigator.push({
      component: List,
      title: title,
      barTintColor: '#fff',
      passProps:{
        typeId: typeId,
        isMargin:1
      }
    });
  }

}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingTop:50
  },
  center:{
    justifyContent:'center',
    alignItems: 'center'
  },
  item:{
    height:70,
    borderBottomWidth: Util.pixel,
    borderBottomColor:'#ccc'
  },
  row:{
    flexDirection: 'row'
  },
  img:{
    height:60,
    width:60,
    marginLeft:10,
    marginTop:5,
    borderWidth:Util.pixel,
    borderRadius:3,
    borderColor:'#fff'
  },
  text:{
    marginLeft:7
  },
  title:{
    fontSize:24,
    marginTop:25,
    marginLeft:180,
    width:Util.size.width -80
  },
  name:{
    fontSize:14,
    color: '#ccc',
    marginTop:10
  }
});

module.exports = Category;
