import { Stack } from "expo-router";
import useColorScheme from "../../hooks/useColorScheme";

export default function AuthLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: colorScheme === "dark" ? "#666" : "#999",
        animation: "none",
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="login" options={{ headerTitle: "Login" }} />
      <Stack.Screen name="register" options={{ headerTitle: "Register" }} />
      <Stack.Screen
        name="forgotPassword"
        options={{ headerTitle: "Forgot Password" }}
      />
    </Stack>
  );
}
