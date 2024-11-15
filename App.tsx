import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppNavigator } from './src/screens/AppNavigator';


function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'black' }}>

      <SafeAreaView style={{ flex: 1 }}>
        <AppNavigator />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default App;
