import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { appConfig } from '../../data/config';

export default function ProfileScreen() {
  const { instructor } = appConfig;

  const menuItems = [
    {
      icon: <Feather name="user" size={20} color="#6B7280" />,
      title: 'Edit Profile',
      subtitle: 'Update your personal information',
    },
    {
      icon: <Feather name="bar-chart-2" size={20} color="#6B7280" />,
      title: 'My Progress',
      subtitle: 'Track your learning journey',
    },
    {
      icon: <Ionicons name="cloud-download-outline" size={20} color="#6B7280" />,
      title: 'Downloads',
      subtitle: 'Your offline content',
    },
    {
      icon: <Feather name="help-circle" size={20} color="#6B7280" />,
      title: 'Help & Support',
      subtitle: 'FAQs & contact',
    },
    {
      icon: <Feather name="settings" size={20} color="#6B7280" />,
      title: 'Settings',
      subtitle: 'Preferences & themes',
    },
  ];

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}
    >
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Profile Header */}
        <View className="px-6 pt-8 pb-6 bg-white border-b border-gray-200">
          <View className="items-center">
            <View className="w-24 h-24 rounded-full items-center justify-center mb-4">
              <Image
                source={instructor.avatar}
                className="w-24 h-24 rounded-full"
                resizeMode="cover"
              />
            </View>
            <Text className="text-xl font-semibold text-gray-900">{instructor.name}</Text>
            <Text className="text-sm text-gray-500">{instructor.title}</Text>
          </View>

          {/* Stats */}
          <View className="flex-row justify-around mt-6">
            <View className="items-center">
              <Text className="text-lg font-bold text-purple-600">12</Text>
              <Text className="text-gray-500 text-xs">Courses</Text>
            </View>
            <View className="items-center">
              <Text className="text-lg font-bold text-purple-600">45h</Text>
              <Text className="text-gray-500 text-xs">Learning</Text>
            </View>
            <View className="items-center">
              <Text className="text-lg font-bold text-purple-600">4.9</Text>
              <Text className="text-gray-500 text-xs">Rating</Text>
            </View>
          </View>
        </View>

        {/* Menu Section */}
        <View className="px-6 pt-6 pb-10">
          <Text className="text-sm font-medium text-gray-500 mb-4">Account</Text>
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
                    <Text className="text-base font-medium text-gray-800">{item.title}</Text>
                    <Text className="text-xs text-gray-500">{item.subtitle}</Text>
                  </View>
                  <Text className="text-gray-300 text-xl ml-2">›</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Logout */}
          <View className="mt-8">
            <TouchableOpacity className="flex-row items-center justify-center bg-red-50 py-3 rounded-xl border border-red-100 active:opacity-90">
              <MaterialIcons name="logout" size={20} color="#DC2626" />
              <Text className="text-base font-semibold text-red-600 ml-2">Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}