import { Ionicons } from "@expo/vector-icons";
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
import { User } from "../../types";

export default function ProfileScreen() {
  const [user, setUser] = useState<User>({
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    isPremium: false,
    savedRecipes: [],
    createdRecipes: [],
    location: {
      latitude: 40.7128,
      longitude: -74.006,
      city: "New York",
      country: "USA",
    },
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user.name,
    email: user.email,
  });

  const handleUpdateProfile = () => {
    setUser({
      ...user,
      name: editForm.name,
      email: editForm.email,
    });
    setShowEditModal(false);
    Alert.alert("Success", "Profile updated successfully!");
  };

  const handleUpgradeToPremium = () => {
    setUser({ ...user, isPremium: true });
    setShowPremiumModal(false);
    Alert.alert(
      "Welcome to Premium!",
      "You now have access to all premium features including family sharing and exclusive recipes!"
    );
  };

  const menuItems = [
    {
      icon: "person-outline",
      title: "Edit Profile",
      onPress: () => setShowEditModal(true),
    },
    {
      icon: "star-outline",
      title: "My Recipes",
      onPress: () => Alert.alert("My Recipes", "You have created 0 recipes"),
    },
    {
      icon: "bookmark-outline",
      title: "Saved Recipes",
      onPress: () => Alert.alert("Saved Recipes", "You have saved 0 recipes"),
    },
    {
      icon: "people-outline",
      title: "Family Members",
      onPress: () => {
        if (user.isPremium) {
          Alert.alert("Family Members", "Manage your family sharing settings");
        } else {
          setShowPremiumModal(true);
        }
      },
    },
    {
      icon: "location-outline",
      title: "Location Settings",
      onPress: () =>
        Alert.alert(
          "Location",
          `${user.location?.city}, ${user.location?.country}`
        ),
    },
    {
      icon: "settings-outline",
      title: "Settings",
      onPress: () => Alert.alert("Settings", "App settings and preferences"),
    },
    {
      icon: "help-circle-outline",
      title: "Help & Support",
      onPress: () => Alert.alert("Help", "Contact support for assistance"),
    },
    {
      icon: "log-out-outline",
      title: "Sign Out",
      onPress: () =>
        Alert.alert("Sign Out", "Are you sure you want to sign out?"),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={48} color={colors.text} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            {user.isPremium && (
              <View style={styles.premiumBadge}>
                <Ionicons name="star" size={16} color={colors.background} />
                <Text style={styles.premiumText}>PREMIUM</Text>
              </View>
            )}
          </View>
        </View>
        {!user.isPremium && (
          <Button
            title="Upgrade to Premium"
            onPress={() => setShowPremiumModal(true)}
            variant="outline"
            size="small"
          />
        )}
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.createdRecipes.length}</Text>
            <Text style={styles.statLabel}>Created</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.savedRecipes.length}</Text>
            <Text style={styles.statLabel}>Saved</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Family</Text>
          </View>
        </View>

        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <Ionicons
                name={item.icon as any}
                size={24}
                color={colors.text}
                style={styles.menuIcon}
              />
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Profile"
      >
        <Input
          label="Name"
          value={editForm.name}
          onChangeText={(text) => setEditForm({ ...editForm, name: text })}
          placeholder="Your name"
        />

        <Input
          label="Email"
          value={editForm.email}
          onChangeText={(text) => setEditForm({ ...editForm, email: text })}
          placeholder="Your email"
          keyboardType="email-address"
        />

        <View style={styles.modalButtons}>
          <Button
            title="Cancel"
            onPress={() => setShowEditModal(false)}
            variant="outline"
            style={styles.modalButton}
          />
          <Button
            title="Save"
            onPress={handleUpdateProfile}
            style={styles.modalButton}
          />
        </View>
      </Modal>

      <Modal
        visible={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        title="Upgrade to Premium"
      >
        <View style={styles.premiumFeatures}>
          <Text style={styles.premiumTitle}>Premium Features:</Text>
          <View style={styles.featureList}>
            <Text style={styles.featureItem}>
              • Share recipes with family members
            </Text>
            <Text style={styles.featureItem}>
              • Access exclusive premium recipes
            </Text>
            <Text style={styles.featureItem}>
              • Advanced recipe recommendations
            </Text>
            <Text style={styles.featureItem}>• Ad-free experience</Text>
            <Text style={styles.featureItem}>• Priority customer support</Text>
          </View>
        </View>

        <View style={styles.modalButtons}>
          <Button
            title="Maybe Later"
            onPress={() => setShowPremiumModal(false)}
            variant="outline"
            style={styles.modalButton}
          />
          <Button
            title="Upgrade Now"
            onPress={handleUpgradeToPremium}
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
    padding: dimensions.padding.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: dimensions.margin.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
    marginRight: dimensions.margin.md,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: dimensions.fontSize.xl,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: dimensions.margin.xs,
  },
  userEmail: {
    fontSize: dimensions.fontSize.md,
    color: colors.textSecondary,
    marginBottom: dimensions.margin.sm,
  },
  premiumBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: dimensions.padding.sm,
    paddingVertical: dimensions.padding.xs,
    borderRadius: dimensions.borderRadius.sm,
    alignSelf: "flex-start",
  },
  premiumText: {
    color: colors.background,
    fontSize: dimensions.fontSize.sm,
    fontWeight: "600",
    marginLeft: dimensions.margin.xs,
  },
  scrollView: {
    flex: 1,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: dimensions.padding.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: dimensions.fontSize.xxxl,
    fontWeight: "bold",
    color: colors.text,
  },
  statLabel: {
    fontSize: dimensions.fontSize.sm,
    color: colors.textSecondary,
    marginTop: dimensions.margin.xs,
  },
  menuSection: {
    padding: dimensions.padding.lg,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: dimensions.padding.md,
    borderRadius: dimensions.borderRadius.md,
    marginBottom: dimensions.margin.sm,
  },
  menuIcon: {
    marginRight: dimensions.margin.md,
  },
  menuTitle: {
    flex: 1,
    fontSize: dimensions.fontSize.lg,
    color: colors.text,
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
  premiumFeatures: {
    marginBottom: dimensions.margin.lg,
  },
  premiumTitle: {
    fontSize: dimensions.fontSize.lg,
    fontWeight: "600",
    color: colors.text,
    marginBottom: dimensions.margin.md,
  },
  featureList: {
    gap: dimensions.margin.sm,
  },
  featureItem: {
    fontSize: dimensions.fontSize.md,
    color: colors.text,
    lineHeight: 20,
  },
});
