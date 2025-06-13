import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { appConfig } from '../../data/config';

export default function WatchScreen() {
  const videos = [
    {
      id: '1',
      title: 'Forces in Action',
      duration: '10:15',
      thumbnail: appConfig.featuredCourse.image,
      instructor: 'Dr. Mark',
      instructorAvatar: appConfig.ongoingCourses.find(c => c.title === 'Fun with Physics')?.instructorAvatar,
      course: 'Fun with Physics',
    },
    {
      id: '2',
      title: 'Mixing Magic: Simple Reactions',
      duration: '12:30',
      thumbnail: appConfig.courses.find(c => c.title === 'Chemistry for Kids')?.image,
      instructor: 'Ms. Sarah',
      instructorAvatar: appConfig.courses.find(c => c.instructor === 'Ms. Sarah')?.instructorAvatar,
      course: 'Chemistry for Kids', 
    },
    {
      id: '3',
      title: 'How the Heart Works',
      duration: '14:20',
      thumbnail: appConfig.courses.find(c => c.title === 'Our Amazing Body')?.image,
      instructor: 'Mr. Kavita Sharma',
      instructorAvatar: appConfig.courses.find(c => c.instructor === 'Mr. Kavita Sharma')?.instructorAvatar,
      course: 'Our Amazing Body',
    },
  ];
  

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 py-6 bg-white">
          <Text className="text-2xl font-bold text-gray-800 mb-2">Watch</Text>
          <Text className="text-gray-500">Continue your learning journey</Text>
        </View>

        {/* Recently Watched */}
        <View className="px-6 py-4">
          <Text className="text-xl font-bold text-gray-800 mb-4">Recently Watched</Text>

          <View className="space-y-4">
            {videos.map((video) => (
              <TouchableOpacity
                key={video.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
              >
                <View className="flex-row items-center">
                  <View className="w-20 h-20 mr-4 relative overflow-hidden rounded-xl">
                    <Image
                      source={video.thumbnail}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                    <View className="absolute inset-0 bg-black/10 z-10 items-center justify-center flex">
                      <Feather name="play" size={24} color="white" />
                    </View>
                  </View>

                  <View className="flex-1">
                    <Text className="text-lg font-bold text-gray-800 mb-1">{video.title}</Text>
                    <Text className="text-gray-600 text-sm mb-1">{video.course}</Text>
                    <View className="flex-row items-center mb-2">
                      {video.instructorAvatar && (
                        <Image
                          source={video.instructorAvatar}
                          className="w-5 h-5 rounded-full mr-2"
                          resizeMode="cover"
                        />
                      )}
                      <Text className="text-gray-500 text-sm">{video.instructor}</Text>
                    </View>
                    <Text className="text-purple-600 font-semibold text-sm">{video.duration}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recommended */}
        <View className="px-6 py-4 pb-8">
          <Text className="text-xl font-bold text-gray-800 mb-4">Recommended for You</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-4">
            {videos.map((video) => (
              <TouchableOpacity
                key={`rec-${video.id}`}
                className="w-64 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <View className="h-36 relative overflow-hidden rounded-t-2xl">
                  <Image
                    source={video.thumbnail}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                  <View className="absolute inset-0 bg-black/10 z-10 items-center justify-center flex">
                    <Feather name="play" size={30} color="white" />
                  </View>
                  <View className="absolute bottom-2 right-2 bg-black bg-opacity-70 px-2 py-1 rounded">
                    <Text className="text-white text-xs font-semibold">{video.duration}</Text>
                  </View>
                </View>

                <View className="p-4">
                  <Text className="text-base font-bold text-gray-800 mb-1">{video.title}</Text>
                  <Text className="text-gray-600 text-sm mb-1">{video.course}</Text>
                  <View className="flex-row items-center">
                    {video.instructorAvatar && (
                      <Image
                        source={video.instructorAvatar}
                        className="w-5 h-5 rounded-full mr-2"
                        resizeMode="cover"
                      />
                    )}
                    <Text className="text-gray-500 text-sm">{video.instructor}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
