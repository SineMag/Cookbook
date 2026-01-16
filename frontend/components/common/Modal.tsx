import React from "react";
import {
  ModalProps,
  Modal as RNModal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, dimensions } from "../../constants";

interface ModalComponentProps extends ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalComponentProps> = ({
  visible,
  onClose,
  title,
  children,
  ...modalProps
}) => {
  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      {...modalProps}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {title && (
            <View style={styles.header}>
              <Text style={styles.title}>{title}</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.content}>{children}</View>
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: colors.background,
    borderRadius: dimensions.borderRadius.lg,
    marginHorizontal: dimensions.margin.lg,
    maxHeight: "80%",
    width: "90%",
    maxWidth: 400,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: dimensions.padding.lg,
    paddingVertical: dimensions.padding.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: dimensions.fontSize.lg,
    fontWeight: "600",
    color: colors.text,
  },
  closeButton: {
    padding: dimensions.padding.sm,
  },
  closeButtonText: {
    fontSize: dimensions.fontSize.xxl,
    color: colors.textSecondary,
    fontWeight: "300",
  },
  content: {
    paddingHorizontal: dimensions.padding.lg,
    paddingVertical: dimensions.padding.md,
  },
});
