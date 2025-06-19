import { SafeAreaView, ScrollView, Text, View } from "react-native";
import TravelApp from "../../components/stationCard";
export default function CoursesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 py-6 bg-white">
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            Our Stations
          </Text>
          <Text className="text-gray-500">Discover our Royal Lines</Text>
        </View>

        {/* Travel App Component */}
        <View className="px-4 py-6">
          <TravelApp />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
