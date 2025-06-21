import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
  Dimensions,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useCityStation from "../../hooks/useCityStation";

const { width } = Dimensions.get("window");

const StationSelector = ({
  visible,
  onClose,
  onSelect,
  title,
  groupedData,
}) => {
  const [expandedCity, setExpandedCity] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);

  const toggleCity = (index) => {
    setExpandedCity(expandedCity === index ? null : index);
  };

  const handleSelect = (city, station) => {
    const stationObj = { city, station };
    console.log("Selected Station:", stationObj);
    setSelectedStation(stationObj);
    setTimeout(() => {
      onSelect(stationObj);
      onClose();
      setSelectedStation(null);
    }, 200);
  };

  const stationList = Object.entries(groupedData).map(([city, stations]) => ({
    city,
    stations,
  }));

  return (
    <Modal visible={visible} animationType="fade" transparent={false}>
      <StatusBar backgroundColor="#f8fafc" barStyle="dark-content" />
      <View className="flex-1 bg-slate-50">
        <View style={{ height: 30 }} />
        <View className="bg-white px-6 pt-16 pb-6 shadow-sm">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              onPress={onClose}
              className="w-10 h-10 items-center justify-center rounded-full bg-gray-100"
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={25} color="#EF4444" />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-gray-900">{title}</Text>
            <View className="w-10" />
          </View>
        </View>

        <ScrollView
          className="flex-1 px-6 py-4"
          showsVerticalScrollIndicator={false}
        >
          {stationList.map((item, index) => (
            <View key={item.city} className="mb-4">
              <TouchableOpacity
                className="bg-white rounded-2xl p-5 mb-3 shadow-sm border border-gray-100"
                onPress={() => toggleCity(index)}
                activeOpacity={0.8}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <View className="w-10 h-10 bg-blue-100 rounded-xl items-center justify-center mr-3">
                      <Ionicons name="business" size={25} color="#3b82f6" />
                    </View>
                    <Text className="text-lg font-semibold text-gray-900">
                      {item.city}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-lg text-gray-500 mr-2">
                      {item.stations.length} stations
                    </Text>
                    <Ionicons
                      name={
                        expandedCity === index ? "chevron-up" : "chevron-down"
                      }
                      size={20}
                      color="#6b7280"
                    />
                  </View>
                </View>
              </TouchableOpacity>

              {expandedCity === index && (
                <View className="flex-row flex-wrap">
                  {item.stations.map((station, i) => {
                    const isSelected =
                      selectedStation?.city === item.city &&
                      selectedStation?.station === station;

                    return (
                      <TouchableOpacity
                        key={i}
                        className={`bg-white rounded-xl p-4 m-1 shadow-sm border ${
                          isSelected
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-100"
                        }`}
                        style={{ width: (width - 60) / 2 - 8 }}
                        onPress={() => handleSelect(item.city, station)}
                        activeOpacity={0.8}
                      >
                        <Ionicons
                          name="train"
                          size={24}
                          color={isSelected ? "#3b82f6" : "#6b7280"}
                          style={{ marginBottom: 8 }}
                        />
                        <Text
                          className={`font-medium ${
                            isSelected ? "text-blue-700" : "text-gray-700"
                          }`}
                          numberOfLines={2}
                        >
                          {station}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

const StationCard = ({ title, subtitle, onPress, icon }) => (
  <TouchableOpacity
    onPress={onPress}
    className="bg-white rounded-2xl mx-6 my-2 p-5 border border-gray-100"
    activeOpacity={0.9}
    style={{
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 3,
    }}
  >
    <View className="flex-row items-center">
      <View className="w-12 h-12 bg-gray-50 rounded-xl items-center justify-center mr-4">
        <Ionicons name={icon} size={25} color="#374151" />
      </View>
      <View className="flex-1">
        <Text className="text-gray-500 text-lg font-medium mb-1">
          {subtitle}
        </Text>
        <Text className="text-gray-900 text-lg font-semibold" numberOfLines={1}>
          {title}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={25} color="#d1d5db" />
    </View>
  </TouchableOpacity>
);

const StationsScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [storedDate, setStoredDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStationModal, setShowStationModal] = useState(null);
  const [departure, setDeparture] = useState(null);
  const [arrival, setArrival] = useState(null);
  const { groupedData, isLoading, error } = useCityStation();

  const onDateChange = (_, date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (date) {
      setSelectedDate(date);
      setStoredDate(formatDateForStorage(date));
    }
  };

  const formatDateForStorage = (date) => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());
    return `${day}/${month}/${year}`;
  };

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

  if (isLoading) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <Ionicons name="train" size={40} color="#6b7280" />
        <Text className="text-lg text-gray-600 mt-3">Loading stations...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <Ionicons name="alert-circle" size={40} color="#ef4444" />
        <Text className="text-lg text-red-600 mt-3">
          Error loading stations
        </Text>
      </View>
    );
  }

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

        <View className="flex-1 bg-gray-50 ">
          <View className="bg-white pt-4 pb-4 px-4 items-center">
            <Text className="text-2xl font-bold text-gray-900 text-center mb-2">
              رايح على فين النهاردة؟
            </Text>
          </View>

          <View className="flex-1">
            <StationCard
              subtitle="From"
              title={
                departure
                  ? `${departure.city} - ${departure.station}`
                  : "Select Departure Station"
              }
              icon="location"
              onPress={() => setShowStationModal("departure")}
            />

            <View style={{ height: 30 }} />

            <StationCard
              subtitle="To"
              title={
                arrival
                  ? `${arrival.city} - ${arrival.station}`
                  : "Select Arrival Station"
              }
              icon="location"
              onPress={() => setShowStationModal("arrival")}
            />

            <View style={{ height: 30 }} />

            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              className="bg-white rounded-2xl mx-6 my-2 p-5 border border-gray-100"
              activeOpacity={0.9}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-gray-50 rounded-xl items-center justify-center mr-4">
                  <Ionicons name="calendar-outline" size={25} color="#374151" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-500 text-lg font-medium mb-1">
                    Travel Date
                  </Text>
                  <Text
                    className="text-gray-900 text-lg font-semibold"
                    numberOfLines={1}
                  >
                    {formatDate(selectedDate)}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={25} color="#d1d5db" />
              </View>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={onDateChange}
                minimumDate={new Date()}
              />
            )}

            <View style={{ height: 30 }} />

            <TouchableOpacity
              className="bg-blue-600 rounded-2xl px-6 py-4 mx-4 my-4 items-center justify-center shadow-md"
              activeOpacity={0.9}
            >
              <Text className="text-white text-lg font-semibold">Search</Text>
            </TouchableOpacity>
          </View>

          <StationSelector
            visible={showStationModal === "departure"}
            onClose={() => setShowStationModal(null)}
            onSelect={setDeparture}
            title="Select Departure Station"
            groupedData={groupedData}
          />

          <StationSelector
            visible={showStationModal === "arrival"}
            onClose={() => setShowStationModal(null)}
            onSelect={setArrival}
            title="Select Arrival Station"
            groupedData={groupedData}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StationsScreen;
