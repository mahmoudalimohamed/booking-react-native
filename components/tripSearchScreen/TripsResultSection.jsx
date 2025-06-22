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

      // Get date components
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear().toString().slice(-2);

      // Get time components
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";

      // Convert to 12-hour format
      hours = hours % 12;
      hours = hours ? hours : 12; // 0 should be 12
      const formattedHours = hours.toString().padStart(2, "0");

      return `${day}/${month}/${year} ${formattedHours}:${minutes} ${ampm}`;
    } catch (error) {
      return dateString; // Return original if parsing fails
    }
  };

  if (!searchPerformed) return null;

  return (
    <View style={styles.cardContainer}>
      {/* Header Section */}
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Available Trips</Text>
        {trips.length > 0 && (
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        )}
      </View>
      {trips.length > 0 ? (
        <View style={styles.tripCardsList}>
          {trips.map((trip, index) => {
            return (
              <TouchableOpacity
                key={trip.id}
                style={styles.featuredTripCard}
                activeOpacity={0.8}
              >
                {/* Trip Route */}
                <Text style={styles.tripRoute}>
                  {trip.start_location}
                  {"\n"}
                  {trip.destination}
                </Text>

                {/* Trip Details Row */}
                <View style={styles.tripDetailsRow}>
                  <View style={styles.detailItem}>
                    <View style={styles.detailIcon}>
                      <Ionicons
                        name="calendar-outline"
                        size={16}
                        color="white"
                      />
                    </View>
                    <Text style={styles.detailText}>
                      {formatDateTime(trip.departure_date)}
                    </Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Ionicons name="star" size={14} color="#FCD34D" />
                    <Text style={styles.detailText}>
                      {trip.bus_type || "Standard"}
                    </Text>
                  </View>
                </View>

                {/* Bottom Section */}
                <View style={styles.tripMetrics}>
                  <View style={styles.metricItem}>
                    <Ionicons name="people-outline" size={14} color="#E0E7FF" />
                    <Text style={styles.metricText}>
                      {trip.available_seats || 0} seats
                    </Text>
                  </View>
                </View>
                <View style={styles.priceActionContainer}>
                  <Text style={styles.tripPrice}>
                    {formatPrice(trip.price)}
                  </Text>
                  <View style={{ padding: 20 }} />
                  <TouchableOpacity style={styles.continueButton}>
                    <Text style={styles.continueButtonText}>Book Now</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : showNoTripMessage ? (
        <View style={styles.noTripsCard}>
          <View style={styles.noTripsIcon}>
            <Ionicons name="search-outline" size={32} color="white" />
          </View>
          <Text style={styles.noTripsTitle}>No Trips Found</Text>
          <Text style={styles.noTripsSubtitle}>
            Try adjusting your search criteria
          </Text>
          <TouchableOpacity style={styles.retryButton}>
            <Text style={styles.retryButtonText}>Search Again</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default TripsResultSection;
