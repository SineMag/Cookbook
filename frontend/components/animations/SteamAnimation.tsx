import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import { colors, dimensions } from "../../constants";

interface SteamAnimationProps {
  visible: boolean;
  onComplete: () => void;
}

const { width: screenWidth } = Dimensions.get("window");

export const SteamAnimation: React.FC<SteamAnimationProps> = ({
  visible,
  onComplete,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const steamAnim1 = useRef(new Animated.Value(0)).current;
  const steamAnim2 = useRef(new Animated.Value(0)).current;
  const steamAnim3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Fade in and scale up the main container
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();

      // Animate steam particles
      const animateSteam = (anim: Animated.Value, delay: number) => {
        Animated.loop(
          Animated.sequence([
            Animated.delay(delay),
            Animated.timing(anim, {
              toValue: 1,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }),
          ])
        ).start();
      };

      animateSteam(steamAnim1, 0);
      animateSteam(steamAnim2, 500);
      animateSteam(steamAnim3, 1000);

      // Auto-complete after 3 seconds
      const timer = setTimeout(() => {
        hideAnimation();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hideAnimation = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.5,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onComplete();
    });
  };

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <Animated.View
        style={[
          styles.container,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.steamContainer}>
          {/* Steam particles */}
          <Animated.View
            style={[
              styles.steamParticle,
              {
                left: "30%",
                opacity: steamAnim1,
                transform: [
                  {
                    translateY: steamAnim1.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -100],
                    }),
                  },
                  {
                    scale: steamAnim1.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.5, 1.5],
                    }),
                  },
                ],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.steamParticle,
              {
                left: "50%",
                opacity: steamAnim2,
                transform: [
                  {
                    translateY: steamAnim2.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -120],
                    }),
                  },
                  {
                    scale: steamAnim2.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.5, 1.8],
                    }),
                  },
                ],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.steamParticle,
              {
                left: "70%",
                opacity: steamAnim3,
                transform: [
                  {
                    translateY: steamAnim3.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -90],
                    }),
                  },
                  {
                    scale: steamAnim3.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.5, 1.6],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.emoji}>🍽️</Text>
          <Text style={styles.title}>Mmmh...</Text>
          <Text style={styles.subtitle}>That smells great!</Text>
          <Text style={styles.message}>Let's eat! 🎉</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.overlay,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  container: {
    backgroundColor: colors.background,
    borderRadius: dimensions.borderRadius.xl,
    padding: dimensions.padding.xl,
    alignItems: "center",
    minWidth: screenWidth * 0.8,
    maxWidth: 350,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
  },
  steamContainer: {
    position: "absolute",
    top: -50,
    left: 0,
    right: 0,
    height: 100,
  },
  steamParticle: {
    position: "absolute",
    width: 40,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 20,
  },
  content: {
    alignItems: "center",
    paddingTop: dimensions.padding.lg,
  },
  emoji: {
    fontSize: 60,
    marginBottom: dimensions.margin.md,
  },
  title: {
    fontSize: dimensions.fontSize.xxxl,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: dimensions.margin.sm,
  },
  subtitle: {
    fontSize: dimensions.fontSize.lg,
    color: colors.text,
    marginBottom: dimensions.margin.md,
    textAlign: "center",
  },
  message: {
    fontSize: dimensions.fontSize.xl,
    color: colors.primary,
    fontWeight: "600",
    textAlign: "center",
  },
});
