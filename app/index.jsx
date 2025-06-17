import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
const index = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Button title="🔐 Login" onPress={() => router.push("/(auth)/login")} />
      <Button title="👤 Continue as Visitor" onPress={() => router.push("/")} />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  title: { fontSize: 24, marginBottom: 20 },
});
