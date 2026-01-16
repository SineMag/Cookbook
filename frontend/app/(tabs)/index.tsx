import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, dimensions } from "../../constants";
import { ChatBot, RecipeCard } from "../../index";

export default function HomeScreen() {
  const [showChatBot, setShowChatBot] = useState(false);

  console.log("HomeScreen is rendering!");

  const featuredRecipes = [
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
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Coocheen</Text>
          <Text style={styles.subtitle}>Discover & Create Amazing Recipes</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Recipes</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {featuredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onPress={() => console.log("Recipe pressed:", recipe.id)}
            />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="location" size={32} color={colors.primary} />
              <Text style={styles.actionText}>Local Foods</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="add-circle" size={32} color={colors.primary} />
              <Text style={styles.actionText}>Add Recipe</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="camera" size={32} color={colors.primary} />
              <Text style={styles.actionText}>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => setShowChatBot(true)}
            >
              <Ionicons name="chatbubble" size={32} color={colors.primary} />
              <Text style={styles.actionText}>Chat Bot</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <ChatBot
        visible={showChatBot}
        onClose={() => setShowChatBot(!showChatBot)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: dimensions.padding.lg,
    alignItems: "center",
  },
  title: {
    fontSize: dimensions.fontSize.xxxl,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: dimensions.margin.xs,
  },
  subtitle: {
    fontSize: dimensions.fontSize.md,
    color: colors.textSecondary,
    textAlign: "center",
  },
  section: {
    marginBottom: dimensions.margin.xl,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: dimensions.padding.lg,
    marginBottom: dimensions.margin.md,
  },
  sectionTitle: {
    fontSize: dimensions.fontSize.xl,
    fontWeight: "600",
    color: colors.text,
  },
  seeAll: {
    fontSize: dimensions.fontSize.md,
    color: colors.primary,
    fontWeight: "500",
  },
  actionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: dimensions.padding.lg,
  },
  actionCard: {
    width: "45%",
    backgroundColor: colors.background,
    borderRadius: dimensions.borderRadius.lg,
    padding: dimensions.padding.lg,
    alignItems: "center",
    marginBottom: dimensions.margin.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionText: {
    fontSize: dimensions.fontSize.sm,
    color: colors.text,
    marginTop: dimensions.margin.sm,
    fontWeight: "500",
  },
});
