import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';

const LoginForm: React.FC = () => {
    return (
        <View style={styles.formCard}>
            <Text style={styles.formTitle}>Iniciar sesión</Text>
            
            <CustomInput 
                label="Correo electrónico" 
                placeholder="Ingrese su correo"
                keyboardType="email-address"
                autoCapitalize="none"
            />
            
            <CustomInput 
                label="Contraseña" 
                placeholder="Ingrese su contraseña" 
                secureTextEntry={true} 
            />
            
            <CustomButton 
                title="Iniciar sesión" 
                onPress={() => console.log('Login presionado')} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    formCard: {
        backgroundColor: '#ffffff',
        padding: 25,
        borderRadius: 15,
        margin: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    formTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 25,
    },
});

export default LoginForm;