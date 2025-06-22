import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useLocations } from "../../hooks/useLocations";
import { useTripSearch } from "../../hooks/useTripSearch";
import styles from "./styleTripSearch";

import LoadingState from "./LoadingState";
import SelectionCard from "./SelectionCard";
import StationSelector from "./StationSelector";
import TripsResultSection from "./TripsResultSection";

const TripSearch = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [storedDate, setStoredDate] = useState("");
  const [departure, setDeparture] = useState(null);
  const [arrival, setArrival] = useState(null);
  const [showStationModal, setShowStationModal] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [searchParams, setSearchParams] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [showNoTripMessage, setShowNoTripMessage] = useState(false);

  // 📍 Fetch locations
  const {
    data: cities = [],
    isLoading: isLoadingLocations,
    isError: isErrorLocations,
  } = useLocations();

  // 🚍 Trip search
  const {
    data: trips = [],
    isFetching: isSearching,
    error: searchError,
  } = useTripSearch(searchParams, !!searchParams);

  // Group cities into { cityName: [areas] }
  const groupedData = useMemo(() => {
    return cities.reduce((acc, city) => {
      acc[city.name] = city.areas;
      return acc;
    }, {});
  }, [cities]);

  const formatDateForStorage = (date) => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());
    return `${day}/${month}/${year}`;
  };

  const findAreaById = (areaId) => {
    for (const city of cities) {
      const area = city.areas.find((a) => a.id === Number(areaId));
      if (area) return { cityId: city.id, area };
    }
    return null;
  };

  const handleSearch = () => {
    if (!departure || !arrival) {
      Alert.alert("Error", "Please select both departure and arrival stations");
      return;
    }

    const startArea = findAreaById(departure.areaId);
    const destinationArea = findAreaById(arrival.areaId);
    const formattedDate = selectedDate.toISOString().split("T")[0];

    const params = {
      start_city: startArea?.cityId || "",
      start_area: departure.areaId || "",
      destination_city: destinationArea?.cityId || "",
      destination_area: arrival.areaId || "",
      departure_date: formattedDate,
      round_trip: false,
    };

    setSearchParams(params);
    setSearchPerformed(true);
  };

  const onDateChange = (_, date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (date) {
      setSelectedDate(date);
      setStoredDate(formatDateForStorage(date));
    }
  };

  const getStationDisplayText = (station) =>
    station ? `${station.city} - ${station.area}` : "Select Station";

  const handleStationSelect = (type, city, area) => {
    const stationObj = {
      city,
      area: area.name,
      areaId: area.id,
    };
    type === "departure" ? setDeparture(stationObj) : setArrival(stationObj);
  };

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    return timeString;
  };

  const formatPrice = (price) => {
    if (!price) return "N/A";
    return `${price} EGP`;
  };

  const getAvailabilityColor = (seats) => {
    if (seats > 10) return "#10b981"; // green
    if (seats > 5) return "#f59e0b"; // yellow
    return "#ef4444"; // red
  };

  useEffect(() => {
    let timout;
    if (searchPerformed && !isSearching && trips.length === 0) {
      timout = setTimeout(() => setShowNoTripMessage(true), 800);
    } else {
      setShowNoTripMessage(false);
    }
    return () => clearTimeout(timout);
  }, [searchPerformed, isSearching, trips]);

  if (isLoadingLocations) {
    return <LoadingState message="Loading stations..." />;
  }

  if (isErrorLocations) {
    return (
      <LoadingState message="Error loading stations" icon="alert-circle" />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Trip Search</Text>
          <Text style={styles.headerSubtitle}>Find your perfect journey</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.arabicTitleContainer}>
            <Text style={styles.arabicTitle}>رايح على فين النهاردة؟</Text>
          </View>

          <View style={styles.formContainer}>
            <SelectionCard
              subtitle="From"
              title={getStationDisplayText(departure)}
              icon="location"
              onPress={() => setShowStationModal("departure")}
            />

            <SelectionCard
              subtitle="To"
              title={getStationDisplayText(arrival)}
              icon="location"
              onPress={() => setShowStationModal("arrival")}
            />

            <SelectionCard
              subtitle="Travel Date"
              title={selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
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

            <TouchableOpacity
              style={styles.searchButton}
              activeOpacity={0.9}
              onPress={handleSearch}
              disabled={isSearching}
            >
              {isSearching ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <>
                  <Ionicons
                    name="search"
                    size={20}
                    color="white"
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.searchButtonText}>Search</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Error */}
          {searchError && searchPerformed && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>
                Error fetching trips. Please try again.
              </Text>
            </View>
          )}

          {/* Enhanced Trips Section */}
          <TripsResultSection
            trips={trips}
            showNoTripMessage={showNoTripMessage}
            searchPerformed={searchPerformed}
            formatPrice={formatPrice}
          />

          <StationSelector
            visible={showStationModal === "departure"}
            onClose={() => setShowStationModal(null)}
            onSelect={(city, area) =>
              handleStationSelect("departure", city, area)
            }
            title="Select Departure Station"
            groupedData={groupedData}
          />

          <StationSelector
            visible={showStationModal === "arrival"}
            onClose={() => setShowStationModal(null)}
            onSelect={(city, area) =>
              handleStationSelect("arrival", city, area)
            }
            title="Select Arrival Station"
            groupedData={groupedData}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TripSearch;
