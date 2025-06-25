import { Text, View } from "react-native";
import { ProtectedRoute } from "../../components/ProtectedRoute";
export default function Stations() {
  return (
    <ProtectedRoute>
      <View>
        <Text style={{ color: "white" }}>Stations</Text>
      </View>
    </ProtectedRoute>
  );
}
