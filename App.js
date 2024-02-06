import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
  //hook is used to manage state within functional components
  //in this app,it's used to maintain the state of the input value and the result value.
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  // Function to handle button presses
  const onButtonPress = (value) => { // This function is responsible for handling button presses in the calculator.
    switch (value) { // checks the value parameter passed to the function.
      case '=':
        try {
          setResult(eval(input).toString()); // if expression succed is stored (eval is function)
        } catch (error) {
          setResult('error');
        }
        break;

      case 'C':   //This case handles the 'C' button press, which is used to clear the input and result.
        setInput(''); // This clears the input.
        setResult('');//This clears the results.
        break;

      // Handle basic arithmetic operations
      case '+':
      case '-':
      case '*':
      case '/':
        // Check if the last character is an operator and replace it with the new one
        const lastChar = input.slice(-1);
        if (['+', '-', '*', '/'].includes(lastChar)) { // This line extracts the last character from the input string.
          setInput((prevInput) => prevInput.slice(0, -1) + value);
        } else {
          setInput((prevInput) => prevInput + value);
        }
        break;

      default:
        setInput((prevInput) => prevInput + value);
        break;
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>
          {result}
        </Text>

      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
          value={input}
          onChangeText={setInput}
          keyboardType='numeric'
        />
      </View>

      <View style={styles.buttonContainer}>
        {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', 'C', '=', '+'].map((item, index) => (
          <TouchableOpacity key={index} style={styles.button} onPress={() => onButtonPress(item)}>
            <Text style={styles.buttonText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  resultContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  resultText: {
    fontSize: 40,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  inputText: {
    fontSize: 30,
  },
  buttonContainer: {
    flex: 7,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    fontSize: 24,
    width: "25%",
    height: "20%",
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',

  },
  buttontext: {
    fontSize: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttontext: {
    fontSize: 24,
  },

});
