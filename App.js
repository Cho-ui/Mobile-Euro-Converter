import React from 'react';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { key } from './Key';

export default function App() {
  const [rates, setRates] = useState([]);
  const [currency, setCurrency] = useState();
  const [toConvert, setToConvert] = useState('');
  const [converted, setConverted] = useState(0);
 
   const fetchRates = async () => {
   try {
      const response = await fetch(`http://api.exchangeratesapi.io/latest?access_key=${key}`);
      const data = await response.json();
      setRates(data.rates);
    }
   catch(error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    (async () => {
      const result = await fetchRates();
    })();
  }, []); 

  const convert = () => {
    let conversion = toConvert/currency;
    setConverted(conversion.toFixed(2));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image style={styles.euroImage} 
      source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Reverso_1_euro.jpg'}} />
      <Text style={styles.converted}>{converted} €</Text>
      <View style={styles.inputRow}>
        <TextInput
        style={styles.inputValues}
        placeholder='00.00'
        keyboardType='numeric'
        onChangeText={input => setToConvert(input)} />
        <Picker
        style={styles.picker} 
        mode='dropdown'
        selectedValue={currency}
        onValueChange={(itemValue, itemIndex) =>
          setCurrency(itemValue)}>
            {Object.keys(rates).map((o, i) =>
            <Picker.Item label={o} value={rates[o]} key={i} />)}
        </Picker>
      </View>
      <Button title="Convert to €" onPress={convert} />
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
  inputRow: {
    flexDirection: 'row'
  },
  inputValues: {
    width: 100
  },
  picker: {
    width: 100
  },
  converted: {
    fontWeight: 'bold',
    fontSize: 20
  },
  euroImage: {
    width: 200,
    height: 200
  }
});
