import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold, useFonts } from '@expo-google-fonts/inter';

import SelectCountryCode from './screens/SelectCountryCode';

import LicenseScreen from './screens/LicenseScreen';
import LoginScreen from './screens/LoginScreen';
import CodeScreen from './screens/CodeScreen';
import ChangePinScreen from './screens/ChangePinScreen';
import PinScreen from './screens/PinScreen';
import BiometricScreen from './screens/BiometricScreen';
import DocumentScreen from './screens/DocumentScreen';
import InputLastNameScreen from './screens/InputLastNameScreen';
import InputFirstNameScreen from './screens/InputFirstNameScreen';
import InputPatronymicScreen from './screens/InputPatronymicScreen';
import HowGetScreen from './screens/HowGetScreen';
import BirthDayScreen from './screens/BirthDayScreen';
import SelectDocument from './screens/SelectDocument';
import DateGetScreen from './screens/DateGetScreen';
import ImageScreen from './screens/ImageScreen';

import SelectService from './screens/SelectService';
import SelectAirport from './screens/SelectAirport';
import SearchLostItems from './screens/SearchLostItems';
import SelectTerminal from './screens/SelectTerminal';
import Terminal from './screens/Terminal';
import Orders from './screens/Orders';
import LicenseLuggage from './screens/LicenseLuggage';
import AddLuggage from './screens/AddLuggage';
import DeliverHome from './screens/DeliverHome';
import MOACodeScreen from './screens/MOACodeScreen';
import MOACodeScreenExtension from './screens/MOACodeScreenExtension';
import AcceptLuggage from './screens/AcceptLuggage';
import QRCodeScreen from './screens/QRCode';

import Where from './screens/SearchItems/Where';
import When from './screens/SearchItems/When';
import What from './screens/SearchItems/What';
import Info from './screens/SearchItems/Info';
import RuleReferences from './screens/SearchItems/RuleReferences';

import AcceptLuggageMileonAir from './screens/GetLuggage';
import SelectTransportCompany from './screens/SelectTransportCompany';

import Profile from './screens/Profile/Profile';
import AddEmail from './screens/Profile/AddEmail';
import ChangePin from './screens/Profile/ChangePin';
import AddCard from './screens/Profile/AddCard';
import Airports from './screens/Profile/Airports';
import Terminals from './screens/Profile/Terminals';
import ClosedOrders from './screens/Profile/ClosedOrders';
import PaymentMethods from './screens/Profile/PaymentMethods';
import HowJoinMOA from './screens/Profile/HowJoinMOA';
import ChooseLanguage from './screens/Profile/ChooseLanguage';


import BottomSheet, { BottomSheetBackdrop, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import ChangeFirstNameScreen from './screens/Profile/ChangeFirstNameScreen';
import ChangeLastNameScreen from './screens/Profile/ChangeLastNameScreen';
import QRCodeTakeScreen from './screens/QRCodeTake';
import CameraScreen from './screens/CameraScreen';


const Stack = createNativeStackNavigator()

function App() {

  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='select_country_code' >
        <Stack.Screen name='select_country_code' component={SelectCountryCode} />

        <Stack.Screen options={{ headerShown: false }} name='login' component={LoginScreen} />
        <Stack.Screen name='license' component={LicenseScreen} />
        <Stack.Screen options={{ headerShown: false }} name='code' component={CodeScreen} />
        <Stack.Screen options={{ headerShown: false }} name='changepin' component={ChangePinScreen} />
        <Stack.Screen options={{ headerShown: false }} name='pin' component={PinScreen} />
        <Stack.Screen options={{ headerShown: false }} name='biometric' component={BiometricScreen} />

        <Stack.Screen name='last_name' component={InputLastNameScreen} />
        <Stack.Screen name='first_name' component={InputFirstNameScreen} />
        <Stack.Screen name='patronymic' component={InputPatronymicScreen} />
        {/* <Stack.Screen name='birthday' component={BirthDayScreen} />
        <Stack.Screen name='type_doc' component={SelectDocument} />
        <Stack.Screen name='document' component={DocumentScreen} />
        <Stack.Screen name='how_get' component={HowGetScreen} />
        <Stack.Screen name='date_get' component={DateGetScreen} />
        <Stack.Screen name='input_image' component={ImageScreen} /> */}

        <Stack.Screen name='select_service' component={SelectService} />
        <Stack.Screen name='select_terminal' component={SelectTerminal} />
        <Stack.Screen name='search_lost_tems' component={SearchLostItems} />
        <Stack.Screen options={{ presentation: 'modal' }} name='select_airport' component={SelectAirport} />
        <Stack.Screen name='terminal' component={Terminal} />
        <Stack.Screen name='license_luggage' component={LicenseLuggage} />
        <Stack.Screen options={{ headerShown: false }} name='add_luggage' component={AddLuggage} />
        <Stack.Screen options={{ headerShown: false, presentation: 'modal' }} name='camera'  component={CameraScreen} />
        <Stack.Screen options={{ headerShown: false }} name='moa_code' component={MOACodeScreen} />
        <Stack.Screen options={{ headerShown: false }} name='moa_code_extension' component={MOACodeScreenExtension} />
        <Stack.Screen name='accept_luggage' component={AcceptLuggage} />
        <Stack.Screen name='qr_code' component={QRCodeScreen} />
        <Stack.Screen name='qr_code_take' component={QRCodeTakeScreen} />

        <Stack.Screen name='where_forget' component={Where} />
        <Stack.Screen name='when_forget' component={When} />
        <Stack.Screen name='what_forget' component={What} />
        <Stack.Screen name='info_forget' component={Info} />
        <Stack.Screen name='rule_references' component={RuleReferences} />

        <Stack.Screen name='orders' component={Orders} />
        <Stack.Screen name='accept_luggage_mileonair' component={AcceptLuggageMileonAir} />
        <Stack.Screen name='deliver_home' component={DeliverHome} />
        <Stack.Screen name='select_transport_company' component={SelectTransportCompany} />

        <Stack.Screen name='profile' component={Profile} />
        <Stack.Screen name='add_email' component={AddEmail} />
        <Stack.Screen name='change_pin' component={ChangePin} />
        <Stack.Screen name='add_card' component={AddCard} />
        <Stack.Screen name='airports' component={Airports} />
        <Stack.Screen name='terminals' component={Terminals} />
        <Stack.Screen name='change_first_name' component={ChangeFirstNameScreen} />
        <Stack.Screen name='change_last_name' component={ChangeLastNameScreen} />
        <Stack.Screen name='closed_orders' component={ClosedOrders} />
        <Stack.Screen name='payment_methods' component={PaymentMethods} />
        <Stack.Screen name='how_join_moa' component={HowJoinMOA} />
        <Stack.Screen name='choose_language' component={ChooseLanguage} />

      </Stack.Navigator>
    </NavigationContainer>

  );
}


export default App
