import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styleTripSearch";

const SelectionCard = ({ title, subtitle, onPress, icon }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.selectionCard, styles.cardShadowStyle]}
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
