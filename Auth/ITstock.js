import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ProductScreen = () => {
  const [stock, setStock] = useState('');

  return (
    <ScrollView style={styles.container}>
      {/* Category Buttons */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={[styles.button, styles.buttonYellow]}>
          <Text style={styles.buttonText}>Hommes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonYellow]}>
          <Text style={styles.buttonText}>Femmes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonYellow]}>
          <Text style={styles.buttonText}>Enfants</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonYellow]}>
          <Text style={styles.buttonText}>Accessoires</Text>
        </TouchableOpacity>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionGroup}>
        <TouchableOpacity style={[styles.button, styles.buttonGreen]}>
          <Text style={styles.buttonText}>Modifier un produit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonRed]}>
          <Text style={styles.buttonText}>Supprimer un produit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonBlue]}>
          <Text style={styles.buttonText}>+ Ajouter un produit</Text>
        </TouchableOpacity>
      </View>

      {/* Product List */}
      <View style={styles.productList}>
        <View style={styles.productRow}>
          <Text style={styles.productCell}>#7676</Text>
          <Text style={styles.productCell}>baskets</Text>
          <Text style={styles.productCell}>Hommes</Text>
          <View style={[styles.statusCircle, styles.statusComplete]} />
        </View>
      </View>

      {/* Stock Input */}
      <TextInput
        style={styles.stockInput}
        placeholder="Stock (facultatif)"
        value={stock}
        onChangeText={setStock}
        keyboardType="numeric"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonYellow: {
    backgroundColor: 'yellow',
  },
  buttonGreen: {
    backgroundColor: 'green',
  },
  buttonRed: {
    backgroundColor: 'red',
  },
  buttonBlue: {
    backgroundColor: 'blue',
  },
  actionGroup: {
    marginBottom: 20,
  },
  productList: {
    marginBottom: 20,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    alignItems: 'center',
  },
  productCell: {
    flex: 1,
    textAlign: 'center',
  },
  statusCircle: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
  },
  statusComplete: {
    backgroundColor: 'green',
  },
  stockInput: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default ProductScreen;
