import React, { useEffect, useState } from 'react';
import { SafeAreaView, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppNavigator } from './src/screens/AppNavigator';

//Redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { storeInstance, persistor } from './src/redux/store';
import { useSelector, useDispatch } from 'react-redux';

//Actions
import { setTheme } from './src/redux/reducers/OptionsReducer';

//Theme and UI
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Appearance } from 'react-native';
import { default as theme } from './src/base-theme.json';
// import { default as mapping } from './src/mapping.json';
import * as eva from '@eva-design/eva';

//Types
import { AnticipateRootState } from './src/redux/types/AnticipateRootState';
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';



function AppContent() {
  const themeOption = useSelector((state: AnticipateRootState) => state.options.theme);

  const systemTheme = useColorScheme() || 'light';
  const currentTheme = themeOption === 'auto' ? systemTheme : themeOption;

  return (
    <ApplicationProvider {...eva}
      theme={currentTheme === 'dark' ? eva.dark : eva.light}
    >
      <PersistGate loading={null} persistor={persistor}>
        <IconRegistry icons={EvaIconsPack} />
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.0)' }}>
          <SafeAreaView style={{ flex: 1 }}>
            <AppNavigator />
          </SafeAreaView>
        </GestureHandlerRootView>
      </PersistGate>
    </ApplicationProvider>
  )
}


function App(): React.JSX.Element {
  return (
    <Provider store={storeInstance}>
      <AppContent />
    </Provider>
  );
}

export default App;
