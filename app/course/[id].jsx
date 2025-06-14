import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { appConfig } from '../../data/config';

export default function CourseDetailScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  
  // For demo purposes, we'll use the featured course data
  const course = appConfig.featuredCourse;
  const instructorAvatar = appConfig.instructor.avatar;
  
  const lessons = [
    { id: '1', title: 'Introduction to Modern JavaScript', duration: '15:30', completed: true },
    { id: '2', title: 'React Fundamentals', duration: '22:45', completed: true },
    { id: '3', title: 'Component Lifecycle', duration: '18:20', completed: false },
    { id: '4', title: 'State Management', duration: '25:10', completed: false },
    { id: '5', title: 'Hooks in Detail', duration: '20:35', completed: false },
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        {/* Header */}
        <View className="px-6 py-4 bg-white flex-row items-center">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mr-4"
          >
            <Feather name="arrow-left" size={20} color="#6B7280" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-gray-800">Course Details</Text>
        </View>

        {/* Course Hero */}
        <View className="px-6 py-6 bg-white">
          <View className="mb-6">
            <Image
              source={course.image}
              className="w-full h-48 rounded-3xl"
              resizeMode="cover"
            />
            <TouchableOpacity className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-purple-700 bg-opacity-20 rounded-full items-center justify-center">
              <Feather name="play" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <Text className="text-2xl font-bold text-gray-800 mb-2">{course.title}</Text>
          <Text className="text-gray-600 mb-4">{course.description}</Text>
          
          <View className="flex-row items-center mb-4">
            <Image
              source={instructorAvatar}
              className="w-10 h-10 rounded-full mr-3"
              resizeMode="cover"
            />
            <View>
              <Text className="font-semibold text-gray-800">{course.instructor}</Text>
              <Text className="text-gray-500 text-sm">Course Instructor</Text>
            </View>
          </View>

          <View className="flex-row items-center space-x-6 mb-6">
            <View className="flex-row items-center">
              <Text className="text-yellow-500 mr-1">⭐</Text>
              <Text className="font-semibold text-gray-700">{course.rating}</Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-purple-500 mr-1">📚</Text>
              <Text className="text-gray-700">{course.lessons} lessons</Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-purple-500 mr-1">⏱️</Text>
              <Text className="text-gray-700">{course.duration}</Text>
            </View>
          </View>

          {/* Course Content */}
          <View className="px-6 py-4">
            <Text className="text-xl font-bold text-gray-800 mb-4">Course Content</Text>
            
            <View className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {lessons.map((lesson, index) => (
                <TouchableOpacity
                  key={lesson.id}
                  className={`p-4 flex-row items-center ${
                    index !== lessons.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <View className={`w-8 h-8 rounded-full items-center justify-center mr-4 ${
                    lesson.completed ? 'bg-green-500' : 'bg-gray-200'
                  }`}>
                    <Text className={`text-sm ${
                      lesson.completed ? 'text-white' : 'text-gray-600'
                    }`}>
                      {lesson.completed ? '✓' : index + 1}
                    </Text>
                  </View>
                  
                  <View className="flex-1">
                    <Text className={`font-semibold mb-1 ${
                      lesson.completed ? 'text-gray-800' : 'text-gray-600'
                    }`}>
                      {lesson.title}
                    </Text>
                    <Text className="text-gray-500 text-sm">{lesson.duration}</Text>
                  </View>
                  
                  {!lesson.completed && (
                    <TouchableOpacity className="w-8 h-8 bg-purple-100 rounded-full items-center justify-center">
                      <Feather name="play" size={16} color="#7C3AED" />
                    </TouchableOpacity>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Action Buttons */}
          <View className="px-6 py-6">
            <TouchableOpacity className="bg-purple-600 rounded-2xl p-4 mb-3">
              <Text className="text-white text-center font-semibold text-lg">
                Continue Learning
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="bg-white border border-purple-600 rounded-2xl p-4">
              <Text className="text-purple-600 text-center font-semibold text-lg">
                Download for Offline
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 