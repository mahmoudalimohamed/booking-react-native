import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import styles from "./styleTripSearch";

const LoadingState = ({ message, icon = "train" }) => (
  <View style={styles.loadingContainer}>
    <Ionicons name={icon} size={40} color={"#6b7280"} />
    <Text style={styles.loadingText}>{message}</Text>
  </View>
);

export default LoadingState;
