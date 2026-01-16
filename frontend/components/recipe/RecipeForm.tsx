import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, dimensions } from "../../constants";
import { Ingredient, Recipe } from "../../types";
import { Button, Input, Modal } from "../common";

interface RecipeFormProps {
  visible: boolean;
  onClose: () => void;
  onSave: (recipe: Partial<Recipe>) => void;
  recipe?: Recipe;
}

export const RecipeForm: React.FC<RecipeFormProps> = ({
  visible,
  onClose,
  onSave,
  recipe,
}) => {
  const [formData, setFormData] = useState({
    title: recipe?.title || "",
    description: recipe?.description || "",
    cookingTime: recipe?.cookingTime?.toString() || "",
    difficulty: recipe?.difficulty || ("medium" as const),
    category: recipe?.category || "",
    instructions: recipe?.instructions?.join("\n") || "",
  });

  const [ingredients, setIngredients] = useState<Ingredient[]>(
    recipe?.ingredients || []
  );
  const [newIngredient, setNewIngredient] = useState({
    name: "",
    amount: "",
    unit: "",
    category: "",
  });

  const difficulties = ["easy", "medium", "hard"] as const;
  const categories = [
    "Italian",
    "Thai",
    "French",
    "Mexican",
    "Indian",
    "Chinese",
    "American",
    "Other",
  ];

  const handleAddIngredient = () => {
    if (newIngredient.name && newIngredient.amount && newIngredient.unit) {
      const ingredient: Ingredient = {
        id: Date.now().toString(),
        name: newIngredient.name,
        amount: parseFloat(newIngredient.amount),
        unit: newIngredient.unit,
        category: newIngredient.category || "Other",
      };

      setIngredients([...ingredients, ingredient]);
      setNewIngredient({ name: "", amount: "", unit: "", category: "" });
    } else {
      Alert.alert("Error", "Please fill all ingredient fields");
    }
  };

  const handleRemoveIngredient = (id: string) => {
    setIngredients(ingredients.filter((ing) => ing.id !== id));
  };

  const handleSave = () => {
    if (
      !formData.title ||
      !formData.description ||
      !formData.cookingTime ||
      !formData.category
    ) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    const recipeData: Partial<Recipe> = {
      title: formData.title,
      description: formData.description,
      cookingTime: parseInt(formData.cookingTime),
      difficulty: formData.difficulty,
      category: formData.category,
      ingredients,
      instructions: formData.instructions
        .split("\n")
        .filter((step) => step.trim()),
      images: [],
      videos: [],
      isPremium: false,
    };

    onSave(recipeData);
    onClose();
    Alert.alert("Success", "Recipe saved successfully!");
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title={recipe ? "Edit Recipe" : "Create Recipe"}
    >
      <ScrollView style={styles.scrollView}>
        <Input
          label="Recipe Title *"
          value={formData.title}
          onChangeText={(text) => setFormData({ ...formData, title: text })}
          placeholder="Enter recipe title"
        />

        <Input
          label="Description *"
          value={formData.description}
          onChangeText={(text) =>
            setFormData({ ...formData, description: text })
          }
          placeholder="Describe your recipe"
          multiline
        />

        <Input
          label="Cooking Time (minutes) *"
          value={formData.cookingTime}
          onChangeText={(text) =>
            setFormData({ ...formData, cookingTime: text })
          }
          placeholder="e.g., 30"
          keyboardType="numeric"
        />

        <View style={styles.selectContainer}>
          <Text style={styles.label}>Difficulty *</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.optionsRow}>
              {difficulties.map((difficulty) => (
                <TouchableOpacity
                  key={difficulty}
                  style={[
                    styles.optionButton,
                    formData.difficulty === difficulty &&
                      styles.optionButtonSelected,
                  ]}
                  onPress={() => setFormData({ ...formData, difficulty })}
                >
                  <Text
                    style={[
                      styles.optionText,
                      formData.difficulty === difficulty &&
                        styles.optionTextSelected,
                    ]}
                  >
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.selectContainer}>
          <Text style={styles.label}>Category *</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.optionsRow}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.optionButton,
                    formData.category === category &&
                      styles.optionButtonSelected,
                  ]}
                  onPress={() => setFormData({ ...formData, category })}
                >
                  <Text
                    style={[
                      styles.optionText,
                      formData.category === category &&
                        styles.optionTextSelected,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients</Text>

          <View style={styles.ingredientInput}>
            <Input
              label="Ingredient Name"
              value={newIngredient.name}
              onChangeText={(text) =>
                setNewIngredient({ ...newIngredient, name: text })
              }
              placeholder="e.g., Tomatoes"
              containerStyle={styles.ingredientInputField}
            />
            <Input
              label="Amount"
              value={newIngredient.amount}
              onChangeText={(text) =>
                setNewIngredient({ ...newIngredient, amount: text })
              }
              placeholder="e.g., 2"
              keyboardType="numeric"
              containerStyle={styles.ingredientInputField}
            />
            <Input
              label="Unit"
              value={newIngredient.unit}
              onChangeText={(text) =>
                setNewIngredient({ ...newIngredient, unit: text })
              }
              placeholder="e.g., pieces, grams"
              containerStyle={styles.ingredientInputField}
            />
            <Button
              title="Add Ingredient"
              onPress={handleAddIngredient}
              style={styles.addButton}
            />
          </View>

          {ingredients.map((ingredient) => (
            <View key={ingredient.id} style={styles.ingredientItem}>
              <Text style={styles.ingredientName}>
                {ingredient.amount} {ingredient.unit} {ingredient.name}
              </Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveIngredient(ingredient.id)}
              >
                <Text style={styles.removeButtonText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <Input
          label="Instructions (one step per line)"
          value={formData.instructions}
          onChangeText={(text) =>
            setFormData({ ...formData, instructions: text })
          }
          placeholder="Step 1: Preheat oven to 350°F\nStep 2: Mix ingredients..."
          multiline
        />
      </ScrollView>

      <View style={styles.modalButtons}>
        <Button
          title="Cancel"
          onPress={onClose}
          variant="outline"
          style={styles.modalButton}
        />
        <Button
          title="Save Recipe"
          onPress={handleSave}
          style={styles.modalButton}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    maxHeight: 400,
  },
  selectContainer: {
    marginBottom: dimensions.margin.md,
  },
  label: {
    fontSize: dimensions.fontSize.md,
    fontWeight: "600",
    color: colors.text,
    marginBottom: dimensions.margin.sm,
  },
  optionsRow: {
    flexDirection: "row",
    gap: dimensions.margin.sm,
  },
  optionButton: {
    paddingHorizontal: dimensions.padding.md,
    paddingVertical: dimensions.padding.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: dimensions.borderRadius.md,
    backgroundColor: colors.background,
  },
  optionButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    fontSize: dimensions.fontSize.sm,
    color: colors.text,
  },
  optionTextSelected: {
    color: colors.background,
  },
  section: {
    marginBottom: dimensions.margin.md,
  },
  sectionTitle: {
    fontSize: dimensions.fontSize.lg,
    fontWeight: "600",
    color: colors.text,
    marginBottom: dimensions.margin.sm,
  },
  ingredientInput: {
    marginBottom: dimensions.margin.md,
  },
  ingredientInputField: {
    marginBottom: dimensions.margin.sm,
  },
  addButton: {
    marginTop: dimensions.margin.sm,
  },
  ingredientItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: dimensions.padding.md,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: dimensions.borderRadius.md,
    marginBottom: dimensions.margin.sm,
  },
  ingredientName: {
    fontSize: dimensions.fontSize.md,
    color: colors.text,
  },
  removeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.error,
    justifyContent: "center",
    alignItems: "center",
  },
  removeButtonText: {
    color: colors.background,
    fontSize: dimensions.fontSize.md,
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
