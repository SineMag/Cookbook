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
import { Button, Input, Modal, SteamAnimation } from "../..";
import { colors, dimensions } from "../../constants";
import { Timer } from "../../types";

export default function TimerScreen() {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSteamAnimation, setShowSteamAnimation] = useState(false);
  const [newTimer, setNewTimer] = useState({
    name: "",
    duration: "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) =>
        prevTimers.map((timer) => {
          if (timer.isActive && timer.remainingTime > 0) {
            const updatedTimer = {
              ...timer,
              remainingTime: timer.remainingTime - 1,
            };

            if (updatedTimer.remainingTime === 0) {
              setShowSteamAnimation(true);
              return { ...updatedTimer, isActive: false };
            }

            return updatedTimer;
          }
          return timer;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSteamAnimationComplete = () => {
    setShowSteamAnimation(false);
    Alert.alert(
      "Mmmh... that smells great! 🍽️",
      "Let's eat! Your dish is ready to enjoy!",
      [{ text: "Yum!", style: "default" }]
    );
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleAddTimer = () => {
    if (newTimer.name && newTimer.duration) {
      const duration = parseInt(newTimer.duration) * 60; // Convert minutes to seconds
      const timer: Timer = {
        id: Date.now().toString(),
        recipeId: "manual",
        name: newTimer.name,
        duration,
        remainingTime: duration,
        isActive: false,
      };

      setTimers([...timers, timer]);
      setNewTimer({ name: "", duration: "" });
      setShowAddModal(false);
    } else {
      Alert.alert("Error", "Please fill all fields");
    }
  };

  const toggleTimer = (timerId: string) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === timerId ? { ...timer, isActive: !timer.isActive } : timer
      )
    );
  };

  const resetTimer = (timerId: string) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === timerId
          ? { ...timer, remainingTime: timer.duration, isActive: false }
          : timer
      )
    );
  };

  const deleteTimer = (timerId: string) => {
    Alert.alert("Delete Timer", "Are you sure you want to delete this timer?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () =>
          setTimers(timers.filter((timer) => timer.id !== timerId)),
        style: "destructive",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cooking Timers</Text>
        <Button
          title="Add Timer"
          onPress={() => setShowAddModal(true)}
          size="small"
        />
      </View>

      <ScrollView style={styles.scrollView}>
        {timers.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons
              name="timer-outline"
              size={64}
              color={colors.textSecondary}
            />
            <Text style={styles.emptyText}>No timers yet</Text>
            <Text style={styles.emptySubtext}>
              Add a timer to track your cooking
            </Text>
          </View>
        ) : (
          timers.map((timer) => (
            <View key={timer.id} style={styles.timerCard}>
              <View style={styles.timerHeader}>
                <Text style={styles.timerName}>{timer.name}</Text>
                <Text style={styles.timerDuration}>
                  Total: {Math.floor(timer.duration / 60)}min
                </Text>
              </View>

              <View style={styles.timerDisplay}>
                <Text
                  style={[
                    styles.timerTime,
                    timer.isActive && styles.timerTimeActive,
                  ]}
                >
                  {formatTime(timer.remainingTime)}
                </Text>
              </View>

              <View style={styles.timerControls}>
                <TouchableOpacity
                  style={[
                    styles.controlButton,
                    timer.isActive ? styles.pauseButton : styles.startButton,
                  ]}
                  onPress={() => toggleTimer(timer.id)}
                >
                  <Ionicons
                    name={timer.isActive ? "pause" : "play"}
                    size={24}
                    color={colors.background}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.controlButton, styles.resetButton]}
                  onPress={() => resetTimer(timer.id)}
                >
                  <Ionicons name="refresh" size={24} color={colors.text} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.controlButton, styles.deleteButton]}
                  onPress={() => deleteTimer(timer.id)}
                >
                  <Ionicons name="trash" size={24} color={colors.error} />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <Modal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Cooking Timer"
      >
        <Input
          label="Timer Name"
          value={newTimer.name}
          onChangeText={(text) => setNewTimer({ ...newTimer, name: text })}
          placeholder="e.g., Pasta boiling"
        />

        <Input
          label="Duration (minutes)"
          value={newTimer.duration}
          onChangeText={(text) => setNewTimer({ ...newTimer, duration: text })}
          placeholder="e.g., 10"
          keyboardType="numeric"
        />

        <View style={styles.modalButtons}>
          <Button
            title="Cancel"
            onPress={() => setShowAddModal(false)}
            variant="outline"
            style={styles.modalButton}
          />
          <Button
            title="Add Timer"
            onPress={handleAddTimer}
            style={styles.modalButton}
          />
        </View>
      </Modal>

      <SteamAnimation
        visible={showSteamAnimation}
        onComplete={handleSteamAnimationComplete}
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
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: dimensions.padding.xxl,
  },
  emptyText: {
    fontSize: dimensions.fontSize.xl,
    fontWeight: "600",
    color: colors.text,
    marginTop: dimensions.margin.md,
  },
  emptySubtext: {
    fontSize: dimensions.fontSize.md,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: dimensions.margin.sm,
  },
  timerCard: {
    backgroundColor: colors.background,
    borderRadius: dimensions.borderRadius.lg,
    padding: dimensions.padding.lg,
    marginBottom: dimensions.margin.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  timerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: dimensions.margin.md,
  },
  timerName: {
    fontSize: dimensions.fontSize.lg,
    fontWeight: "600",
    color: colors.text,
  },
  timerDuration: {
    fontSize: dimensions.fontSize.sm,
    color: colors.textSecondary,
  },
  timerDisplay: {
    alignItems: "center",
    marginVertical: dimensions.margin.lg,
  },
  timerTime: {
    fontSize: dimensions.fontSize.xxxl,
    fontWeight: "bold",
    color: colors.text,
  },
  timerTimeActive: {
    color: colors.primary,
  },
  timerControls: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  startButton: {
    backgroundColor: colors.success,
  },
  pauseButton: {
    backgroundColor: colors.warning,
  },
  resetButton: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  deleteButton: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.error,
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
