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

// Reusable styles
const cardShadowStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05,
  shadowRadius: 8,
  elevation: 3,
};

// Constants
const CARD_SPACING = 30;
const STATION_CARD_WIDTH = (width - 60) / 2 - 8;

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
    setSelectedStation(stationObj);
    setTimeout(() => {
      onSelect(stationObj);
      onClose();
      setSelectedStation(null);
    }, 200);
  };

  const cities = Object.entries(groupedData);

  return (
    <Modal visible={visible} animationType="fade" transparent={false}>
      <StatusBar backgroundColor="#f8fafc" barStyle="dark-content" />
      <View className="flex-1 bg-slate-50">
        <View style={{ height: 30 }} />

        {/* Header */}
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
          {cities.map(([city, stations], index) => (
            <View key={city} className="mb-4">
              {/* City Header */}
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
                      {city}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-lg text-gray-500 mr-2">
                      {stations.length} stations
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

              {/* Stations Grid */}
              {expandedCity === index && (
                <View className="flex-row flex-wrap">
                  {stations.map((station, i) => {
                    const isSelected =
                      selectedStation?.city === city &&
                      selectedStation?.station === station;

                    return (
                      <TouchableOpacity
                        key={i}
                        className={`bg-white rounded-xl p-4 m-1 shadow-sm border ${
                          isSelected
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-100"
                        }`}
                        style={{ width: STATION_CARD_WIDTH }}
                        onPress={() => handleSelect(city, station)}
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

const SelectionCard = ({ title, subtitle, onPress, icon }) => (
  <TouchableOpacity
    onPress={onPress}
    className="bg-white rounded-2xl mx-6 my-2 p-5 border border-gray-100"
    activeOpacity={0.9}
    style={cardShadowStyle}
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

const LoadingState = ({ message, icon = "train" }) => (
  <View className="flex-1 bg-white justify-center items-center">
    <Ionicons name={icon} size={40} color="#6b7280" />
    <Text className="text-lg text-gray-600 mt-3">{message}</Text>
  </View>
);

const StationsScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [storedDate, setStoredDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStationModal, setShowStationModal] = useState(null);
  const [departure, setDeparture] = useState(null);
  const [arrival, setArrival] = useState(null);

  const { groupedData, isLoading, error } = useCityStation();

  const handleSearch = () => {
    console.log(storedDate);
    console.log(departure);
    console.log(arrival);
  };

  const formatDateForStorage = (date) => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());
    return `${day}/${month}/${year}`;
  };

  const onDateChange = (_, date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (date) {
      setSelectedDate(date);
      setStoredDate(formatDateForStorage(date)); // Store in dd/mm/yy format
    }
  };

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

  const getStationDisplayText = (station) =>
    station ? `${station.city} - ${station.station}` : "Select Station";

  useState(() => {
    setStoredDate(formatDateForStorage(new Date()));
  }, []);

  if (isLoading) {
    return <LoadingState message="Loading stations..." />;
  }

  if (error) {
    return (
      <LoadingState message="Error loading stations" icon="alert-circle" />
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

        <View className="flex-1 bg-gray-50">
          {/* Arabic Title */}
          <View className="bg-white pt-4 pb-4 px-4 items-center">
            <Text className="text-2xl font-bold text-gray-900 text-center mb-2">
              رايح على فين النهاردة؟
            </Text>
          </View>

          <View className="flex-1">
            {/* Departure Station */}
            <SelectionCard
              subtitle="From"
              title={
                getStationDisplayText(departure) || "Select Departure Station"
              }
              icon="location"
              onPress={() => setShowStationModal("departure")}
            />

            <View style={{ height: CARD_SPACING }} />

            {/* Arrival Station */}
            <SelectionCard
              subtitle="To"
              title={getStationDisplayText(arrival) || "Select Arrival Station"}
              icon="location"
              onPress={() => setShowStationModal("arrival")}
            />

            <View style={{ height: CARD_SPACING }} />

            {/* Date Picker */}
            <SelectionCard
              subtitle="Travel Date"
              title={formatDate(selectedDate)}
              icon="calendar-outline"
              onPress={() => setShowDatePicker(true)}
            />

            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={onDateChange}
                minimumDate={new Date()}
              />
            )}

            <View style={{ height: CARD_SPACING }} />

            {/* Search Button */}
            <TouchableOpacity
              className="bg-blue-600 rounded-2xl px-6 py-4 mx-4 my-4 items-center justify-center shadow-md"
              activeOpacity={0.9}
              onPress={handleSearch}
            >
              <Text className="text-white text-lg font-semibold">Search</Text>
            </TouchableOpacity>
          </View>

          {/* Station Modals */}
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
