import {
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function TabBarIcon({ name, focused }: { name: string; focused: boolean }) {
  const iconSize = 20;
  const iconColor = focused ? '#7C3AED' : '#9CA3AF'; // purple-600 : gray-400

  const icons: Record<string, JSX.Element> = {
    home: <Feather name="home" size={iconSize} color={iconColor} />,
    courses: <MaterialIcons name="menu-book" size={iconSize} color={iconColor} />,
    watch: <Ionicons name="tv-outline" size={iconSize} color={iconColor} />,
    schedule: <Feather name="calendar" size={iconSize} color={iconColor} />,
    profile: <FontAwesome5 name="user-circle" size={iconSize} color={iconColor} />,
  };

  const label = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <View className="items-center justify-center w-16">
      {icons[name]}
      <Text
        style={{ textAlign: 'center' }}
        className={`text-xs mt-1 ${focused ? 'text-purple-600 font-medium' : 'text-gray-500'}`}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: 'white',
            borderTopWidth: 0,
            height: 80,
            paddingBottom: 20,
            paddingTop: 10,
          },
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{ tabBarIcon: ({ focused }) => <TabBarIcon name="home" focused={focused} /> }}
        />
        <Tabs.Screen
          name="courses"
          options={{ tabBarIcon: ({ focused }) => <TabBarIcon name="courses" focused={focused} /> }}
        />
        <Tabs.Screen
          name="watch"
          options={{ tabBarIcon: ({ focused }) => <TabBarIcon name="watch" focused={focused} /> }}
        />
        <Tabs.Screen
          name="schedule"
          options={{ tabBarIcon: ({ focused }) => <TabBarIcon name="schedule" focused={focused} /> }}
        />
        <Tabs.Screen
          name="profile"
          options={{ tabBarIcon: ({ focused }) => <TabBarIcon name="profile" focused={focused} /> }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}
