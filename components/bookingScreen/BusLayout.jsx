import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const BusLayout = ({
  availableSeats,
  chosenSeats,
  unavailableSeats,
  toggleSeatSelection,
  loading,
}) => {
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  if (availableSeats.length === 0) {
    return (
      <View style={styles.noSeatsContainer}>
        <Text style={styles.noSeatsText}>
          No seats available for this trip.
        </Text>
      </View>
    );
  }

  const getSeatStyle = (seatNumber) => {
    if (unavailableSeats.includes(seatNumber)) {
      return [styles.seat, styles.unavailableSeat];
    }
    if (chosenSeats.includes(seatNumber)) {
      return [styles.seat, styles.chosenSeat];
    }
    return [styles.seat, styles.availableSeat];
  };

  const maxSeatNumber = Math.max(
    ...availableSeats.map((seat) =>
      Number.parseInt(seat.seat_number.toString())
    )
  );
  const totalRows = Math.ceil(maxSeatNumber / 4);
  const seatSize = totalRows > 10 ? 40 : 48;

  const renderSeat = (seatNumber) => {
    const seatExists = availableSeats.some(
      (seat) => Number.parseInt(seat.seat_number.toString()) === seatNumber
    );

    if (!seatExists) {
      return (
        <View
          key={seatNumber}
          style={[
            styles.seat,
            { width: seatSize, height: seatSize, opacity: 0 },
          ]}
        />
      );
    }

    return (
      <TouchableOpacity
        key={seatNumber}
        onPress={() => toggleSeatSelection(seatNumber)}
        disabled={unavailableSeats.includes(seatNumber)}
        style={[
          getSeatStyle(seatNumber),
          { width: seatSize, height: seatSize },
        ]}
      >
        <Text style={styles.seatText}>{seatNumber}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.busLayout}>
      <View style={styles.busBody}>
        <View style={styles.aisleLayout}>
          {Array.from({ length: totalRows }).map((_, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              <View style={styles.leftSeats}>
                {[1, 2].map((seatPosition) => {
                  const seatNumber = rowIndex * 4 + seatPosition;
                  if (seatNumber <= maxSeatNumber) {
                    return renderSeat(seatNumber);
                  }
                  return null;
                })}
              </View>
              <View style={styles.rightSeats}>
                {[3, 4].map((seatPosition) => {
                  const seatNumber = rowIndex * 4 + seatPosition;
                  if (seatNumber <= maxSeatNumber) {
                    return renderSeat(seatNumber);
                  }
                  return null;
                })}
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 200,
  },
  noSeatsContainer: {
    padding: 16,
  },
  noSeatsText: {
    color: "#6B7280",
    marginBottom: 16,
  },
  busLayout: {
    alignItems: "center",
    marginBottom: 32,
  },
  busBody: {
    backgroundColor: "#F3F4F6",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 16,
  },
  aisleLayout: {
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 12,
    gap: 40,
  },
  leftSeats: {
    flexDirection: "row",
    gap: 8,
  },
  rightSeats: {
    flexDirection: "row",
    gap: 8,
  },
  seat: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomWidth: 4,
    borderBottomColor: "#374151",
    justifyContent: "center",
    alignItems: "center",
  },
  availableSeat: {
    backgroundColor: "#3B82F6",
  },
  chosenSeat: {
    backgroundColor: "#10B981",
  },
  unavailableSeat: {
    backgroundColor: "#EF4444",
  },
  seatText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default BusLayout;
