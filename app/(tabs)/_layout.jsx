import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useEffect } from "react";
import useColorScheme from "../../hooks/useColorScheme";
import ProtectedRoute from "../../hooks/useProtectedRoute";
export default function TabsLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Force a re-render after initial mount
    const timeout = setTimeout(() => {
      // This will trigger a re-render
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <ProtectedRoute>
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
          name="watch"
          options={{
            title: "Watch",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="play-circle" size={24} color={color} />
            ),
            href: "/watch",
          }}
        />
        <Tabs.Screen
          name="schedule"
          options={{
            title: "Schedule",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="calendar" size={24} color={color} />
            ),
            href: "/schedule",
          }}
        />
        <Tabs.Screen
          name="courses"
          options={{
            title: "Courses",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="book" size={24} color={color} />
            ),
            href: "/courses",
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
    </ProtectedRoute>
  );
}
