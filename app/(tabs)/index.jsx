import { AntDesign, Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { appConfig } from "../../data/config";

export default function HomeScreen() {
  const {
    featuredCourse,
    categories,
    ongoingCourses,
    instructor,
    videos,
    upcomingClasses,
    courses,
  } = appConfig;

  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View style={{ padding: 10 }}></View>

        {/* Header */}
        <View className="px-6 py-4 bg-white">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <View className="w-12 h-12 rounded-full items-center justify-center mr-3">
                <Image
                  source={instructor.avatar}
                  className="w-12 h-12 rounded-full"
                  resizeMode="cover"
                />
              </View>
              <View>
                <Text className="text-lg font-semibold text-gray-800">
                  Hello, {instructor.name}
                </Text>
                <Text className="text-gray-500 text-sm">
                  {appConfig.welcomeMessage}
                </Text>
              </View>
            </View>
            <View className="flex-row space-x-10">
              <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
                <Ionicons
                  name="notifications-outline"
                  size={20}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Featured Course */}
        <View className="px-6 py-4">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold text-gray-800">
              Featured Course
            </Text>
            <TouchableOpacity onPress={() => router.push("/courses")}>
              <Text className="text-purple-600 font-medium">See All</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className="bg-purple-600 rounded-3xl p-6 shadow-lg"
            onPress={() => router.push("/courses")}
          >
            <View className="flex-row items-center justify-between mb-4">
              <View className="bg-purple-400 px-3 py-1 rounded-full">
                <Text className="text-white text-xs font-bold">
                  {featuredCourse.tag}
                </Text>
              </View>
              <TouchableOpacity className="w-12 h-12 bg-white/20 rounded-full items-center justify-center">
                <Feather name="play" size={20} color="white" />
              </TouchableOpacity>
            </View>

            <Text className="text-2xl font-bold text-white mb-2">
              {featuredCourse.title}
            </Text>
            <Text className="text-purple-100 mb-4">
              {featuredCourse.description}
            </Text>

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="w-8 h-8 bg-white/20 rounded-full items-center justify-center mr-2">
                  <FontAwesome5
                    name="chalkboard-teacher"
                    size={16}
                    color="white"
                  />
                </View>
                <Text className="text-white font-medium">
                  {featuredCourse.instructor}
                </Text>
                <View className="flex-row items-center ml-3">
                  <AntDesign name="star" size={14} color="#FCD34D" />
                  <Text className="text-white font-medium ml-1">
                    {featuredCourse.rating}
                  </Text>
                </View>
              </View>
            </View>

            <View className="flex-row items-center mt-4 space-x-4">
              <View className="flex-row items-center">
                <Feather name="book-open" size={14} color="#E0E7FF" />
                <Text className="text-white text-sm ml-1">
                  {featuredCourse.lessons} lessons
                </Text>
              </View>
              <View className="flex-row items-center ml-2">
                <Ionicons name="time-outline" size={14} color="#E0E7FF" />
                <Text className="text-white text-sm ml-1 ">
                  {featuredCourse.duration}
                </Text>
              </View>
              <TouchableOpacity className="bg-white px-4 py-2 rounded-full ml-auto">
                <Text className="text-purple-600 font-semibold text-sm">
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>

        {/* Ongoing Courses */}
        <View className="px-6 py-4 pb-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold text-gray-800">
              Ongoing Courses
            </Text>
            <TouchableOpacity>
              <Text className="text-purple-600 font-medium">View All</Text>
            </TouchableOpacity>
          </View>

          <View className="space-y-4">
            {ongoingCourses.map((course) => (
              <TouchableOpacity
                key={course.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
                onPress={() =>
                  router.push({
                    pathname: "/course/[id]",
                    params: { id: course.id },
                  })
                }
              >
                <View className="flex-row items-center">
                  <View className="w-16 h-16 bg-purple-100 rounded-2xl items-center justify-center mr-4">
                    <View className="w-10 h-10 rounded-lg overflow-hidden">
                      <Image
                        source={course.icon}
                        className="w-full h-full"
                        resizeMode="cover"
                      />
                    </View>
                  </View>

                  <View className="flex-1">
                    <Text className="text-lg font-bold text-gray-800 mb-1">
                      {course.title}
                    </Text>
                    <View className="flex-row items-center mb-3">
                      <Image
                        source={course.instructorAvatar}
                        className="w-6 h-6 rounded-full mr-2"
                        resizeMode="cover"
                      />
                      <Text className="text-gray-600 text-sm">
                        {course.instructor}
                      </Text>
                    </View>

                    <View className="flex-row items-center justify-between">
                      <View className="flex-1 mr-4">
                        <Text className="text-xs text-gray-500 mb-1">
                          Progress
                        </Text>
                        <View className="w-full h-2 bg-gray-200 rounded-full">
                          <View
                            className="h-2 bg-green-500 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          />
                        </View>
                      </View>
                      <Text className="text-sm font-semibold text-gray-700">
                        {course.progress}%
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recommended */}
        <View className="px-6 py-4 pb-8">
          <Text className="text-xl font-bold text-gray-800 mb-4">
            Recommended for You
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="space-x-4"
          >
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
                    <Text className="text-white text-xs font-semibold">
                      {video.duration}
                    </Text>
                  </View>
                </View>

                <View className="p-4">
                  <Text className="text-base font-bold text-gray-800 mb-1">
                    {video.title}
                  </Text>
                  <Text className="text-gray-600 text-sm mb-1">
                    {video.course}
                  </Text>
                  <View className="flex-row items-center">
                    {video.instructorAvatar && (
                      <Image
                        source={video.instructorAvatar}
                        className="w-5 h-5 rounded-full mr-2"
                        resizeMode="cover"
                      />
                    )}
                    <Text className="text-gray-500 text-sm">
                      {video.instructor}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Upcoming Classes */}
        <View className="px-6 py-4 pb-8">
          <Text className="text-xl font-bold text-gray-800 mb-4">
            Upcoming Classes
          </Text>

          <View className="space-y-4">
            {upcomingClasses.map((classItem) => (
              <TouchableOpacity
                key={classItem.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <View className={`h-2 bg-gradient-to-r ${classItem.color}`} />

                <View className="p-4">
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-lg font-bold text-gray-800">
                      {classItem.title}
                    </Text>
                    <View className="flex-row items-center bg-purple-100 px-3 py-1 rounded-full">
                      <Feather
                        name={classItem.icon}
                        size={14}
                        color="#7C3AED"
                        className="mr-1"
                      />
                      <Text className="text-purple-600 text-xs font-semibold ml-1">
                        {classItem.type}
                      </Text>
                    </View>
                  </View>

                  <Text className="text-gray-600 mb-3">
                    {classItem.instructor}
                  </Text>

                  <View className="flex-row items-center justify-between">
                    <View>
                      <Text className="text-gray-500 text-sm">
                        {classItem.date}
                      </Text>
                      <Text className="text-gray-700 font-semibold">
                        {classItem.time}
                      </Text>
                    </View>

                    <TouchableOpacity className="bg-purple-600 px-6 py-2 rounded-full flex-row items-center space-x-2">
                      <Text className="text-white font-semibold">Join</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="px-6 py-4 pb-8">
          <Text className="text-xl font-bold text-gray-800 mb-4">
            All Courses
          </Text>

          {/* Categories Filter */}
          <View className="px-6 py-4">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="space-x-3"
            >
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full ${
                    selectedCategory === category
                      ? "bg-purple-600"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  <Text
                    className={`font-medium ${
                      selectedCategory === category
                        ? "text-white"
                        : "text-gray-600"
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
                  onPress={() =>
                    router.push({
                      pathname: "/course/[id]",
                      params: { id: course.id },
                    })
                  }
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
                      <Text className="text-gray-600 text-sm">
                        {course.instructor}
                      </Text>
                    </View>

                    <View className="flex-row items-center justify-between mb-3">
                      <View className="flex-row items-center">
                        <Text className="text-yellow-500 mr-1">⭐</Text>
                        <Text className="text-gray-700 font-medium mr-4">
                          {course.rating}
                        </Text>
                        <Text className="text-gray-500 text-sm">
                          {course.lessons} lessons
                        </Text>
                      </View>
                      <Text className="text-gray-500 text-sm">
                        {course.duration}
                      </Text>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
