import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { appConfig } from "../../data/config";

export default function ProfileScreen() {
  const { logout, user } = useAuth();

  const name = user?.name || "Visitor";
  const email = user?.email || "";
  const userId = user?.targets?.[0]?.userId || "";
  const { instructor } = appConfig;

  const menuItems = [
    {
      icon: <Feather name="user" size={20} color="#6B7280" />,
      title: "Edit Profile",
      subtitle: "Update your personal information",
    },
    {
      icon: <Feather name="bar-chart-2" size={20} color="#6B7280" />,
      title: "My Progress",
      subtitle: "Track your learning journey",
    },
    {
      icon: (
        <Ionicons name="cloud-download-outline" size={20} color="#6B7280" />
      ),
      title: "Downloads",
      subtitle: "Your offline content",
    },
    {
      icon: <Feather name="help-circle" size={20} color="#6B7280" />,
      title: "Help & Support",
      subtitle: "FAQs & contact",
    },
    {
      icon: <Feather name="settings" size={20} color="#6B7280" />,
      title: "Settings",
      subtitle: "Preferences & themes",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 py-6 bg-white">
          <Text className="text-2xl font-bold text-gray-800 mb-2">Profile</Text>
          <Text className="text-gray-500">Manage your account settings</Text>
        </View>
        <View className="flex-row justify-center">
          <Text className="text-gray-600">if you have account? </Text>
          <Link href="/login" asChild>
            <TouchableOpacity>
              <Text className="text-blue-600 font-medium">Login</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Profile Info */}
        <View className="px-6 py-6">
          <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <View className="items-center mb-4">
              <View className="w-24 h-24 rounded-full overflow-hidden mb-4">
                <Image
                  source={instructor.avatar}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
              <Text className="text-xl font-bold text-gray-800 mb-1">
                {name}
              </Text>
            </View>

            <View className="flex-row justify-between">
              <View className="items-center">
                <Text className="text-2xl font-bold text-gray-800">12</Text>
                <Text className="text-gray-500 text-sm">Courses</Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-gray-800">4.8</Text>
                <Text className="text-gray-500 text-sm">Rating</Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-gray-800">85%</Text>
                <Text className="text-gray-500 text-sm">Progress</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View className="px-6 pt-6 pb-10">
          <Text className="text-sm font-medium text-gray-500 mb-4">
            Account
          </Text>
          <View className="space-y-4">
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm active:opacity-90"
              >
                <View className="flex-row items-center">
                  <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mr-4">
                    {item.icon}
                  </View>
                  <View className="flex-1">
                    <Text className="text-base font-medium text-gray-800">
                      {item.title}
                    </Text>
                    <Text className="text-xs text-gray-500">
                      {item.subtitle}
                    </Text>
                  </View>
                  <Text className="text-gray-300 text-xl ml-2">›</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Logout */}
          <View className="mt-8">
            <TouchableOpacity
              className="flex-row items-center justify-center bg-red-50 py-3 rounded-xl border border-red-100 active:opacity-90"
              onPress={logout}
            >
              <MaterialIcons name="logout" size={20} color="#DC2626" />
              <Text className="text-base font-semibold text-red-600 ml-2">
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
