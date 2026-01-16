import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RecipeCard, RecipeForm } from "../..";
import { colors, dimensions } from "../../constants";
import { Recipe } from "../../types";

export default function RecipesScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      id: "1",
      title: "Traditional Pasta Carbonara",
      description: "Classic Italian pasta with eggs, cheese, and pancetta",
      ingredients: [],
      instructions: [],
      cookingTime: 25,
      difficulty: "medium" as const,
      category: "Italian",
      images: [],
      videos: [],
      authorId: "1",
      authorName: "Chef Mario",
      isPremium: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      likes: 245,
      savedBy: [],
    },
    {
      id: "2",
      title: "Spicy Thai Curry",
      description: "Authentic Thai green curry with fresh vegetables",
      ingredients: [],
      instructions: [],
      cookingTime: 35,
      difficulty: "hard" as const,
      category: "Thai",
      images: [],
      videos: [],
      authorId: "2",
      authorName: "Chef Somchai",
      isPremium: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      likes: 189,
      savedBy: [],
    },
    {
      id: "3",
      title: "Classic French Croissants",
      description: "Buttery, flaky pastries perfect for breakfast",
      ingredients: [],
      instructions: [],
      cookingTime: 180,
      difficulty: "hard" as const,
      category: "French",
      images: [],
      videos: [],
      authorId: "3",
      authorName: "Chef Pierre",
      isPremium: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      likes: 412,
      savedBy: [],
    },
  ]);

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateRecipe = (recipeData: Partial<Recipe>) => {
    const newRecipe: Recipe = {
      id: Date.now().toString(),
      title: recipeData.title || "",
      description: recipeData.description || "",
      ingredients: recipeData.ingredients || [],
      instructions: recipeData.instructions || [],
      cookingTime: recipeData.cookingTime || 0,
      difficulty: recipeData.difficulty || "medium",
      category: recipeData.category || "",
      images: recipeData.images || [],
      videos: recipeData.videos || [],
      authorId: "1",
      authorName: "You",
      isPremium: recipeData.isPremium || false,
      createdAt: new Date(),
      updatedAt: new Date(),
      likes: 0,
      savedBy: [],
    };

    setRecipes([newRecipe, ...recipes]);
    Alert.alert("Success", "Recipe created successfully!");
  };

  const handleDeleteRecipe = (recipeId: string) => {
    Alert.alert(
      "Delete Recipe",
      "Are you sure you want to delete this recipe?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () =>
            setRecipes(recipes.filter((recipe) => recipe.id !== recipeId)),
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recipes</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search recipes..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={colors.textSecondary}
        />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.filters}>
          <Text style={styles.filterTitle}>Categories:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoryList}>
              {["All", "Italian", "Thai", "French", "Mexican", "Indian"].map(
                (category) => (
                  <Text key={category} style={styles.categoryItem}>
                    {category}
                  </Text>
                )
              )}
            </View>
          </ScrollView>
        </View>

        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onPress={() => {
              if (recipe.authorId === "1") {
                Alert.alert(
                  "Recipe Actions",
                  "What would you like to do with this recipe?",
                  [
                    {
                      text: "View",
                      onPress: () => console.log("View recipe:", recipe.id),
                    },
                    {
                      text: "Edit",
                      onPress: () => console.log("Edit recipe:", recipe.id),
                    },
                    {
                      text: "Delete",
                      onPress: () => handleDeleteRecipe(recipe.id),
                      style: "destructive",
                    },
                    { text: "Cancel", style: "cancel" },
                  ]
                );
              } else {
                console.log("View recipe:", recipe.id);
              }
            }}
          />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowCreateModal(true)}
      >
        <Ionicons name="add" size={24} color={colors.background} />
      </TouchableOpacity>

      <RecipeForm
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleCreateRecipe}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: dimensions.padding.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: dimensions.fontSize.xxxl,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: dimensions.margin.md,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: dimensions.borderRadius.md,
    paddingHorizontal: dimensions.padding.md,
    paddingVertical: dimensions.padding.md,
    fontSize: dimensions.fontSize.md,
    color: colors.text,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  filters: {
    padding: dimensions.padding.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterTitle: {
    fontSize: dimensions.fontSize.lg,
    fontWeight: "600",
    color: colors.text,
    marginBottom: dimensions.margin.sm,
  },
  categoryList: {
    flexDirection: "row",
    gap: dimensions.margin.sm,
  },
  categoryItem: {
    paddingHorizontal: dimensions.padding.md,
    paddingVertical: dimensions.padding.sm,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: dimensions.borderRadius.md,
    fontSize: dimensions.fontSize.sm,
    color: colors.text,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});
