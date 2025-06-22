import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { locationsyApi, tripSearchApi } from "../api/booking";
import styles from "./styleTripSearch";

const { width } = Dimensions.get("window");
const STATION_CARD_WIDTH = (width - 60) / 2 - 8;

const StationSelector = ({
  visible,
  onClose,
  onSelect,
  title,
  groupedData,
}) => {
  const [expandedCity, setExpandedCity] = useState(null);

  const toggleCity = (index) =>
    setExpandedCity(expandedCity === index ? null : index);

  const handleSelect = (city, area) => {
    onSelect(city, area);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={false}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={25} color="#EF4444" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>{title}</Text>
          <View style={{ width: 40 }} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {Object.entries(groupedData).map(([city, areas], index) => (
            <View key={city}>
              <TouchableOpacity
                style={styles.cityHeader}
                onPress={() => toggleCity(index)}
              >
                <View style={styles.cityInfo}>
                  <Ionicons name="business" size={25} color="#3b82f6" />
                  <Text style={styles.cityName}>{city}</Text>
                </View>
                <View style={styles.cityMeta}>
                  <Text style={styles.stationCount}>
                    {areas.length} stations
                  </Text>
                  <Ionicons
                    name={
                      expandedCity === index ? "chevron-up" : "chevron-down"
                    }
                    size={20}
                    color="#6b7280"
                  />
                </View>
              </TouchableOpacity>
              {expandedCity === index && (
                <View style={styles.stationsGrid}>
                  {areas.map((area) => (
                    <TouchableOpacity
                      key={area.id}
                      style={[
                        styles.stationCard,
                        { width: STATION_CARD_WIDTH },
                      ]}
                      onPress={() => handleSelect(city, area)}
                    >
                      <Ionicons name="train" size={24} color="#6b7280" />
                      <Text style={styles.stationName}>{area.name}</Text>
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

const SelectionCard = ({ title, subtitle, onPress, icon }) => (
  <TouchableOpacity onPress={onPress} style={styles.selectionCard}>
    <Ionicons name={icon} size={25} color="#374151" />
    <View style={styles.selectionText}>
      <Text style={styles.selectionSubtitle}>{subtitle}</Text>
      <Text style={styles.selectionTitle}>{title}</Text>
    </View>
    <Ionicons name="chevron-forward" size={25} color="#3b82f6" />
  </TouchableOpacity>
);

const TripCard = ({ trip }) => (
  <View style={styles.tripCard}>
    <View style={styles.tripRoute}>
      <View style={styles.routePoint}>
        <View style={[styles.routeDot, { backgroundColor: "#3b82f6" }]} />
        <Text style={styles.locationText}>{trip.start_location}</Text>
      </View>
      <View style={styles.routeLine} />
      <View style={styles.routePoint}>
        <View style={[styles.routeDot, { backgroundColor: "#8b5cf6" }]} />
        <Text style={styles.locationText}>{trip.destination}</Text>
      </View>
    </View>
    <View style={styles.tripDetails}>
      <Text style={styles.detailLabel}>
        {new Date(trip.departure_date).toLocaleString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
      <Text style={styles.detailValue}>{trip.bus_type}</Text>
      <View style={styles.tripFooter}>
        <Text style={styles.priceText}>{trip.price} EGP</Text>
        <Text style={styles.seatsText}>{trip.available_seats} seats</Text>
      </View>
      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const TripSearch = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [stations, setStations] = useState({ departure: null, arrival: null });
  const [trips, setTrips] = useState([]);
  const [cities, setCities] = useState({});
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    locationsyApi()
      .then(({ data }) => {
        setCities(
          data.cities.reduce(
            (acc, city) => ({ ...acc, [city.name]: city.areas }),
            {}
          )
        );
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load stations");
        setLoading(false);
      });
  }, []);

  const findAreaById = (areaId) => {
    for (const city of Object.keys(cities)) {
      const area = cities[city].find((a) => a.id === areaId);
      if (area) return { city, area };
    }
    return null;
  };

  const handleSearch = async () => {
    if (!stations.departure || !stations.arrival) {
      Alert.alert("Error", "Select both departure and arrival stations");
      return;
    }

    setSearching(true);
    setError(null);

    const start = findAreaById(stations.departure.areaId);
    const dest = findAreaById(stations.arrival.areaId);

    try {
      const { data } = await tripSearchApi({
        start_city: start.city,
        start_area: stations.departure.areaId,
        destination_city: dest.city,
        destination_area: stations.arrival.areaId,
        departure_date: date.toISOString().split("T")[0],
        round_trip: false,
      });
      setTrips(data || []);
    } catch {
      setError("Failed to fetch trips");
      setTrips([]);
      Alert.alert("Error", "Failed to fetch trips");
    } finally {
      setSearching(false);
    }
  };

  const handleStationSelect = (type, city, area) => {
    setStations((prev) => ({
      ...prev,
      [type]: { city, area: area.name, areaId: area.id },
    }));
    setModalType(null);
  };

  const formatDate = (d) =>
    d.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

  const getStationText = (station) =>
    station ? `${station.city} - ${station.area}` : "Select Station";

  if (loading)
    return <Text style={styles.loadingText}>Loading stations...</Text>;
  if (error && !Object.keys(cities).length)
    return <Text style={styles.errorText}>Error loading stations</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Trip Search</Text>
          <Text style={styles.arabicTitle}>رايح على فين النهاردة؟</Text>
        </View>
        <View style={styles.formContainer}>
          <SelectionCard
            subtitle="From"
            title={getStationText(stations.departure)}
            icon="location"
            onPress={() => setModalType("departure")}
          />
          <SelectionCard
            subtitle="To"
            title={getStationText(stations.arrival)}
            icon="location"
            onPress={() => setModalType("arrival")}
          />
          <SelectionCard
            subtitle="Date"
            title={formatDate(date)}
            icon="calendar-outline"
            onPress={() => setShowDatePicker(true)}
          />
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(_, d) => {
                setShowDatePicker(Platform.OS === "ios");
                if (d) setDate(d);
              }}
              minimumDate={new Date()}
            />
          )}
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearch}
            disabled={searching}
          >
            {searching ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.searchButtonText}>Search</Text>
            )}
          </TouchableOpacity>
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
        {trips.length ? (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>Available Trips</Text>
            {trips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </View>
        ) : (
          trips.length === 0 &&
          !searching && (
            <Text style={styles.noResultsTitle}>No trips found</Text>
          )
        )}
        <StationSelector
          visible={modalType === "departure"}
          onClose={() => setModalType(null)}
          onSelect={(city, area) =>
            handleStationSelect("departure", city, area)
          }
          title="Select Departure Station"
          groupedData={cities}
        />
        <StationSelector
          visible={modalType === "arrival"}
          onClose={() => setModalType(null)}
          onSelect={(city, area) => handleStationSelect("arrival", city, area)}
          title="Select Arrival Station"
          groupedData={cities}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TripSearch;
