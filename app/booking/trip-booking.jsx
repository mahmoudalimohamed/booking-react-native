import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  confirmTripBookingApi,
  fetchPaymentKeyApi,
  postTripBookingApi,
  redirectToPaymentApi,
  tripBookingApi,
  userProfileApi,
} from "../../api/bookingApi";
import BusLayout from "../../components/bookingScreen/BusLayout";
import MiniBusLayout from "../../components/bookingScreen/MiniBusLayout";
import { ProtectedRoute } from "../../components/ProtectedRoute";

const TripBookingScreen = () => {
  const { tripId, trip } = useLocalSearchParams();
  let tripInfo = trip;
  try {
    tripInfo = typeof trip === "string" ? JSON.parse(trip) : trip;
  } catch (e) {
    tripInfo = null;
    console.error("Failed to parse trip param:", e);
  }
  const [availableSeats, setAvailableSeats] = useState([]);
  const [chosenSeats, setChosenSeats] = useState([]);
  const [unavailableSeats, setUnavailableSeats] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [paymentType, setPaymentType] = useState("online");
  const [tempBookingRef, setTempBookingRef] = useState(null);
  const [showProcessingOverlay, setShowProcessingOverlay] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [userType, setUserType] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [userProfile, setUserProfile] = useState(null);

  const loadUserType = useCallback(async () => {
    try {
      const { data } = await userProfileApi();
      setUserType(data.user.user_type);
      setUserProfile(data.user); // Store the full user profile
    } catch (err) {
      setErrorMessage("Failed to fetch user type.");
      console.error("User type loading error:", err);
    }
  }, []);

  const loadSeats = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await tripBookingApi(tripId);
      const allSeats = Object.keys(data.seat_status || {}).map((seatNum) => ({
        seat_number: Number.parseInt(seatNum),
        status: data.seat_status[seatNum],
      }));
      const bookedSeats = allSeats
        .filter((seat) => seat.status !== "available")
        .map((seat) => seat.seat_number);
      const sortedSeats = allSeats.sort(
        (a, b) => a.seat_number - b.seat_number
      );
      setAvailableSeats(sortedSeats);
      setUnavailableSeats(bookedSeats);
      setErrorMessage("");
    } catch (err) {
      setErrorMessage("Failed to fetch seats.");
      console.error("Seat loading error:", err);
    } finally {
      setLoading(false);
    }
  }, [tripId]);

  useEffect(() => {
    loadUserType();
    loadSeats();
  }, [loadUserType, loadSeats]);

  useEffect(() => {
    if (userType === "Admin") {
      setPaymentType("cash");
    } else if (userType === "Passenger") {
      setPaymentType("online");
    }
  }, [userType]);

  const toggleSeatSelection = (seatNumber) => {
    if (unavailableSeats.includes(seatNumber)) return;
    setChosenSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((num) => num !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const initiateBooking = async () => {
    if (chosenSeats.length === 0) {
      setErrorMessage("Please choose at least one seat.");
      return;
    }
    if (chosenSeats.length > 8) {
      setErrorMessage("Can't choose more than 8 seats.");
      return;
    }
    if (userType === "Admin" && (!customerName || !customerPhone)) {
      setErrorMessage(
        "Customer name and phone are required for admin bookings."
      );
      return;
    }

    setIsSubmitting(true);
    setIsProcessing(true);

    const bookingData = {
      seats_booked: chosenSeats.length,
      selected_seats: chosenSeats,
      payment_type: paymentType.toUpperCase(),
    };

    if (userType === "Admin") {
      bookingData.customer_name = customerName;
      bookingData.customer_phone = customerPhone;
    }

    try {
      const response = await postTripBookingApi(tripId, bookingData);
      setTempBookingRef(response.data.temp_booking_ref);
      setShowProcessingOverlay(true);
      setErrorMessage("");
    } catch (err) {
      handleBookingError(err);
    } finally {
      setIsSubmitting(false);
      setIsProcessing(false);
    }
  };

  const confirmBooking = async () => {
    if (!tempBookingRef) return;

    setIsProcessing(true);
    setIsConfirmed(true);

    try {
      const confirmationData = {
        temp_booking_ref: tempBookingRef,
      };

      if (userType === "Admin") {
        confirmationData.customer_name = customerName;
        confirmationData.customer_phone = customerPhone;
      }

      const response = await confirmTripBookingApi(
        tripId,
        tempBookingRef,
        confirmationData
      );
      const { order_id, booking, redirect_url } = response.data;
      setBookingData({ order_id, booking, redirect_url });
      setShowProcessingOverlay(false);

      if (paymentType === "online" && order_id) {
        const paymentResponse = await fetchPaymentKeyApi(order_id);
        const paymentData = paymentResponse.data;
        const paymentKey = paymentData.payment_key;
        if (!paymentKey) throw new Error("Invalid payment key received");

        // Navigate to WebView payment screen instead of external browser
        const paymentUrl = redirectToPaymentApi(paymentKey);
        
        // Create a complete booking object with trip details
        const completeBookingData = {
          ...booking,
          trip: {
            start_location: tripInfo?.start_location,
            destination: tripInfo?.destination,
            departure_date: tripInfo?.departure_date,
            bus_type: tripInfo?.bus_type,
          },
          customer_name: userType === "Admin" ? customerName : userProfile?.name,
          customer_phone: userType === "Admin" ? customerPhone : userProfile?.phone_number,
        };
        
        router.push({
          pathname: "/booking/payment",
          params: { 
            paymentUrl, 
            orderId: order_id,
            bookingData: JSON.stringify(completeBookingData) // Pass booking data for online payments
          },
        });
      } else {
        if (redirect_url) {
          // Handle redirect if needed
        } else {
          // Create a complete booking object with trip details
          const completeBookingData = {
            ...booking,
            trip: {
              start_location: tripInfo?.start_location,
              destination: tripInfo?.destination,
              departure_date: tripInfo?.departure_date,
              bus_type: tripInfo?.bus_type,
            },
            customer_name: userType === "Admin" ? customerName : userProfile?.name,
            customer_phone: userType === "Admin" ? customerPhone : userProfile?.phone_number,
          };
          
          router.replace({
            pathname: "/booking/success",
            params: { 
              orderId: order_id, 
              success: "true",
              bookingData: JSON.stringify(completeBookingData)
            },
          });
        }
      }
    } catch (err) {
      handleBookingError(err);
      setIsConfirmed(false);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancelBooking = () => {
    setShowProcessingOverlay(false);
    setTempBookingRef(null);
    setBookingData(null);
    setIsProcessing(false);
    setIsConfirmed(false);
    setErrorMessage("");
  };

  const handleBookingError = (err) => {
    if (err.response?.data?.error?.includes("Seat")) {
      setErrorMessage(err.response.data.error);
      loadSeats();
    } else {
      setErrorMessage(
        err.response?.data?.error || err.message || "Failed to process booking"
      );
      console.error("Booking error:", err);
    }
    setShowProcessingOverlay(false);
    setIsConfirmed(false);
  };

  const formatTime = (datetime) => {
    return new Date(datetime).toLocaleString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const totalCost = () => chosenSeats.length * (tripInfo?.price || 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Back to Search Button */}
        <TouchableOpacity
          style={styles.backToSearchButton}
          onPress={() => router.push("/(tabs)/search")}
        >
          <Text style={styles.backToSearchText}>← Back to Search</Text>
        </TouchableOpacity>

        {/* Trip Info Card */}
        {tripInfo && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardHeaderText}>Trip Details</Text>
            </View>
            <View style={styles.tripDetailsGrid}>
              <View style={styles.tripDetailItem}>
                <Text style={styles.tripDetailLabel}>Route</Text>
                <View style={styles.routeContainer}>
                  <View style={styles.routeItem}>
                    <View
                      style={[styles.routeDot, { backgroundColor: "#3B82F6" }]}
                    />
                    <Text style={styles.routeText}>
                      {tripInfo.start_location}
                    </Text>
                  </View>
                  <View style={styles.routeLine} />
                  <View style={styles.routeItem}>
                    <View
                      style={[styles.routeDot, { backgroundColor: "#8B5CF6" }]}
                    />
                    <Text style={styles.routeText}>{tripInfo.destination}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.tripDetailItem}>
                <Text style={styles.tripDetailLabel}>Departure</Text>
                <Text style={styles.tripDetailValue}>
                  {formatTime(tripInfo.departure_date)}
                </Text>
              </View>
              <View style={styles.tripDetailItem}>
                <Text style={styles.tripDetailLabel}>Bus Type</Text>
                <Text style={styles.tripDetailValue}>{tripInfo.bus_type}</Text>
              </View>
              <View style={styles.tripDetailItem}>
                <Text style={styles.tripDetailLabel}>Price Per Seat</Text>
                <Text style={styles.tripDetailValue}>{tripInfo.price} EGP</Text>
              </View>
            </View>
          </View>
        )}

        {/* Seat Selection */}
        <View style={styles.seatSelectionContainer}>
          {tripInfo?.bus_type === "MINI" ? (
            <MiniBusLayout
              availableSeats={availableSeats}
              chosenSeats={chosenSeats}
              unavailableSeats={unavailableSeats}
              toggleSeatSelection={toggleSeatSelection}
              loading={loading}
            />
          ) : (
            <BusLayout
              availableSeats={availableSeats}
              chosenSeats={chosenSeats}
              unavailableSeats={unavailableSeats}
              toggleSeatSelection={toggleSeatSelection}
              loading={loading}
            />
          )}
        </View>

        {/* Customer Details (Admin only) */}
        {userType === "Admin" && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardHeaderText}>Customer Details</Text>
            </View>
            <View style={styles.cardContent}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Customer Name</Text>
                <TextInput
                  style={styles.textInput}
                  value={customerName}
                  onChangeText={setCustomerName}
                  placeholder="Enter customer name"
                  editable={!isSubmitting}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Customer Phone</Text>
                <TextInput
                  style={styles.textInput}
                  value={customerPhone}
                  onChangeText={setCustomerPhone}
                  placeholder="Enter customer phone (11 digits)"
                  keyboardType="phone-pad"
                  editable={!isSubmitting}
                />
              </View>
            </View>
          </View>
        )}

        {/* Payment and Booking */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>Payment Details</Text>
          </View>
          <View style={styles.cardContent}>
            {errorMessage ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            ) : null}
            <View style={styles.paymentGrid}>
              <View style={styles.paymentItem}>
                <Text style={styles.paymentLabel}>Total Price</Text>
                <Text style={styles.totalPrice}>
                  {totalCost().toFixed(2)} EGP
                </Text>
              </View>
              <View style={styles.paymentItem}>
                <Text style={styles.paymentLabel}>Payment Method</Text>
                <Text style={styles.paymentMethod}>
                  {userType === "Admin" ? "Cash" : "Visa"}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={initiateBooking}
              disabled={isSubmitting || chosenSeats.length === 0}
              style={[
                styles.bookButton,
                (isSubmitting || chosenSeats.length === 0) &&
                  styles.bookButtonDisabled,
              ]}
            >
              <Text style={styles.bookButtonText}>
                {isSubmitting ? "Processing..." : "Book Seats"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Booking Confirmation Modal */}
      <Modal
        visible={showProcessingOverlay}
        transparent
        animationType="fade"
        onRequestClose={handleCancelBooking}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>Confirm Your Booking</Text>
            </View>
            <ScrollView style={styles.modalContent}>
              <View style={styles.warningContainer}>
                <Text style={styles.warningText}>
                  IMPORTANT: Please verify all details carefully. Once
                  confirmed, booking cannot be refunded or changed.
                </Text>
              </View>

              <View style={styles.confirmationDetails}>
                <Text style={styles.sectionTitle}>Trip Details</Text>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>From</Text>
                  <Text style={styles.detailValue}>
                    {tripInfo?.start_location}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>To</Text>
                  <Text style={styles.detailValue}>
                    {tripInfo?.destination}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Date</Text>
                  <Text style={styles.detailValue}>
                    {tripInfo && formatTime(tripInfo.departure_date)}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Bus Type</Text>
                  <Text style={styles.detailValue}>{tripInfo?.bus_type}</Text>
                </View>

                <Text style={[styles.sectionTitle, { marginTop: 5 }]}>
                  Booking Details
                </Text>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Selected Seats</Text>
                  <Text style={styles.detailValue}>
                    {chosenSeats.join(", ")}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Total Amount</Text>
                  <Text style={styles.detailValue}>
                    {totalCost().toFixed(2)} EGP
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Payment Method</Text>
                  <Text style={styles.detailValue}>
                    {paymentType === "online" ? "Visa" : "Cash"}
                  </Text>
                </View>

                {userType === "Admin" && (
                  <>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Customer Name</Text>
                      <Text style={styles.detailValue}>{customerName}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Customer Phone</Text>
                      <Text style={styles.detailValue}>{customerPhone}</Text>
                    </View>
                  </>
                )}
              </View>
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity
                onPress={confirmBooking}
                disabled={isProcessing || isConfirmed}
                style={[
                  styles.confirmButton,
                  (isProcessing || isConfirmed) && styles.buttonDisabled,
                ]}
              >
                <Text style={styles.confirmButtonText}>
                  {isProcessing ? "Processing..." : "Confirm"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCancelBooking}
                disabled={isConfirmed}
                style={[
                  styles.cancelButton,
                  isConfirmed && styles.buttonDisabled,
                ]}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  backToSearchButton: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  backToSearchText: {
    color: "#A62C2C",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    backgroundColor: "#A62C2C",
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardHeaderText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  cardContent: {
    padding: 16,
  },
  tripDetailsGrid: {
    padding: 16,
  },
  tripDetailItem: {
    marginBottom: 16,
  },
  tripDetailLabel: {
    fontSize: 14,
    color: "#A62C2C",
    marginBottom: 4,
  },
  tripDetailValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
  },
  routeContainer: {
    marginTop: 8,
  },
  routeItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  routeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  routeText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
  },
  routeLine: {
    width: 2,
    height: 24,
    backgroundColor: "#D1D5DB",
    marginLeft: 5,
    marginBottom: 8,
  },
  seatSelectionContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#A62C2C",
    marginBottom: 4,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "white",
  },
  errorContainer: {
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: "#A62C2C",
    fontSize: 14,
  },
  paymentGrid: {
    marginBottom: 24,
  },
  paymentItem: {
    marginBottom: 16,
  },
  paymentLabel: {
    fontSize: 14,
    color: "#A62C2C",
    marginBottom: 4,
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#A62C2C",
  },
  paymentMethod: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#A62C2C",
  },
  bookButton: {
    backgroundColor: "#A62C2C",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  bookButtonDisabled: {
    backgroundColor: "#9CA3AF",
  },
  bookButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    maxWidth: 400,
    width: "100%",
    maxHeight: "80%",
  },
  modalHeader: {
    backgroundColor: "#A62C2C",
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  modalHeaderText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalContent: {
    padding: 24,
    maxHeight: 400,
  },
  warningContainer: {
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
    borderRadius: 8,
    padding: 12,
    marginBottom: 6,
  },
  warningText: {
    color: "#A62C2C",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  confirmationDetails: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#A62C2C",
    marginBottom: 12,
    textAlign: "center",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#A62C2C",
  },
  detailValue: {
    fontSize: 14,
    color: "#111827",
    flex: 1,
    textAlign: "right",
  },
  modalActions: {
    flexDirection: "row",
    padding: 24,
    gap: 12,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: "#16A34A",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#A62C2C",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  buttonDisabled: {
    backgroundColor: "#9CA3AF",
  },
});

export default function ProtectedTripBookingScreen(props) {
  return (
    <ProtectedRoute>
      <TripBookingScreen {...props} />
    </ProtectedRoute>
  );
}
