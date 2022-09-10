import React from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';
import { globalStyles } from '../styles/global.js';
import { Formik } from 'formik';

export default function MoveForm({ addMove }) {

  return (
    
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ title: '', difficulty: '', description: '' }}
        onSubmit={(values, actions) => {
          actions.resetForm(); 
          addMove(values);
        }}
      >
        {props => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder='Move title'
              onChangeText={props.handleChange('title')}
              value={props.values.title}
            />

            <TextInput
              style={globalStyles.input}
              multiline
              placeholder='Difficulty'
              onChangeText={props.handleChange('difficulty')}
              value={props.values.body}
              keyboardType='numeric'
            />

            <TextInput 
              style={globalStyles.input}
              placeholder='Description'
              onChangeText={props.handleChange('description')}
              value={props.values.rating}
            />
            
            <Button color='maroon' title="Submit" onPress={props.handleSubmit} /> 
          </View>
        )}
      </Formik>
    </View>
    
  );
}