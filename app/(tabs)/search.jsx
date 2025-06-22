import { SafeAreaView, ScrollView } from "react-native";
import TripSearch from "../../components/tripSearchScreen/TripSearch";
export default function Search() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <TripSearch />
      </ScrollView>
    </SafeAreaView>
  );
}
