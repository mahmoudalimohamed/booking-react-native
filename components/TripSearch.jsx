import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { locationsyApi, tripSearchApi } from "../api/booking";

const TripSearch = () => {
  const [formData, setFormData] = useState({
    start_area: "",
    destination_area: "",
    departure_date: "",
    round_trip: false,
  });
  const [trips, setTrips] = useState([]);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const navigation = useNavigation();

  // Fetch cities and areas on mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await locationsyApi();
        setCities(response.data.cities || []);
        setError(null);
      } catch (err) {
        setError("Error fetching locations. Please try again.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLocations();
  }, []);

  // Handle form input changes
  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setSearchPerformed(false);
  };

  // Format date to YYYY-MM-DD format (same as HTML date input)
  const formatDateForAPI = (dateString) => {
    if (!dateString) return "";

    // If it's already in YYYY-MM-DD format, return as is
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString;
    }

    // If it's a different format, convert to YYYY-MM-DD
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // Validate date format (YYYY-MM-DD)
  const isValidDateFormat = (dateString) => {
    return /^\d{4}-\d{2}-\d{2}$/.test(dateString);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (
      !formData.start_area ||
      !formData.destination_area ||
      !formData.departure_date
    ) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    // Validate date format
    if (!isValidDateFormat(formData.departure_date)) {
      Alert.alert("Error", "Please enter date in YYYY-MM-DD format");
      return;
    }

    setSearchPerformed(false);

    // Extract city and area IDs from the selected area
    const startArea = formData.start_area
      ? findAreaById(formData.start_area)
      : null;
    const destinationArea = formData.destination_area
      ? findAreaById(formData.destination_area)
      : null;

    // Ensure date is in the correct format (YYYY-MM-DD) - same as web version
    const formattedDate = formatDateForAPI(formData.departure_date);

    const params = {
      start_city: startArea ? startArea.cityId : "",
      start_area: formData.start_area,
      destination_city: destinationArea ? destinationArea.cityId : "",
      destination_area: formData.destination_area,
      departure_date: formattedDate, // Send in YYYY-MM-DD format
      round_trip: formData.round_trip,
    };

    try {
      const response = await tripSearchApi(params);
      setTrips(response.data || []);
      setError(null);
      setSearchPerformed(true);
    } catch (err) {
      setError("Error fetching trips. Please try again.");
      setTrips([]);
      setSearchPerformed(true);
      console.error(err);
    }
  };

  // Navigate to booking page
  const handleTripSelect = (trip) => {
    navigation.navigate("TripBooking", { trip });
  };

  // Helper to find area and its city by area ID
  const findAreaById = (areaId) => {
    for (const city of cities) {
      const area = city.areas.find((a) => a.id === parseInt(areaId));
      if (area) {
        return { cityId: city.id, area };
      }
    }
    return null;
  };

  // Format date for display (same as web version)
  const formatDate = (dateString) => {
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Create picker items for locations
  const createPickerItems = () => {
    const items = [{ label: "Select Station", value: "" }];
    cities.forEach((city) => {
      city.areas.forEach((area) => {
        items.push({
          label: `${area.name} (${city.name})`,
          value: area.id.toString(),
        });
      });
    });
    return items;
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#A62C2C" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.overlay}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Search Form */}
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Search Bus Trips</Text>

              {/* From Location */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  <Text style={styles.required}>* </Text>From
                </Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={formData.start_area}
                    onValueChange={(value) => handleChange("start_area", value)}
                    style={styles.picker}
                  >
                    {createPickerItems().map((item, index) => (
                      <Picker.Item
                        key={index}
                        label={item.label}
                        value={item.value}
                      />
                    ))}
                  </Picker>
                </View>
              </View>

              {/* To Location */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  <Text style={styles.required}>* </Text>To
                </Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={formData.destination_area}
                    onValueChange={(value) =>
                      handleChange("destination_area", value)
                    }
                    style={styles.picker}
                  >
                    {createPickerItems().map((item, index) => (
                      <Picker.Item
                        key={index}
                        label={item.label}
                        value={item.value}
                      />
                    ))}
                  </Picker>
                </View>
              </View>

              {/* Date Input - Ensures YYYY-MM-DD format */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  <Text style={styles.required}>* </Text>Date
                </Text>
                <TextInput
                  style={styles.dateInput}
                  placeholder="YYYY-MM-DD"
                  value={formData.departure_date}
                  onChangeText={(value) =>
                    handleChange("departure_date", value)
                  }
                  maxLength={10}
                  keyboardType="numeric"
                />
                <Text style={styles.dateHint}>
                  Format: YYYY-MM-DD (e.g., 2024-12-25)
                </Text>
              </View>

              {/* Search Button */}
              <TouchableOpacity
                style={styles.searchButton}
                onPress={handleSubmit}
              >
                <Text style={styles.searchButtonText}>Search</Text>
              </TouchableOpacity>
            </View>

            {/* Error Message */}
            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            {/* Search Results */}
            {searchPerformed && (
              <View style={styles.resultsContainer}>
                <View style={styles.resultsHeader}>
                  <Text style={styles.resultsTitle}>Available Trips</Text>
                  <View style={styles.newResultsBadge}>
                    <Text style={styles.newResultsText}>New Results</Text>
                  </View>
                </View>

                {trips.length > 0 ? (
                  <View style={styles.tripsList}>
                    {trips.map((trip) => (
                      <View key={trip.id} style={styles.tripCard}>
                        <View style={styles.tripRoute}>
                          <View style={styles.routePoint}>
                            <View
                              style={[
                                styles.routeDot,
                                { backgroundColor: "#6366F1" },
                              ]}
                            />
                            <Text style={styles.locationText}>
                              {trip.start_location}
                            </Text>
                          </View>
                          <View style={styles.routeLine} />
                          <View style={styles.routePoint}>
                            <View
                              style={[
                                styles.routeDot,
                                { backgroundColor: "#8B5CF6" },
                              ]}
                            />
                            <Text style={styles.locationText}>
                              {trip.destination}
                            </Text>
                          </View>
                        </View>

                        <View style={styles.tripDetails}>
                          <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>
                              Departure Date
                            </Text>
                            <Text style={styles.detailValue}>
                              {formatDate(trip.departure_date)}
                            </Text>
                          </View>

                          <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>Bus Type</Text>
                            <Text style={styles.detailValue}>
                              {trip.bus_type}
                            </Text>
                          </View>

                          <View style={styles.tripFooter}>
                            <View style={styles.priceContainer}>
                              <Text style={styles.priceText}>
                                {trip.price} EGP
                              </Text>
                            </View>
                            <Text style={styles.seatsText}>
                              {trip.available_seats} seats available
                            </Text>
                          </View>

                          <TouchableOpacity
                            style={styles.bookButton}
                            onPress={() => handleTripSelect(trip)}
                          >
                            <Text style={styles.bookButtonText}>Book Now</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}
                  </View>
                ) : (
                  <View style={styles.noResultsContainer}>
                    <Text style={styles.noResultsTitle}>
                      No trips available for your search.
                    </Text>
                    <Text style={styles.noResultsSubtitle}>
                      Please try changing your locations or date.
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingTop: 60,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#6B7280",
  },
  formContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#A62C2C",
    marginBottom: 20,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#A62C2C",
    marginBottom: 8,
  },
  required: {
    color: "#EF4444",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    backgroundColor: "white",
  },
  picker: {
    height: 50,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "white",
  },
  dateHint: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
    fontStyle: "italic",
  },
  searchButton: {
    backgroundColor: "#A62C2C",
    borderRadius: 25,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  searchButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  errorContainer: {
    backgroundColor: "#FEF2F2",
    borderLeftWidth: 4,
    borderLeftColor: "#F87171",
    padding: 16,
    marginBottom: 20,
    borderRadius: 8,
  },
  errorText: {
    color: "#B91C1C",
    fontSize: 14,
  },
  resultsContainer: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 20,
  },
  resultsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#A62C2C",
    flex: 1,
  },
  newResultsBadge: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  newResultsText: {
    color: "#166534",
    fontSize: 12,
    fontWeight: "500",
  },
  tripsList: {
    gap: 16,
  },
  tripCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tripRoute: {
    marginBottom: 16,
  },
  routePoint: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  routeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  routeLine: {
    width: 2,
    height: 16,
    backgroundColor: "#D1D5DB",
    marginLeft: 3,
    marginBottom: 8,
  },
  locationText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
  },
  tripDetails: {
    gap: 12,
  },
  detailItem: {
    gap: 4,
  },
  detailLabel: {
    fontSize: 12,
    color: "#A62C2C",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
  },
  tripFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  priceContainer: {
    backgroundColor: "#A62C2C",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  priceText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  seatsText: {
    color: "#A62C2C",
    fontSize: 12,
  },
  bookButton: {
    backgroundColor: "#A62C2C",
    borderRadius: 20,
    padding: 12,
    alignItems: "center",
    marginTop: 12,
  },
  bookButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  noResultsContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  noResultsTitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 8,
  },
  noResultsSubtitle: {
    fontSize: 14,
    color: "#9CA3AF",
  },
});

export default TripSearch;
