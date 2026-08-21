import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Text, View } from 'react-native';
import LoginScreen from '../screens/login/LoginScreen';
import DiagnosticScreen from '../screens/diagnostics/DiagnosticScreen';
import PatientsList from '../screens/patientsList/PatientsList';

import { Link } from '@react-navigation/native';
// import { Button } from '@react-navigation/elements';

const HomeScreenList = () => {
  return (
    <View>
      <Text>Home Screen List</Text>
      <Link screen="Login" params={{}}>Go to Login</Link>
      <Link screen="PatientList" params={{}}>Go to Patient List</Link>
      <Link screen="Diagnostic" params={{}}>Go to DiagnosticScreen</Link>
    </View>
  );
};

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screens: {
    Home: HomeScreenList,
    Login: LoginScreen,
    PatientList: PatientsList,
    Diagnostic: DiagnosticScreen,
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function RouterComponent() {
  return <Navigation />;
}
