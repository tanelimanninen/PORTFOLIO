import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Keyboard } from 'react-native';
import React, {useState} from 'react';

export default function App() {

   // use hooks to change number values
   const [number1, setNumber1] = useState('0');
   const [number2, setNumber2] = useState('0');
   const [result, setResult] = useState('0');

   // button pressed - calculate
   const buttonPressed = (e,calc) => {
      if (calc === '+') setResult(parseInt(number1) + parseInt(number2)+"");
      else if (calc === '-') setResult(parseInt(number1) - parseInt(number2)+"");
      else if (calc === '/') setResult(parseInt(number1) / parseInt(number2)+"");
      else if (calc === '*') setResult(parseInt(number1) * parseInt(number2)+"");
      Keyboard.dismiss();
    }

  return (
    <View style={styles.container}>

      <Text style={styles.calculator}>Calculator</Text>

      <View style={styles.row}>
        <View style={styles.text}>
          <Text>Number 1:</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput value={number1} 
            onChangeText={text => setNumber1(text)} 
            style={{textAlign:'right'}} 
            keyboardType={'numeric'}>
          </TextInput>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.text}>
          <Text>Number 2:</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput value={number2} 
            onChangeText={text => setNumber2(text)} 
            style={{textAlign:'right'}} 
            keyboardType={'numeric'}>
          </TextInput>
        </View>
      </View>

      <View style={styles.buttonRow}>
        <Button title="  +  " onPress={(e) => buttonPressed(e,'+')}/>
        <Button title="  -  " onPress={(e) => buttonPressed(e,'-')}/>
        <Button title="  *  " onPress={(e) => buttonPressed(e,'*')}/>
        <Button title="  /  " onPress={(e) => buttonPressed(e,'/')}/>
      </View>

      <View style={styles.row}>
        <View style={styles.text}>
          <Text>Result:</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput 
            placeholder="0" 
            value={result} 
            style={{textAlign:'right'}} 
            editable={false}>
          </TextInput>
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calculator: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 20
  },
  row: {
    flexDirection: 'row',
    marginTop: 5
  },
  text: {
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    padding: 5,
    width:100,
  },
  textInput: {
    justifyContent: 'center',
    padding: 5,
    borderBottomWidth: 1.0,
    width: 100,
    marginLeft: 5,
  }, 
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'space-around',
    width: 220
  }
});
