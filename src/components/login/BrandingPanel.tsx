import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const facebookIcon = require('../../../assets/icons/facebook-icon.png');
const twitterIcon = require('../../../assets/icons/twitter-icon.png');
const linkedinIcon = require('../../../assets/icons/linkedin-icon.png');


const BrandingPanel: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.descriptionContainer}>
                <Text style={styles.title}>
                    Planes integrales en apoyo hacia la remisión de la DM2
                </Text>
                
                <View style={styles.socialIcons}>
                    <Image style={styles.iconPlaceholder} source={facebookIcon} />
                    <Image style={styles.iconPlaceholder} source={twitterIcon} />
                    <Image style={styles.iconPlaceholder} source={linkedinIcon} />
                </View>

                <Text style={styles.footerText}>
                    Copyright © Designed & Developed by DexignZone 2024
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 10,
    },
    descriptionContainer: {
        marginTop: 10,
    },
    title: {
        fontSize: 22,
        color: '#ffffff',
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    socialIcons: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    iconPlaceholder: {
        color: '#fff',
        marginRight: 15,
        fontSize: 16,
        width: 35,
        height: 35,
        resizeMode: 'contain',
    },
    footerText: {
        color: '#dddddd',
        fontSize: 12,
        marginTop: 30,
        textAlign: 'center',
    }
});

export default BrandingPanel;