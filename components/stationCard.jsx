import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";

import {
  Dimensions,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useCityStation from "../hooks/useCityStation";

const { width } = Dimensions.get("window");

//Station Selector
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
    setSelectedStation(`${station}, ${city}`);
    setTimeout(() => {
      onSelect(`${station}, ${city}`);
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
        {/* Clean Header */}
        <View className="bg-white px-6 pt-16 pb-6 shadow-sm">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              onPress={onClose}
              className="w-10 h-10 items-center justify-center rounded-full bg-gray-100"
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={20} color="#374151" />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-gray-900">{title}</Text>
            <View className="w-10" />
          </View>
        </View>

        {/* Cities Grid */}
        <ScrollView
          className="flex-1 px-6 py-4"
          showsVerticalScrollIndicator={false}
        >
          {stationList.map((item, index) => (
            <View key={item.city} className="mb-4">
              {/* City Header */}
              <TouchableOpacity
                className="bg-white rounded-2xl p-5 mb-3 shadow-sm border border-gray-100"
                onPress={() => toggleCity(index)}
                activeOpacity={0.8}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <View className="w-10 h-10 bg-blue-100 rounded-xl items-center justify-center mr-3">
                      <Ionicons name="business" size={20} color="#3b82f6" />
                    </View>
                    <Text className="text-lg font-semibold text-gray-900">
                      {item.city}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-sm text-gray-500 mr-2">
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

              {/* Stations Grid */}
              {expandedCity === index && (
                <View className="flex-row flex-wrap">
                  {item.stations.map((station, i) => (
                    <TouchableOpacity
                      key={i}
                      className={`bg-white rounded-xl p-4 m-1 shadow-sm border ${
                        selectedStation === `${station}, ${item.city}`
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
                        color={
                          selectedStation === `${station}, ${item.city}`
                            ? "#3b82f6"
                            : "#6b7280"
                        }
                        style={{ marginBottom: 8 }}
                      />
                      <Text
                        className={`font-medium ${
                          selectedStation === `${station}, ${item.city}`
                            ? "text-blue-700"
                            : "text-gray-700"
                        }`}
                        numberOfLines={2}
                      >
                        {station}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

// Station Card
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
        <Ionicons name={icon} size={22} color="#374151" />
      </View>
      <View className="flex-1">
        <Text className="text-gray-500 text-sm font-medium mb-1">
          {subtitle}
        </Text>
        <Text
          className="text-gray-900 text-base font-semibold"
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
    </View>
  </TouchableOpacity>
);

// Main Component
const TravelApp = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStationModal, setShowStationModal] = useState(null);
  const [departure, setDeparture] = useState("Select Departure Station");
  const [arrival, setArrival] = useState("Select Arrival Station");

  const { groupedData, isLoading, error } = useCityStation();

  const onDateChange = (_, date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (date) setSelectedDate(date);
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <View className="items-center">
          <View className="w-16 h-16 bg-gray-100 rounded-2xl items-center justify-center mb-4">
            <Ionicons name="train" size={32} color="#6b7280" />
          </View>
          <Text className="text-lg font-medium text-gray-600">
            Loading stations...
          </Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <View className="items-center">
          <View className="w-16 h-16 bg-red-100 rounded-2xl items-center justify-center mb-4">
            <Ionicons name="alert-circle" size={32} color="#ef4444" />
          </View>
          <Text className="text-lg font-medium text-red-600">
            Error loading stations
          </Text>
        </View>
      </View>
    );
  }

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar backgroundColor="#f9fafb" barStyle="dark-content" />

      {/* Clean Header */}
      <View className="bg-white pt-16 pb-8 px-6">
        <View className="items-center">
          <Text className="text-2xl font-bold text-gray-900 text-center mb-2">
            رايح على فين النهاردة؟
          </Text>
        </View>
      </View>

      {/* Journey Selection */}
      <View className="flex-1">
        <StationCard
          subtitle="From"
          title={departure}
          icon="location"
          onPress={() => setShowStationModal("departure")}
        />
        {/* Connection Line */}
        <View className="items-center my-2">
          <View className="w-px h-6 bg-gray-200" />
          <TouchableOpacity
            className="w-8 h-8 bg-white rounded-full items-center justify-center border-2 border-gray-200 -my-4 z-10"
            activeOpacity={0.8}
            onPress={() => {
              const temp = departure;
              setDeparture(arrival);
              setArrival(temp);
            }}
          >
            <Ionicons name="swap-vertical" size={14} color="#6b7280" />
          </TouchableOpacity>
          <View className="w-px h-6 bg-gray-200" />
        </View>
        <StationCard
          subtitle="To"
          title={arrival}
          icon="location"
          onPress={() => setShowStationModal("arrival")}
        />
        <View style={{ height: 30 }} />
        {/* Date Picker - Same Style as Station Cards */}
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
              <Ionicons name="calendar-outline" size={22} color="#374151" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-500 text-sm font-medium mb-1">
                Travel Date
              </Text>
              <Text
                className="text-gray-900 text-base font-semibold"
                numberOfLines={1}
              >
                {formatDate(selectedDate)}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
          </View>
        </TouchableOpacity>
        {/* Native Date Picker */}
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onDateChange}
            minimumDate={new Date()}
          />
        )}
        {/* Search Button */}
        <View style={{ height: 30 }} />
        <TouchableOpacity
          className="bg-blue-600 rounded-2xl px-6 py-4 mx-4 my-4 items-center justify-center shadow-md"
          activeOpacity={0.9}
        >
          <View className="flex-row items-center space-x-2">
            <Text className="text-white text-lg font-semibold">Search</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Station Selector Modals */}
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
  );
};

export default TravelApp;
