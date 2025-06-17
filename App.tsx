import React from 'react';
import { StyleSheet } from 'react-native';
import MainNavigationStack from './src/navigation/MainNavigationStack';

function App() {
  return <MainNavigationStack />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
