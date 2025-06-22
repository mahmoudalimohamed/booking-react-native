import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styleTripResultSection";

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
            return (
              <TouchableOpacity
                key={trip.id}
                style={styles.featuredTripCard}
                activeOpacity={0.95}
              >
                {/* Header with gradient background */}
                <View style={styles.tripCardHeader}>
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

                  <View style={styles.statusBadge}>
                    <Text style={styles.statusBadgeText}>
                      {trip.bus_type || "Standard"}
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
                  <View style={styles.tripMetrics}>
                    <Ionicons name="people-outline" size={18} color="#059669" />
                    <Text style={styles.metricText}>
                      {trip.available_seats || 0} Available Seats
                    </Text>
                  </View>

                  {/* Price and Action */}
                  <View style={styles.priceActionContainer}>
                    <View style={styles.priceContainer}>
                      <Text style={styles.priceLabel}>Total Price</Text>
                      <Text style={styles.tripPrice}>
                        {formatPrice(trip.price)}
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={styles.continueButton}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.continueButtonText}>Book Now</Text>
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
          <TouchableOpacity style={styles.retryButton} activeOpacity={0.8}>
            <Text style={styles.retryButtonText}>Search Again</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default TripsResultSection;
