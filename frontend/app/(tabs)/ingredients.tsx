import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Input, Modal } from "../..";
import { colors, dimensions } from "../../constants";
import { Ingredient } from "../../types";

export default function IngredientsScreen() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    {
      id: "1",
      name: "Tomatoes",
      amount: 2,
      unit: "pieces",
      category: "Vegetables",
    },
    {
      id: "2",
      name: "Chicken Breast",
      amount: 500,
      unit: "grams",
      category: "Meat",
    },
    { id: "3", name: "Rice", amount: 1, unit: "cup", category: "Grains" },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newIngredient, setNewIngredient] = useState({
    name: "",
    amount: "",
    unit: "",
    category: "",
  });

  const categories = [
    "Vegetables",
    "Meat",
    "Grains",
    "Dairy",
    "Spices",
    "Other",
  ];
  const units = [
    "pieces",
    "grams",
    "kg",
    "cups",
    "tablespoons",
    "teaspoons",
    "ml",
    "liters",
  ];

  const handleAddIngredient = () => {
    if (
      newIngredient.name &&
      newIngredient.amount &&
      newIngredient.unit &&
      newIngredient.category
    ) {
      const ingredient: Ingredient = {
        id: Date.now().toString(),
        name: newIngredient.name,
        amount: parseFloat(newIngredient.amount),
        unit: newIngredient.unit,
        category: newIngredient.category,
      };

      setIngredients([...ingredients, ingredient]);
      setNewIngredient({ name: "", amount: "", unit: "", category: "" });
      setShowAddModal(false);

      Alert.alert("Success", "Ingredient added successfully!");
    } else {
      Alert.alert("Error", "Please fill all fields");
    }
  };

  const handleDeleteIngredient = (id: string) => {
    Alert.alert(
      "Delete Ingredient",
      "Are you sure you want to delete this ingredient?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () =>
            setIngredients(ingredients.filter((ing) => ing.id !== id)),
          style: "destructive",
        },
      ]
    );
  };

  const findRecipes = () => {
    Alert.alert(
      "Recipe Suggestions",
      "Based on your ingredients, we suggest: Pasta with Chicken and Tomatoes!"
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Ingredients</Text>
        <Button
          title="Add Ingredient"
          onPress={() => setShowAddModal(true)}
          size="small"
        />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.summary}>
          <Text style={styles.summaryText}>
            You have {ingredients.length} ingredients
          </Text>
          <Button
            title="Find Recipes"
            onPress={findRecipes}
            variant="outline"
            size="small"
          />
        </View>

        {ingredients.map((ingredient) => (
          <View key={ingredient.id} style={styles.ingredientCard}>
            <View style={styles.ingredientInfo}>
              <Text style={styles.ingredientName}>{ingredient.name}</Text>
              <Text style={styles.ingredientDetails}>
                {ingredient.amount} {ingredient.unit} • {ingredient.category}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteIngredient(ingredient.id)}
            >
              <Text style={styles.deleteButtonText}>×</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <Modal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Ingredient"
      >
        <Input
          label="Ingredient Name"
          value={newIngredient.name}
          onChangeText={(text) =>
            setNewIngredient({ ...newIngredient, name: text })
          }
          placeholder="e.g., Tomatoes"
        />

        <Input
          label="Amount"
          value={newIngredient.amount}
          onChangeText={(text) =>
            setNewIngredient({ ...newIngredient, amount: text })
          }
          placeholder="e.g., 2"
          keyboardType="numeric"
        />

        <Input
          label="Unit"
          value={newIngredient.unit}
          onChangeText={(text) =>
            setNewIngredient({ ...newIngredient, unit: text })
          }
          placeholder="e.g., pieces, grams, cups"
        />

        <Input
          label="Category"
          value={newIngredient.category}
          onChangeText={(text) =>
            setNewIngredient({ ...newIngredient, category: text })
          }
          placeholder="e.g., Vegetables, Meat"
        />

        <View style={styles.modalButtons}>
          <Button
            title="Cancel"
            onPress={() => setShowAddModal(false)}
            variant="outline"
            style={styles.modalButton}
          />
          <Button
            title="Add"
            onPress={handleAddIngredient}
            style={styles.modalButton}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: dimensions.padding.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: dimensions.fontSize.xxxl,
    fontWeight: "bold",
    color: colors.text,
  },
  scrollView: {
    flex: 1,
    padding: dimensions.padding.lg,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: dimensions.margin.lg,
    padding: dimensions.padding.md,
    backgroundColor: colors.background,
    borderRadius: dimensions.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryText: {
    fontSize: dimensions.fontSize.md,
    color: colors.text,
    fontWeight: "500",
  },
  ingredientCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: dimensions.padding.md,
    backgroundColor: colors.background,
    borderRadius: dimensions.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: dimensions.margin.sm,
  },
  ingredientInfo: {
    flex: 1,
  },
  ingredientName: {
    fontSize: dimensions.fontSize.lg,
    fontWeight: "600",
    color: colors.text,
    marginBottom: dimensions.margin.xs,
  },
  ingredientDetails: {
    fontSize: dimensions.fontSize.md,
    color: colors.textSecondary,
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.error,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: colors.background,
    fontSize: dimensions.fontSize.lg,
    fontWeight: "bold",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: dimensions.margin.lg,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: dimensions.margin.xs,
  },
});
