import React from 'react';
import {
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import BrandingPanel from '../../components/login/BrandingPanel';
import LoginForm from '../../components/login/LoginForm';
import Logo from '../../components/login/Logo';


const loginBg = require('../../../assets/login-bg-4.jpg');

const LoginScreen: React.FC = () => {
    return (
        <ImageBackground source={loginBg} style={styles.background}>
            <View style={styles.safeArea}>
                <KeyboardAvoidingView 
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.keyboardView}
                >
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <Logo />
                        <LoginForm />
                        <BrandingPanel />
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    safeArea: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    keyboardView: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
});

export default LoginScreen;