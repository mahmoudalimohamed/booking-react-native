import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import useColorScheme from "../../hooks/useColorScheme";
export default function TabsLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: colorScheme === "dark" ? "#666" : "#999",
        animation: "none",
        gestureEnabled: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
          href: "/",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "search",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="search" size={24} color={color} />
          ),
          href: "/search",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
          href: "/profile",
        }}
      />
    </Tabs>
  );
}
