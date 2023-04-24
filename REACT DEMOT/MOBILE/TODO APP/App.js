import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Keyboard } from 'react-native';
import React, { useState } from 'react';

function Banner() {
  return (
    <View style={styles.banner}>
      <Text style={styles.bannerText}>ToDo example with React Native</Text>
    </View>
  );
}

function ToDoList() {
  const [itemText, setItemText] = useState(""); 
  const [items, setItems] = useState([]); 

  const addToDoItem = () => {
    if (itemText !== '') {
        // add item to items, Math.random() is used to generate "unique" ID...
        setItems([...items, {id: Math.random(), text: itemText}])
        // modify newItem text to ""
        setItemText('')
      }
      Keyboard.dismiss();
    }

    const removeItem = (id) => {
      // filter/remove item with id
      const newItems = items.filter(item => item.id !== id);
      // set new items
      setItems(newItems);
    }

  return (
    <View>
      <View style={styles.addToDo}>
        <TextInput
          style={styles.addToDoTextInput} 
          value={itemText}
          onChangeText={ (text) => setItemText(text)}  
          placeholder="New todo here"
          />
        <Button 
          title="Add" 
          style={styles.addTodoButton} 
          onPress={addToDoItem}
          />
      </View>
      <ScrollView style={styles.list}>
        {items.map( (item,index) => (
          <View key={index} style={styles.listItem}>
            <Text 
              style={styles.listItemText}>* {item.text}
            </Text>
            <Text 
              style={styles.listItemDelete} 
              onPress={() => removeItem(item.id)}>
              delete
            </Text>
          </View> 
        ))}        
      </ScrollView>   
    </View>
    );
}

export default function App() {
  return (
    <View style={styles.container}>
      <Banner />
      <ToDoList />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: 28,
    margin: 5
  },
  banner: {
    backgroundColor: 'salmon',
    justifyContent: 'center',
    marginBottom: 50
  },
  bannerText: {
    color: 'black',
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  addToDo: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  addToDoTextInput : {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ccc',
    padding: 5,
    margin: 2,
    flex: 1,
  },
  list: {
    color: 'black',
    margin: 5,
  },
  listItem: {
    flex: 1, 
    flexDirection: 'row',
    margin: 5
  },
  listItemText: {
  },
  listItemDelete: {
    marginStart: 10,
    color: 'red',
    fontWeight: 'bold'
  }
});
