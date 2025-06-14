import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { appConfig } from '../../data/config';

export default function CoursesScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { categories, courses } = appConfig;

  const filteredCourses = selectedCategory === 'All'
    ? courses
    : courses.filter(course => course.category === selectedCategory);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 py-6 bg-white">
          <Text className="text-2xl font-bold text-gray-800 mb-2">All Courses</Text>
          <Text className="text-gray-500">Discover new skills and advance your career</Text>
        </View>

        {/* Categories Filter */}
        <View className="px-6 py-4">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-3">
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full ${
                  selectedCategory === category
                    ? 'bg-purple-600'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <Text
                  className={`font-medium ${
                    selectedCategory === category ? 'text-white' : 'text-gray-600'
                  }`}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Courses Grid */}
        <View className="px-6 py-4 pb-8">
          <View className="space-y-4">
            {filteredCourses.map((course) => (
              <TouchableOpacity
                key={course.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                onPress={() => router.push({ pathname: '/course/[id]', params: { id: course.id } })}
              >
                <Image
                  source={course.image}
                  className="w-full h-48"
                  resizeMode="cover"
                />
                
                <View className="p-4">
                  <Text className="text-lg font-bold text-gray-800 mb-2">
                    {course.title}
                  </Text>
                  
                  <View className="flex-row items-center mb-3">
                    <Image
                      source={course.instructorAvatar}
                      className="w-6 h-6 rounded-full mr-2"
                      resizeMode="cover"
                    />
                    <Text className="text-gray-600 text-sm">{course.instructor}</Text>
                  </View>
                  
                  <View className="flex-row items-center justify-between mb-3">
                    <View className="flex-row items-center">
                      <Text className="text-yellow-500 mr-1">⭐</Text>
                      <Text className="text-gray-700 font-medium mr-4">{course.rating}</Text>
                      <Text className="text-gray-500 text-sm">{course.lessons} lessons</Text>
                    </View>
                    <Text className="text-gray-500 text-sm">{course.duration}</Text>
                  </View>
                  
                  <View className="flex-row items-center justify-between">
                    <Text className="text-2xl font-bold text-purple-600">
                      ${course.price}
                    </Text>
                    <TouchableOpacity className="bg-purple-600 px-6 py-2 rounded-full">
                      <Text className="text-white font-semibold">Enroll</Text>
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