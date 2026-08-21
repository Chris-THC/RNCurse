import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Diagnostic } from '../../api/service';

const noteIcon = require('../../../assets/icons/notes.png');
const infoIcon = require('../../../assets/icons/information.png');
const heartIcon = require('../../../assets/icons/heart.png');

interface CardProps {
  diagnostico: Diagnostic;
  onOpenMenu: (diagnostico: Diagnostic) => void;
}

const Card: React.FC<CardProps> = ({ diagnostico, onOpenMenu }) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: diagnostico.imagen }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.title}>{diagnostico.nombreDiagnostico}</Text>
        <Text style={styles.description}>{diagnostico.descripcion}</Text>

        <View style={styles.list}>
          <View style={styles.listItem}>
             <Image style={styles.iconPlaceholder} source={noteIcon} />
            <Text style={styles.listItemText}>Categoría: {diagnostico.categoria}</Text>
          </View>
          <View style={styles.listItem}>
            <Image style={styles.iconPlaceholder} source={infoIcon} />
            <Text style={styles.listItemText}>Tipo: {diagnostico.tipo}</Text>
          </View>
          <View style={styles.listItem}>
            <Image style={styles.iconPlaceholder} source={heartIcon} />
            <Text style={styles.listItemText}>
              Es crónico: {diagnostico.esCronicoCadena}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => onOpenMenu(diagnostico)}
          activeOpacity={0.8}
        >
          <Text style={styles.menuDots}>⋮</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  imageContainer: {
    height: 180,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cardBody: {
    padding: 20,
    paddingBottom: 24,
    position: 'relative',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#4A4A4A',
    marginBottom: 20,
    lineHeight: 20,
  },
  list: {
    gap: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 16,
    marginRight: 8,
    width: 24,
    textAlign: 'center',
  },
  listItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  menuButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#65C227',
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuDots: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  iconPlaceholder: {
    marginRight: 15,
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
});