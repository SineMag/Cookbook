import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, dimensions } from "../../constants";
import { Recipe } from "../../types";

interface RecipeCardProps {
  recipe: Recipe;
  onPress: () => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {recipe.images.length > 0 && (
        <Image source={{ uri: recipe.images[0] }} style={styles.image} />
      )}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {recipe.title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {recipe.description}
        </Text>
        <View style={styles.meta}>
          <Text style={styles.metaText}>⏱ {recipe.cookingTime}min</Text>
          <Text style={styles.metaText}>📊 {recipe.difficulty}</Text>
          <Text style={styles.metaText}>❤️ {recipe.likes}</Text>
        </View>
        {recipe.isPremium && (
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumText}>PREMIUM</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: dimensions.borderRadius.lg,
    marginHorizontal: dimensions.margin.md,
    marginVertical: dimensions.margin.sm,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 150,
    backgroundColor: colors.border,
  },
  content: {
    padding: dimensions.padding.md,
  },
  title: {
    fontSize: dimensions.fontSize.lg,
    fontWeight: "600",
    color: colors.text,
    marginBottom: dimensions.margin.xs,
  },
  description: {
    fontSize: dimensions.fontSize.md,
    color: colors.textSecondary,
    marginBottom: dimensions.margin.sm,
  },
  meta: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metaText: {
    fontSize: dimensions.fontSize.sm,
    color: colors.textSecondary,
  },
  premiumBadge: {
    position: "absolute",
    top: dimensions.padding.sm,
    right: dimensions.padding.sm,
    backgroundColor: colors.primary,
    paddingHorizontal: dimensions.padding.sm,
    paddingVertical: dimensions.padding.xs,
    borderRadius: dimensions.borderRadius.sm,
  },
  premiumText: {
    color: colors.background,
    fontSize: dimensions.fontSize.xs,
    fontWeight: "600",
  },
});
