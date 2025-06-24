import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const SelectionCard = ({ title, subtitle, onPress, icon }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.selectionCard]}
    activeOpacity={0.9}
  >
    <View style={styles.selectionCardContent}>
      <View style={styles.selectionIcon}>
        <Ionicons name={icon} size={25} color={"#374151"} />
      </View>
      <View style={styles.selectionText}>
        <Text style={styles.selectionSubtitle}>{subtitle}</Text>
        <Text style={styles.selectionTitle} numberOfLines={1}>
          {title}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={25} color={"#3b82f6"} />
    </View>
  </TouchableOpacity>
);

export default SelectionCard;

const cardShadowStyle = {
  shadowColor: "blue",
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.12,
  shadowRadius: 24,
  elevation: 8,
};
const styles = StyleSheet.create({
  selectionCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginBottom: 10,
    borderWidth: 1,
    ...cardShadowStyle,
  },
  selectionCardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectionIcon: {
    width: 56,
    height: 56,
    backgroundColor: "white",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  selectionText: {
    flex: 1,
  },

  selectionTitle: {
    color: "#1e293b",
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 24,
  },
  selectionSubtitle: {
    color: "#64748b",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
