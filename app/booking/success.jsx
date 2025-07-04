import { router, useLocalSearchParams } from "expo-router";

import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { bookingDetailApi } from "../../api/bookingApi";

const BookingSuccess = () => {
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState(null);
  const [error, setError] = useState(null);

  // Get parameters from navigation
  const { orderId, success, bookingData: passedBookingData } = useLocalSearchParams();

  // Format date for display
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

  const fetchBookingDetails = async () => {
    if (!orderId || orderId === "unknown") {
      setError("No order ID provided");
      setLoading(false);
      return;
    }

    try {
      const response = await bookingDetailApi(orderId);
      setBookingData(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching booking details:", err);
      console.error("Error response:", err.response?.data);
      console.error("Error status:", err.response?.status);
      
      // If it's a 404, try again with shorter delays
      if (err.response?.status === 404) {
        const retryWithDelay = async (attempt = 1, maxAttempts = 2) => {
          const delay = attempt * 1000; // 1s, 2s (much faster)
          
          setTimeout(async () => {
            try {
              const retryResponse = await bookingDetailApi(orderId);
              setBookingData(retryResponse.data);
              setLoading(false);
            } catch (retryErr) {
              console.error(`Retry attempt ${attempt} failed:`, retryErr);
              
              if (attempt < maxAttempts) {
                retryWithDelay(attempt + 1, maxAttempts);
              } else {
                // If all attempts fail, show error but keep the success state
                setError("Booking details temporarily unavailable");
                setLoading(false);
              }
            }
          }, delay);
        };
        
        retryWithDelay();
      } else {
        setError("Failed to load booking details");
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    // If we have booking data passed from TripBookingScreen, use it
    if (passedBookingData) {
      try {
        const parsedBookingData = JSON.parse(passedBookingData);
        setBookingData(parsedBookingData);
        setLoading(false);
        return;
      } catch (err) {
        console.error("Error parsing passed booking data:", err);
        // Fall back to API call if parsing fails
      }
    }
    
    // Only fetch from API if we don't have passed data
    fetchBookingDetails();
  }, [orderId, passedBookingData]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#A62C2C" />
        <Text style={styles.loadingText}>Loading booking details...</Text>
      </View>
    );
  }

  // Show success message even if booking details can't be fetched
  if (!success || !orderId || orderId === "unknown") {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorText}>
            "Payment was not successful. Please try again."
          </Text>
        </View>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => router.replace("/(tabs)")}
        >
          <Text style={styles.buttonText}>Return to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // If there's an error but we have a valid orderId and no booking data, show limited info
  if (error && orderId && orderId !== "unknown" && !bookingData) {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Success Message */}
        <View style={styles.successContainer}>
          <Text style={styles.successIcon}>✅</Text>
          <Text style={styles.successText}>
            Payment successful! Your booking has been confirmed.
          </Text>
        </View>

        {/* Limited Ticket Info */}
        <View style={styles.ticketContainer}>
          <View style={styles.ticketHeader}>
            <View style={styles.headerLeft}>
              <Text style={styles.headerTitle}>BOOKING CONFIRMED</Text>
            </View>
            <View style={styles.headerRight}>
              <Text style={styles.headerSubtitle}>ORDER ID</Text>
              <Text style={styles.headerStatus}>{orderId}</Text>
            </View>
          </View>

          <View style={styles.ticketInfo}>
            <View style={styles.infoRow}>
              <View style={styles.infoColumn}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Order ID</Text>
                  <Text style={styles.infoValue}>{orderId}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Status</Text>
                  <Text style={styles.infoValue}>Confirmed</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.separator} />

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              <Text style={styles.footerLabel}>Note: </Text>
              Your booking details will be available shortly. You can check your booking history for complete details.
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => {
              setLoading(true);
              setError(null);
              fetchBookingDetails();
            }}
          >
            <Text style={styles.primaryButtonText}>🔄 Refresh Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.replace("/(tabs)")}
          >
            <Text style={styles.secondaryButtonText}>Return to Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  const booking = bookingData;
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Success Message */}
      <View style={styles.successContainer}>
        <Text style={styles.successIcon}>✅</Text>
        <Text style={styles.successText}>
          Payment successful {"\n"}Please Review Your Email For Your Ticket.
        </Text>
      </View>

      {/* Ticket Container */}
      <View style={styles.ticketContainer}>
        {/* Ticket Header */}
        <View style={styles.ticketHeader}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>BUS BOOKING</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.headerSubtitle}>BOARDING PASS</Text>
            <Text style={styles.headerStatus}>{booking?.payment_status}</Text>
          </View>
        </View>

        {/* Journey Route */}
        <View style={styles.journeyContainer}>
          <Text style={styles.journeyLocation}>
            {booking?.trip.start_location}
          </Text>
          <Text style={styles.journeyArrow}>→</Text>
          <Text style={styles.journeyLocation}>
            {booking?.trip.destination}
          </Text>
        </View>

        {/* Ticket Information */}
        <View style={styles.ticketInfo}>
          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Passenger Name</Text>
                <Text style={styles.infoValue}>
                  {booking?.customer_name || "Current User"}
                </Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Phone</Text>
                <Text style={styles.infoValue}>
                  {booking?.customer_phone || "Profile Phone"}
                </Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Departure</Text>
                <Text style={styles.infoValue}>
                  {booking?.trip.departure_date &&
                    formatDate(booking.trip.departure_date)}
                </Text>
              </View>
            </View>

            <View style={styles.infoColumn}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Bus Type</Text>
                <Text style={styles.infoValue}>{booking?.trip.bus_type}</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Seat Numbers</Text>
                <Text style={styles.infoValue}>
                  {booking?.selected_seats.join(", ")}
                </Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Total Amount</Text>
                <Text style={styles.infoValueBold}>
                  {booking?.total_price} EGP
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Dotted Separator */}
        <View style={styles.separator} />

        {/* Footer Information */}
        <View style={styles.footer}>
          <View style={styles.footerRow}>
            <View style={styles.footerColumn}>
              <Text style={styles.footerText}>
                <Text style={styles.footerLabel}>Payment Ref: </Text>
                {booking?.payment_reference || "N/A"}
              </Text>
              <Text style={styles.footerText}>
                <Text style={styles.footerLabel}>Payment Type: </Text>
                {booking?.payment_type || "N/A"}
              </Text>
            </View>
            <View style={styles.footerColumn}>
              <Text style={styles.footerText}>
                <Text style={styles.footerLabel}>Payment Date: </Text>
                {booking?.booking_date && formatDate(booking.booking_date)}
              </Text>
              <Text style={styles.footerText}>
                <Text style={styles.footerLabel}>Issued: </Text>
                {new Date().toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.replace("/(tabs)")}
        >
          <Text style={styles.secondaryButtonText}>Return to Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#6B7280",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  errorContainer: {
    backgroundColor: "#FEF3C7",
    borderLeftWidth: 4,
    borderLeftColor: "#F59E0B",
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    alignItems: "center",
  },
  errorIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  errorText: {
    color: "#92400E",
    fontSize: 16,
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  successContainer: {
    backgroundColor: "#ECFDF5",
    borderLeftWidth: 4,
    borderLeftColor: "#10B981",
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  successIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  successText: {
    color: "#065F46",
    fontSize: 14,
    flex: 1,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  ticketContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  ticketHeader: {
    backgroundColor: "#A62C2C",
    padding: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  headerRight: {
    alignItems: "flex-end",
  },
  headerSubtitle: {
    color: "#FFFFFF",
    fontSize: 12,
    opacity: 0.8,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  headerStatus: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  journeyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 24,
    marginBottom: 24,
  },
  journeyLocation: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  journeyArrow: {
    fontSize: 20,
    color: "#9CA3AF",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  ticketInfo: {
    paddingHorizontal: 24,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoColumn: {
    flex: 1,
    paddingRight: 12,
  },
  infoItem: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  infoValue: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "500",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  infoValueBold: {
    fontSize: 18,
    color: "#111827",
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  separator: {
    height: 1,
    backgroundColor: "#D1D5DB",
    marginHorizontal: 24,
    marginVertical: 24,
    borderStyle: "dashed",
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerColumn: {
    flex: 1,
    paddingRight: 12,
  },
  footerText: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  footerLabel: {
    fontWeight: "500",
    color: "#374151",
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 32,
  },
  primaryButton: {
    backgroundColor: "#A62C2C",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  secondaryButton: {
    backgroundColor: "#E5E7EB",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  secondaryButtonText: {
    color: "#374151",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  homeButton: {
    backgroundColor: "#A62C2C",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
});

export default BookingSuccess;
