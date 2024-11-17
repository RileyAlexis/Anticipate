import React from 'react';
import { SafeAreaView, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppNavigator } from './src/screens/AppNavigator';

// Redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { storeInstance, persistor } from './src/redux/store';
import { useSelector } from 'react-redux';

// Theme and UI
import { ApplicationProvider, IconRegistry, Layout, useTheme } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';

// Types
import { AnticipateRootState } from './src/redux/types/AnticipateRootState';

function ThemedAppContent() {
  const themeOption = useSelector((state: AnticipateRootState) => state.options.theme);
  const systemTheme = useColorScheme() || 'light';
  const currentTheme = themeOption === 'auto' ? systemTheme : themeOption;

  return (
    <ApplicationProvider {...eva} theme={currentTheme === 'dark' ? eva.dark : eva.light}>
      <PersistGate loading={null} persistor={persistor}>
        <IconRegistry icons={EvaIconsPack} />
        <ThemedContainer>
          <SafeAreaView style={{ flex: 1 }}>
            <AppNavigator />
          </SafeAreaView>
        </ThemedContainer>
      </PersistGate>
    </ApplicationProvider>
  );
}

function ThemedContainer({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const backgroundColor = theme['background-basic-color-1'];

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor }}>
      <Layout style={{ flex: 1, backgroundColor }}>{children}</Layout>
    </GestureHandlerRootView>
  );
}

function App(): React.JSX.Element {
  return (
    <Provider store={storeInstance}>
      <ThemedAppContent />
    </Provider>
  );
}

export default App;