import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, dimensions } from "../../constants";
import { ChatMessage } from "../../types";

interface ChatBotProps {
  visible: boolean;
  onClose: () => void;
}

export const ChatBot: React.FC<ChatBotProps> = ({ visible, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: "Hi! I'm your cooking assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const slideAnim = new Animated.Value(300);

  React.useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(slideAnim, {
        toValue: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        text: inputText,
        isUser: true,
        timestamp: new Date(),
      };

      setMessages([...messages, userMessage]);
      setInputText("");
      setIsTyping(true);

      // Simulate bot response
      setTimeout(() => {
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: getBotResponse(inputText),
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    if (input.includes("recipe") || input.includes("cook")) {
      return "I can help you find recipes! What ingredients do you have available?";
    } else if (input.includes("ingredient") || input.includes("have")) {
      return "Great! Let me suggest some recipes based on your ingredients. You might like pasta with vegetables or a stir-fry!";
    } else if (input.includes("time") || input.includes("timer")) {
      return "I can help you set cooking timers. How long do you need to cook your dish?";
    } else if (input.includes("help")) {
      return "I can help you with:\n• Finding recipes based on ingredients\n• Setting cooking timers\n• Cooking tips and techniques\n• Meal planning ideas\n\nWhat would you like help with?";
    } else {
      return "That's interesting! I'm here to help with cooking and recipes. Try asking me about recipes, ingredients, or cooking tips!";
    }
  };

  if (!visible) {
    return (
      <TouchableOpacity style={styles.chatButton} onPress={() => onClose()}>
        <Ionicons name="chatbubble" size={24} color={colors.background} />
      </TouchableOpacity>
    );
  }

  return (
    <Animated.View
      style={[
        styles.chatContainer,
        {
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.chatHeader}>
        <Text style={styles.chatTitle}>Cooking Assistant</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="chevron-down" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.messagesContainer}>
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageBubble,
              message.isUser ? styles.userMessage : styles.botMessage,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                message.isUser ? styles.userMessageText : styles.botMessageText,
              ]}
            >
              {message.text}
            </Text>
          </View>
        ))}
        {isTyping && (
          <View style={[styles.messageBubble, styles.botMessage]}>
            <Text style={styles.typingText}>Typing...</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ask me anything about cooking..."
          placeholderTextColor={colors.textSecondary}
          multiline
          maxLength={200}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            inputText.trim() ? styles.sendButtonActive : null,
          ]}
          onPress={handleSendMessage}
          disabled={!inputText.trim()}
        >
          <Ionicons
            name="send"
            size={20}
            color={inputText.trim() ? colors.background : colors.textSecondary}
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  chatButton: {
    position: "absolute",
    bottom: 100,
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
  chatContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "70%",
    backgroundColor: colors.background,
    borderTopLeftRadius: dimensions.borderRadius.lg,
    borderTopRightRadius: dimensions.borderRadius.lg,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: dimensions.padding.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  chatTitle: {
    fontSize: dimensions.fontSize.lg,
    fontWeight: "600",
    color: colors.text,
  },
  closeButton: {
    padding: dimensions.padding.sm,
  },
  messagesContainer: {
    flex: 1,
    padding: dimensions.padding.md,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: dimensions.padding.md,
    borderRadius: dimensions.borderRadius.md,
    marginBottom: dimensions.margin.sm,
  },
  userMessage: {
    backgroundColor: colors.primary,
    alignSelf: "flex-end",
  },
  botMessage: {
    backgroundColor: colors.border,
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: dimensions.fontSize.md,
    lineHeight: 18,
  },
  userMessageText: {
    color: colors.background,
  },
  botMessageText: {
    color: colors.text,
  },
  typingText: {
    fontSize: dimensions.fontSize.md,
    color: colors.textSecondary,
    fontStyle: "italic",
  },
  inputContainer: {
    flexDirection: "row",
    padding: dimensions.padding.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    alignItems: "flex-end",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: dimensions.borderRadius.md,
    paddingHorizontal: dimensions.padding.md,
    paddingVertical: dimensions.padding.sm,
    fontSize: dimensions.fontSize.md,
    color: colors.text,
    backgroundColor: colors.background,
    maxHeight: 80,
    marginRight: dimensions.margin.sm,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonActive: {
    backgroundColor: colors.primary,
  },
});
