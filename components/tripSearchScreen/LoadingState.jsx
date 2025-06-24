import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

const LoadingState = ({ message, icon = "train" }) => (
  <View style={styles.loadingContainer}>
    <Ionicons name={icon} size={40} color={"#6b7280"} />
    <Text style={styles.loadingText}>{message}</Text>
  </View>
);

export default LoadingState;

const styles = StyleSheet.create({
  loadingContainer: {
    marginTop: 40,
    flex: 1,
    backgroundColor: "white",

    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#64748b",
    marginTop: 12,
    fontWeight: "500",
  },
});
