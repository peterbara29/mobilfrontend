import React from 'react';
import {StyleSheet, FlatList, ActivityIndicator, Text, View, Image , TouchableOpacity, TextInput } from 'react-native';
const IP=require("./Ipcim")

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
        isLoading: true,
        
        dataSource:[],

        bevitel1:"",
        bevitel2:"",
        bevitel3:"",
        bevitel4:"",
    }
  }

  szavazat=(szam)=>{
    //alert(szam)
    var bemenet={
      bevitel1:szam
    }

  fetch(IP.ipcim + "szavazatfelvitel", {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
  
  )
  .then(x => x.text())
  .then(y => alert(y));

  }


  componentDidMount(){
    return fetch(IP.ipcim + 'kutya')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  mentes=()=>{
      //alert("hello")
      var bemenet={
        bevitel1:this.state.bevitel1,
        bevitel2:this.state.bevitel2,
        bevitel3:this.state.bevitel3,
        bevitel4:this.state.bevitel4
      }
  
    fetch(IP.ipcim + "mentes", {
        method: "POST",
        body: JSON.stringify(bemenet),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      }
    
    )
    .then(x => x.text())
    .then(y =>{
       alert(y)
       
      }
    );
  }

  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
{/*-------------------------------------------------- Keresés */}
        <Text style={{color:"brown",fontSize:20,textAlign:"center",marginTop:50, marginLeft:20,marginRight:20}}>Kutya fajtája:</Text>
        <TextInput
        style={{height: 40, marginLeft:120,marginRight:120}}
        placeholder="Kutya fajtája:"
        onChangeText={(beirtszoveg)=>this.setState({bevitel1:beirtszoveg})}
        value={this.state.bevitel1}
      />
        <Text style={{color:"brown",fontSize:20,textAlign:"center",marginTop:50, marginLeft:20,marginRight:20}}>Kutya neme:</Text>
        <TextInput
        style={{height: 40, marginLeft:120,marginRight:120}}
        placeholder="Kutya neme:"
        onChangeText={(beirtszoveg)=>this.setState({bevitel2:beirtszoveg})}
        value={this.state.bevitel2}
      />
      <Text style={{color:"brown",fontSize:20,textAlign:"center",marginTop:50, marginLeft:20,marginRight:20}}>Kép feltöltése:</Text>
        <TextInput
        style={{height: 40, marginLeft:120,marginRight:120}}
        placeholder="Kép feltöltése:"
        onChangeText={(beirtszoveg)=>this.setState({bevitel3:beirtszoveg})}
        value={this.state.bevitel3}
      />
      <Text style={{color:"brown",fontSize:20,textAlign:"center",marginTop:50, marginLeft:20,marginRight:20}}>Dátum megadása:</Text>
        <TextInput
        style={{height: 40, marginLeft:120,marginRight:120}}
        placeholder="Dátum megadása:"
        onChangeText={(beirtszoveg)=>this.setState({bevitel4:beirtszoveg})}
        value={this.state.bevitel4}
      />
       <TouchableOpacity
        style={styles.kekgomb}
        onPress={ ()=>this.mentes()}
      >
        <Text style={{color:"white",fontWeight:"bold",fontSize:15}}  >Mentés</Text>
      </TouchableOpacity>
{/*-------------------------------------------------- Találatok */}
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  kekgomb: {
    alignItems: "center",
    backgroundColor: "brown",
    padding: 10,
    width:250,
    marginLeft:"auto",
    marginRight:"auto",
  }
});
