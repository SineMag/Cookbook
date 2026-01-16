import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, dimensions } from "../../constants";
import { TraditionalFood } from "../../types";

interface TraditionalFoodsProps {
  visible: boolean;
  onClose: () => void;
  userLocation?: {
    latitude: number;
    longitude: number;
    city: string;
    country: string;
  };
}

export const TraditionalFoods: React.FC<TraditionalFoodsProps> = ({
  visible,
  onClose,
  userLocation,
}) => {
  const [traditionalFoods, setTraditionalFoods] = useState<TraditionalFood[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  // Mock traditional foods data based on location
  const mockTraditionalFoods: { [key: string]: TraditionalFood[] } = {
    "New York": [
      {
        id: "1",
        name: "New York Style Pizza",
        location: "New York, USA",
        description: "Thin crust pizza sold in large, wide slices",
        ingredients: ["Pizza dough", "Tomato sauce", "Mozzarella", "Pepperoni"],
        culturalBackground:
          "Originated in New York City in the early 1900s, inspired by Neapolitan pizza.",
      },
      {
        id: "2",
        name: "Bagels with Lox",
        location: "New York, USA",
        description: "Boiled bagel topped with cream cheese and smoked salmon",
        ingredients: [
          "Bagel",
          "Cream cheese",
          "Smoked salmon",
          "Capers",
          "Red onion",
        ],
        culturalBackground:
          "Jewish-American tradition that became a NYC breakfast staple.",
      },
    ],
    Bangkok: [
      {
        id: "3",
        name: "Pad Thai",
        location: "Bangkok, Thailand",
        description: "Stir-fried rice noodles with shrimp, tofu, and peanuts",
        ingredients: [
          "Rice noodles",
          "Shrimp",
          "Tofu",
          "Bean sprouts",
          "Peanuts",
          "Lime",
        ],
        culturalBackground:
          "Thailands national dish, popularized during WWII to promote nationalism.",
      },
      {
        id: "4",
        name: "Tom Yum Goong",
        location: "Bangkok, Thailand",
        description: "Hot and sour soup with shrimp",
        ingredients: [
          "Shrimp",
          "Lemongrass",
          "Galangal",
          "Lime leaves",
          "Chili",
          "Mushrooms",
        ],
        culturalBackground:
          "Traditional Thai soup known for its bold flavors and aromatic herbs.",
      },
    ],
  };

  useEffect(() => {
    if (visible) {
      loadTraditionalFoods();
    }
  }, [visible, userLocation]);

  const loadTraditionalFoods = async () => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const city = userLocation?.city || "New York";
      const foods =
        mockTraditionalFoods[city] || mockTraditionalFoods["New York"];
      setTraditionalFoods(foods);
      setLoading(false);
    }, 1000);
  };

  const handleRequestLocation = () => {
    Alert.alert(
      "Location Permission",
      "Allow Coocheen to access your location to show traditional foods from your area?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Allow",
          onPress: () => console.log("Location permission granted"),
        },
      ]
    );
  };

  if (!visible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Traditional Foods</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.locationInfo}>
        <Ionicons name="location" size={20} color={colors.primary} />
        <Text style={styles.locationText}>
          {userLocation
            ? `${userLocation.city}, ${userLocation.country}`
            : "Unknown Location"}
        </Text>
        {!userLocation && (
          <TouchableOpacity
            onPress={handleRequestLocation}
            style={styles.locationButton}
          >
            <Text style={styles.locationButtonText}>Enable Location</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.scrollView}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading traditional foods...</Text>
          </View>
        ) : (
          traditionalFoods.map((food) => (
            <View key={food.id} style={styles.foodCard}>
              <View style={styles.foodHeader}>
                <Text style={styles.foodName}>{food.name}</Text>
                <Text style={styles.foodLocation}>{food.location}</Text>
              </View>

              <Text style={styles.foodDescription}>{food.description}</Text>

              <View style={styles.ingredientsSection}>
                <Text style={styles.sectionTitle}>Key Ingredients:</Text>
                <View style={styles.ingredientsList}>
                  {food.ingredients.map((ingredient, index) => (
                    <Text key={index} style={styles.ingredientItem}>
                      • {ingredient}
                    </Text>
                  ))}
                </View>
              </View>

              <View style={styles.culturalSection}>
                <Text style={styles.sectionTitle}>Cultural Background:</Text>
                <Text style={styles.culturalText}>
                  {food.culturalBackground}
                </Text>
              </View>

              <TouchableOpacity style={styles.tryRecipeButton}>
                <Ionicons
                  name="restaurant"
                  size={16}
                  color={colors.background}
                />
                <Text style={styles.tryRecipeText}>Try This Recipe</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

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
  closeButton: {
    padding: dimensions.padding.sm,
  },
  locationInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: dimensions.padding.lg,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  locationText: {
    fontSize: dimensions.fontSize.md,
    color: colors.text,
    marginLeft: dimensions.margin.sm,
    flex: 1,
  },
  locationButton: {
    paddingHorizontal: dimensions.padding.md,
    paddingVertical: dimensions.padding.sm,
    backgroundColor: colors.primary,
    borderRadius: dimensions.borderRadius.md,
  },
  locationButtonText: {
    fontSize: dimensions.fontSize.sm,
    color: colors.background,
    fontWeight: "500",
  },
  scrollView: {
    flex: 1,
    padding: dimensions.padding.lg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: dimensions.fontSize.md,
    color: colors.textSecondary,
  },
  foodCard: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: dimensions.borderRadius.lg,
    padding: dimensions.padding.lg,
    marginBottom: dimensions.margin.lg,
  },
  foodHeader: {
    marginBottom: dimensions.margin.md,
  },
  foodName: {
    fontSize: dimensions.fontSize.xl,
    fontWeight: "600",
    color: colors.text,
    marginBottom: dimensions.margin.xs,
  },
  foodLocation: {
    fontSize: dimensions.fontSize.sm,
    color: colors.textSecondary,
  },
  foodDescription: {
    fontSize: dimensions.fontSize.md,
    color: colors.text,
    marginBottom: dimensions.margin.md,
    lineHeight: 20,
  },
  ingredientsSection: {
    marginBottom: dimensions.margin.md,
  },
  sectionTitle: {
    fontSize: dimensions.fontSize.lg,
    fontWeight: "600",
    color: colors.text,
    marginBottom: dimensions.margin.sm,
  },
  ingredientsList: {
    gap: dimensions.margin.xs,
  },
  ingredientItem: {
    fontSize: dimensions.fontSize.md,
    color: colors.text,
  },
  culturalSection: {
    marginBottom: dimensions.margin.md,
  },
  culturalText: {
    fontSize: dimensions.fontSize.md,
    color: colors.text,
    lineHeight: 18,
  },
  tryRecipeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    paddingVertical: dimensions.padding.md,
    borderRadius: dimensions.borderRadius.md,
  },
  tryRecipeText: {
    fontSize: dimensions.fontSize.md,
    color: colors.background,
    fontWeight: "500",
    marginLeft: dimensions.margin.sm,
  },
});
