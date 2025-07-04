import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TripsResultSection = ({
  trips,
  showNoTripMessage,
  searchPerformed,
  formatPrice,
}) => {
  // format date to dd/mm/yy hh:mm (12-hour format)
  const formatDateTime = (dateString) => {
    try {
      const date = new Date(dateString);
      return date
        .toLocaleString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
        .replace(",", "");
    } catch (error) {
      return dateString;
    }
  };

  // Check if trip has available seats
  const hasAvailableSeats = (trip) => {
    return trip.available_seats && trip.available_seats > 0;
  };

  // Handle booking attempt
  const handleBookingPress = (trip) => {
    if (!hasAvailableSeats(trip)) {
      Alert.alert(
        "No Seats Available",
        "Sorry, this trip is fully booked. Please select another trip or try different dates.",
        [{ text: "OK", style: "default" }]
      );
      return;
    }

    router.push({
      pathname: "/booking/trip-booking",
      params: {
        tripId: trip.id,
        trip: JSON.stringify(trip),
      },
    });
  };

  if (!searchPerformed) return null;

  return (
    <View style={styles.cardContainer}>
      {/* Header Section */}
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Available Trips</Text>
      </View>

      {trips.length > 0 ? (
        <View style={styles.tripCardsList}>
          {trips.map((trip, index) => {
            const isAvailable = hasAvailableSeats(trip);

            return (
              <TouchableOpacity
                key={trip.id}
                style={[
                  styles.featuredTripCard,
                  !isAvailable && styles.unavailableTripCard,
                ]}
                activeOpacity={0.95}
                disabled={!isAvailable}
              >
                {/* Header with gradient background */}
                <View
                  style={[
                    styles.tripCardHeader,
                    !isAvailable && styles.unavailableTripHeader,
                  ]}
                >
                  <View style={styles.routeContainer}>
                    <Text style={styles.routeFromText}>
                      {trip.start_location}
                    </Text>
                    <View style={styles.routeArrow}>
                      <Ionicons
                        name="arrow-down"
                        size={16}
                        color="rgba(255,255,255,0.8)"
                      />
                    </View>
                    <Text style={styles.routeToText}>{trip.destination}</Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      !isAvailable && styles.unavailableStatusBadge,
                    ]}
                  >
                    <Text style={styles.statusBadgeText}>
                      {!isAvailable
                        ? "FULLY BOOKED"
                        : trip.bus_type || "Standard"}
                    </Text>
                  </View>
                </View>

                {/* Card Content */}
                <View style={styles.cardContent}>
                  {/* Trip Details */}
                  <View style={styles.detailItem}>
                    <Ionicons
                      name="calendar-outline"
                      size={18}
                      color="#4f46e5"
                    />
                    <Text style={styles.detailText}>
                      {formatDateTime(trip.departure_date)}
                    </Text>
                  </View>

                  {/* Available Seats */}
                  <View
                    style={[
                      styles.tripMetrics,
                      !isAvailable && styles.unavailableMetrics,
                    ]}
                  >
                    <Ionicons
                      name="people-outline"
                      size={18}
                      color={isAvailable ? "#059669" : "#ef4444"}
                    />
                    <Text
                      style={[
                        styles.metricText,
                        !isAvailable && styles.unavailableMetricText,
                      ]}
                    >
                      {isAvailable
                        ? `${trip.available_seats} Available Seats`
                        : "No Seats Available"}
                    </Text>
                  </View>

                  {/* Price and Action */}
                  <View style={styles.priceActionContainer}>
                    <View style={styles.priceContainer}>
                      <Text style={styles.priceLabel}>Total Price</Text>
                      <Text
                        style={[
                          styles.tripPrice,
                          !isAvailable && styles.unavailablePrice,
                        ]}
                      >
                        {formatPrice(trip.price)}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={[
                        styles.continueButton,
                        !isAvailable && styles.unavailableButton,
                      ]}
                      onPress={() => handleBookingPress(trip)}
                      activeOpacity={isAvailable ? 0.8 : 1}
                      disabled={!isAvailable}
                    >
                      <Text
                        style={[
                          styles.continueButtonText,
                          !isAvailable && styles.unavailableButtonText,
                        ]}
                      >
                        {isAvailable ? "Book Now" : "Fully Booked"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : showNoTripMessage ? (
        <View style={styles.noTripsCard}>
          <View style={styles.noTripsIcon}>
            <Ionicons name="search-outline" size={32} color="#9ca3af" />
          </View>
          <Text style={styles.noTripsTitle}>No Trips Found</Text>
          <Text style={styles.noTripsSubtitle}>
            We couldn't find any trips matching your search criteria. Try
            adjusting your dates or destinations.
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default TripsResultSection;

const styles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  // Header Section
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  // Title
  cardTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a1a1a",
    letterSpacing: -0.5,
  },
  // Trips List Container
  tripCardsList: {
    gap: 16,
  },
  // Featured Trip Card - Modern card design
  featuredTripCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    overflow: "hidden",
  },
  // Unavailable trip card styling
  unavailableTripCard: {
    opacity: 0.7,
    backgroundColor: "#f9fafb",
    borderColor: "#e5e7eb",
  },
  // Gradient header section
  tripCardHeader: {
    backgroundColor: "#4f46e5",
    paddingHorizontal: 20,
    paddingVertical: 20,
    position: "relative",
  },
  // Unavailable trip header
  unavailableTripHeader: {
    backgroundColor: "#6b7280",
  },
  // Route container
  routeContainer: {
    marginBottom: 16,
  },
  // Route text styling
  routeFromText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 4,
  },
  routeToText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    opacity: 0.9,
  },
  // Route separator
  routeArrow: {
    alignSelf: "flex-start",
    marginVertical: 8,
  },
  // Status Badge
  statusBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  // Unavailable status badge
  unavailableStatusBadge: {
    backgroundColor: "rgba(239, 68, 68, 0.2)",
  },
  statusBadgeText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  // Card content section
  cardContent: {
    padding: 20,
  },
  // Detail Item
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#f8fafc",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  // Detail Text
  detailText: {
    color: "#374151",
    fontWeight: "500",
    fontSize: 15,
    marginLeft: 12,
    flex: 1,
  },
  // Trip Metrics Container
  tripMetrics: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ecfdf5",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  // Unavailable metrics styling
  unavailableMetrics: {
    backgroundColor: "#fef2f2",
  },
  // Metric Text
  metricText: {
    color: "#059669",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 12,
  },
  // Unavailable metric text
  unavailableMetricText: {
    color: "#ef4444",
  },
  // Price Action Container
  priceActionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },
  // Trip Price
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "500",
    marginBottom: 4,
  },
  tripPrice: {
    color: "#1a1a1a",
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  // Unavailable price styling
  unavailablePrice: {
    color: "#9ca3af",
  },
  // Continue Button - Modern gradient button
  continueButton: {
    backgroundColor: "#10b981",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 16,
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    minWidth: 120,
  },
  // Unavailable button styling
  unavailableButton: {
    backgroundColor: "#9ca3af",
    shadowColor: "#9ca3af",
    shadowOpacity: 0.1,
  },
  continueButtonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  // Unavailable button text
  unavailableButtonText: {
    color: "#ffffff",
    opacity: 0.8,
  },
  // No Trips Card
  noTripsCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  noTripsIcon: {
    width: 80,
    height: 80,
    backgroundColor: "#f3f4f6",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  noTripsTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 8,
    textAlign: "center",
  },
  noTripsSubtitle: {
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 24,
    fontSize: 15,
    lineHeight: 22,
  },
  retryButton: {
    backgroundColor: "#4f46e5",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: "#4f46e5",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  retryButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 15,
  },
});
