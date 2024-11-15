import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppNavigator } from './src/screens/AppNavigator';

import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';


function App(): React.JSX.Element {
  return (
    <ApplicationProvider {...eva} theme={{ ...eva.dark }}>
      <IconRegistry icons={EvaIconsPack} />
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'black' }}>
        <SafeAreaView style={{ flex: 1 }}>
          <AppNavigator />
        </SafeAreaView>
      </GestureHandlerRootView>
    </ApplicationProvider>
  );
}

export default App;
