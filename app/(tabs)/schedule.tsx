import { Feather } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function ScheduleScreen() {

  const upcomingClasses = [
    {
      id: '1',
      title: 'Gravity & Motion',
      instructor: 'Dr. Mark',
      time: '10:00 AM - 11:00 AM',
      date: 'Today',
      type: 'Live Experiment',
      color: 'from-yellow-400 to-yellow-600',
      icon: 'video',
    },
    {
      id: '2',
      title: 'Fun Chemistry Lab',
      instructor: 'Ms. Sarah',
      time: '1:30 PM - 2:30 PM',
      date: 'Today',
      type: 'Hands-on Lab',
      color: 'from-pink-400 to-pink-600',
      icon: 'box',
    },
    {
      id: '3',
      title: 'Inside the Human Body',
      instructor: 'Mr. kavita Sharma',
      time: '9:00 AM - 10:15 AM',
      date: 'Tomorrow',
      type: 'Science Talk',
      color: 'from-green-400 to-green-600',
      icon: 'heart',
    },
  ];
  

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 py-6 bg-white">
          <Text className="text-2xl font-bold text-gray-800 mb-2">Schedule</Text>
          <Text className="text-gray-500">Manage your learning schedule</Text>
        </View>

        {/* Calendar Header */}
        <View className="px-6 py-4">
          <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-bold text-gray-800">June 2025</Text>
              <View className="flex-row space-x-3">
                <TouchableOpacity className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center">
                  <Feather name="chevron-left" size={18} color="#6B7280" />
                </TouchableOpacity>
                <TouchableOpacity className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center">
                  <Feather name="chevron-right" size={18} color="#6B7280" />
                </TouchableOpacity>
              </View>
            </View>

            <View className="flex-row justify-between">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                <View key={index} className="w-10 h-10 items-center justify-center">
                  <Text className="text-gray-500 text-sm font-medium">{day}</Text>
                </View>
              ))}
            </View>

            <View className="flex-row justify-between mt-2">
              {[1, 2, 3, 4, 5, 6, 7].map((date, index) => (
                <TouchableOpacity
                  key={index}
                  className={`w-10 h-10 items-center justify-center rounded-full ${
                    date === 4 ? 'bg-purple-600' : ''
                  }`}
                >
                  <Text
                    className={`text-sm font-medium ${
                      date === 4 ? 'text-white' : 'text-gray-700'
                    }`}
                  >
                    {date}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Upcoming Classes */}
        <View className="px-6 py-4 pb-8">
          <Text className="text-xl font-bold text-gray-800 mb-4">Upcoming Classes</Text>

          <View className="space-y-4">
            {upcomingClasses.map((classItem) => (
              <TouchableOpacity
                key={classItem.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <View className={`h-2 bg-gradient-to-r ${classItem.color}`} />

                <View className="p-4">
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-lg font-bold text-gray-800">{classItem.title}</Text>
                    <View className="flex-row items-center bg-purple-100 px-3 py-1 rounded-full">
                      <Feather
                        name={classItem.icon as any}
                        size={14}
                        color="#7C3AED"
                        className="mr-1"
                      />
                      <Text className="text-purple-600 text-xs font-semibold ml-1">
                        {classItem.type}
                      </Text>
                    </View>
                  </View>

                  <Text className="text-gray-600 mb-3">{classItem.instructor}</Text>

                  <View className="flex-row items-center justify-between">
                    <View>
                      <Text className="text-gray-500 text-sm">{classItem.date}</Text>
                      <Text className="text-gray-700 font-semibold">{classItem.time}</Text>
                    </View>

                    <TouchableOpacity className="bg-purple-600 px-6 py-2 rounded-full flex-row items-center space-x-2">
                      {/* <Feather name="log-in" size={16} color="white" /> */}
                      <Text className="text-white font-semibold">Join</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
