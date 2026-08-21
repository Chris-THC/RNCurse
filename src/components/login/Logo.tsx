import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
const iconLogo = require('../../../assets/logo/logo-full.png');

const Logo: React.FC = () => {
  return (
    <View style={styles.logoContainer}>
      <View>
        <Image style={styles.iconPlaceholder} source={iconLogo} />
      </View>
      <Text style={styles.brandTitle}>
        Diabetes <Text style={styles.brandAccent}>ReSync</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 15,
  },
  iconPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  brandTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  brandAccent: {
    color: '#4cd24c',
  },
});

export default Logo;
