import React from 'react';
import type { PropsWithChildren } from 'react';
import { SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppNavigator } from './src/screens/AppNavigator';

//Redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { storeInstance, persistor } from './src/redux/store';

//Theme and UI
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as theme } from './src/base-theme.json';
// import { default as mapping } from './src/mapping.json';
import * as eva from '@eva-design/eva';


function App(): React.JSX.Element {
  return (
    <Provider store={storeInstance}>
      <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
        <PersistGate loading={null} persistor={persistor}>
          <IconRegistry icons={EvaIconsPack} />
          <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'black' }}>
            <SafeAreaView style={{ flex: 1 }}>
              <AppNavigator />
            </SafeAreaView>
          </GestureHandlerRootView>
        </PersistGate>
      </ApplicationProvider>
    </Provider>
  );
}

export default App;
