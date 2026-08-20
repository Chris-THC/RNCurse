import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

// Definimos la interfaz extendiendo las propiedades por defecto de TextInput
interface CustomInputProps extends TextInputProps {
    label: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ label, placeholder, secureTextEntry, ...rest }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {label} <Text style={styles.required}>*</Text>
            </Text>
            <TextInput 
                style={styles.input} 
                placeholder={placeholder}
                placeholderTextColor="#999999e5"
                secureTextEntry={secureTextEntry}
                {...rest} // Pasa cualquier otra propiedad nativa al TextInput
            />
        </View>
    );
};
11
const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    required: {
        color: 'red',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fff',
    },
});

export default CustomInput;