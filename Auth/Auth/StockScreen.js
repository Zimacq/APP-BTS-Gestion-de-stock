import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Alert, Modal, TextInput, Image } from 'react-native';

const deleteIcon = require('./IconSupp.png');
const editIcon = require('./IconModif.png');

const ProductScreen = () => {
  const [produits, setProduits] = useState([
      { id: 1, nom: 'Baskets', categorie: 'Hommes', stock: 100 },
      { id: 2, nom: 'Pull', categorie: 'Femmes', stock: 0 },
      { id: 3, nom: 'Sweat', categorie: 'Hommes', stock: 50 },
      { id: 4, nom: 'Robe', categorie: 'Femmes', stock: 30 },
      { id: 5, nom: 'Chaussures de sport', categorie: 'Enfants', stock: 20 },
      { id: 6, nom: 'Chemise', categorie: 'Hommes', stock: 80 },
      { id: 7, nom: 'Jupe', categorie: 'Femmes', stock: 15 },
      { id: 8, nom: 'Pantalon', categorie: 'Hommes', stock: 70 },
      { id: 9, nom: 'T-shirt', categorie: 'Femmes', stock: 25 },
      { id: 10, nom: 'Manteau', categorie: 'Hommes', stock: 40 },
      { id: 11, nom: 'Sandales', categorie: 'Femmes', stock: 10 },
      { id: 12, nom: 'Short', categorie: 'Hommes', stock: 60 },
      { id: 13, nom: 'Chapeau', categorie: 'Accessoires', stock: 5 },
      { id: 14, nom: 'Veste', categorie: 'Femmes', stock: 45 },
      { id: 15, nom: 'Pyjama', categorie: 'Enfants', stock: 35 }
  ]);
    
  const [isModalVisible, setModalVisible] = useState(false);
  const [nomProduit, setNomProduit] = useState('');
  const [categorieProduit, setCategorieProduit] = useState('Hommes');
  const [stockProduit, setStockProduit] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const categories = ["Hommes","Femmes","Enfants","Accessoires"];

  const handleAjoutProduit = () => {
    setIsEditMode(false);
    setModalVisible(true);
  };

  const ajouterProduit = () => {
    const nouveauProduit = {
      id: produits.length + 1,
      nom: nomProduit,
      categorie: categorieProduit,
      stock: parseInt(stockProduit, 10),
    };
    setProduits([...produits, nouveauProduit]);
    // Réinitialiser les champs après l'ajout
    setNomProduit('');
    setCategorieProduit('Hommes');
    setStockProduit('');
    setModalVisible(false);
  };

  const modifierProduit = () => {
    const produitsCopy = [...produits];
    const index = produitsCopy.findIndex((produit) => produit.id === selectedProductId);
    if (index !== -1) {
      produitsCopy[index] = {
        ...produitsCopy[index],
        nom: nomProduit,
        categorie: categorieProduit,
        stock: parseInt(stockProduit, 10),
      };
      setProduits(produitsCopy);
      setNomProduit('');
      setCategorieProduit('Hommes');
      setStockProduit('');
      setSelectedProductId(null);
      setIsEditMode(false);
      setModalVisible(false);
    }
  };

  const handleSuppressionProduit = (id) => {
    Alert.alert('Supprimer un produit', `Êtes-vous sûr de vouloir supprimer le produit ${id} ?`, [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Supprimer', onPress: () => setProduits(produits.filter(produit => produit.id !== id)) },
    ]);
  };

  const handleModificationProduit = (produit) => {
    setIsEditMode(true);
    setSelectedProductId(produit.id);
    setNomProduit(produit.nom);
    setCategorieProduit(produit.categorie);
    setStockProduit(produit.stock.toString());
    setModalVisible(true);
  };

  const getStockColor = (stock) => {
    if (stock === 0) return 'red';
    else if (stock <= 25) return 'red';
    else if (stock <= 50) return 'orange';
    else return 'green';
  };

  return (
    <ScrollView style={styles.container}>
      {/* Liste des produits */}
      <View style={styles.productList}>
        {/* Légende */}
        <View style={styles.legendRow}>
          <Text style={[styles.legendCell, styles.legendText]}>ID</Text>
          <Text style={[styles.legendCell, styles.legendText]}>Status</Text>
          <Text style={[styles.legendCell, styles.legendText]}>Nom du produit</Text>
          <Text style={[styles.legendCell, styles.legendText]}>Catégorie</Text>
          <Text style={[styles.legendCell, styles.legendText]}>Stock</Text>
          <View style={styles.actionCell}>
            <Text style={styles.legendText}>Actions</Text>
          </View>
        </View>
        {/* Liste des produits */}
        {produits.map((produit) => (
          <View key={produit.id} style={styles.productRow}>
            <Text style={styles.productId}>{produit.id}</Text>
            <View style={[styles.statusPastille, { backgroundColor: getStockColor(produit.stock) }]}>
              <Text style={styles.pastilleText}>{produit.stock}</Text>
            </View>
            <Text style={styles.productName}>{produit.nom}</Text>
            <Text style={styles.productCategory}>{produit.categorie}</Text>
            <View style={styles.stockContainer}>
              <Text style={styles.productStock}>{produit.stock}</Text>
            </View>
            <TouchableOpacity onPress={() => handleModificationProduit(produit)} style={styles.actionButton}>
              <Image source={editIcon} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSuppressionProduit(produit.id)} style={styles.actionButton}>
              <Image source={deleteIcon} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <TouchableOpacity onPress={handleAjoutProduit} style={styles.addButton}>
        <Text style={styles.buttonText}>+ Ajouter un produit</Text>
      </TouchableOpacity>

      {/* Modal pour ajouter ou modifier un produit */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(!isModalVisible)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* Légendes */}
            <Text style={styles.legend}>Nom du produit</Text>
            <TextInput
              placeholder="Nom du produit"
              value={nomProduit}
              onChangeText={setNomProduit}
              style={styles.input}
            />
            <Text style={styles.legend}>Catégorie du produit</Text>
            {/* Catégories sous forme de boutons plutôt que le Picker */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
              {/* Liste des catégories */}
              {categories.map((categorie) => (
                <TouchableOpacity
                  key={categorie}
                  onPress={() => setCategorieProduit(categorie)}
                  style={[styles.categoryButton, categorieProduit === categorie && styles.categoryButtonSelected]}>
                  <Text style={styles.categoryButtonText}>{categorie}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.legend}>Stock du produit</Text>
            <TextInput
              placeholder="Stock du produit"
              value={stockProduit}
              onChangeText={setStockProduit}
              keyboardType="numeric"
              style={styles.input}
            />
            {/* Bouton Annuler */}
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Annuler</Text>
            </TouchableOpacity>
            {/* Bouton Ajouter/Modifier */}
            {isEditMode ? (
              <TouchableOpacity onPress={modifierProduit} style={styles.addButton}>
                <Text style={styles.buttonText}>Modifier</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={ajouterProduit} style={styles.addButton}>
                <Text style={styles.buttonText}>Ajouter</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5', // Un fond plus clair pour le contraste
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 10,
  },
  legendCell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  legendText: {
    fontSize: 12, // Taille de police légèrement réduite
  },
  actionCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productList: {
    marginBottom: 10, // Ajout de la marge en bas pour séparer du bouton d'ajout
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center', // Aligner les éléments verticalement
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: 'white', // Fond blanc pour les lignes de produit
    borderWidth: 1,
    borderColor: '#e0e0e0', // Bordure plus douce
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5, // Ajout de la marge à tous les éléments de la ligne de produit
  },
  productId: {
    textAlign: 'center',
    fontSize: 12,
    marginLeft: 10,
  },
  statusPastille: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    marginLeft: 10,
  },
  pastilleText: {
    color: 'transparent',
    fontSize: 1,
  },
  productName: {
    flex: 1,
    textAlign: 'left',
    fontSize: 12,
    marginLeft: 20,
  },
  productCategory: {
    textAlign: 'center',
    fontSize: 12,
    flex: 1,
  },
  productStock: {
    fontSize: 14,
    marginLeft: 15,
    marginRight: 5,
  },

  actionButton: {
    padding: 5,
    borderRadius: 20,
    elevation: 2,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 20,
    marginTop: 10,
    alignSelf: 'center',
    width: '80%',
  },
  cancelButton: {
    backgroundColor: 'orange', // Couleur orange pour le bouton Annuler
    padding: 15,
    borderRadius: 20,
    marginTop: 10,
    alignSelf: 'center',
    width: '80%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  input: {
    width: '100%',
    height: 50,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    fontSize: 14,
  },
  categoryButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 20,
    margin: 5,
  },
  categoryButtonSelected: {
    backgroundColor: '#007bff',
  },
  categoryButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legend: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 20, // Alignement avec les autres champs
  },
});

export default ProductScreen;
