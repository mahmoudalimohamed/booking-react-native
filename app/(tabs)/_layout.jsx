import { FontAwesome } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import useColorScheme from "../../hooks/useColorScheme";
export default function TabsLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
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
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="home" size={24} color={color} />
            ),
            href: "/home",
          }}
        />
        <Tabs.Screen
          name="stations"
          options={{
            title: "stations",
            tabBarIcon: ({ color }) => (
              <Ionicons name="bus" size={24} color={color} />
            ),
            href: "/stations",
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
    </>
  );
}
