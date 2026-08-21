import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 0) return null;

  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        style={[
          styles.pageButton,
          currentPage === 1 && styles.pageButtonDisabled,
        ]}
        onPress={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        <Text
          style={[
            styles.pageButtonText,
            currentPage === 1 && styles.pageButtonTextDisabled,
          ]}
        >
          Anterior
        </Text>
      </TouchableOpacity>

      <Text style={styles.pageIndicator}>
        Pág {currentPage} de {totalPages}
      </Text>

      <TouchableOpacity
        style={[
          styles.pageButton,
          currentPage === totalPages && styles.pageButtonDisabled,
        ]}
        onPress={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        <Text
          style={[
            styles.pageButtonText,
            currentPage === totalPages && styles.pageButtonTextDisabled,
          ]}
        >
          Siguiente
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  pageButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 6,
  },
  pageButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  pageButtonText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
  },
  pageButtonTextDisabled: {
    color: '#999',
  },
  pageIndicator: {
    fontSize: 13,
    color: '#555',
    fontWeight: '500',
  },
});
