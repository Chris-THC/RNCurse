/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DiagnosticScreen from './src/screens/diagnostics/DiagnosticScreen';
// import LoginScreen from './src/screens/login/LoginScreen';
// import PatientsList from './src/screens/patientsList/PatientsList';

function App() {
  // const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
      {/* <LoginScreen /> */}
      {/* <PatientsList /> */}
      <DiagnosticScreen />
    </SafeAreaProvider>
  );
}

export default App;
