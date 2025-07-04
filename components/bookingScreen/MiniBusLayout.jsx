import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const MiniBusLayout = ({
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

  const layoutPattern = [
    { type: "center", seats: 1 },
    { type: "left-group", seats: 2 },
    { type: "left-right-group", seats: 3 },
    { type: "left-right-group", seats: 3 },
    { type: "full-row", seats: 4 },
  ];

  const processedSeats = [...availableSeats]
    .map((seat) =>
      typeof seat === "object"
        ? Number.parseInt(seat.seat_number.toString())
        : Number.parseInt(seat.toString())
    )
    .sort((a, b) => a - b);

  const getSeatStyle = (seatNumber) => {
    if (unavailableSeats.includes(seatNumber)) {
      return [styles.seat, styles.unavailableSeat];
    }
    if (chosenSeats.includes(seatNumber)) {
      return [styles.seat, styles.chosenSeat];
    }
    return [styles.seat, styles.availableSeat];
  };

  const generateLayout = () => {
    const layout = [];
    let seatIndex = 0;

    for (const rowPattern of layoutPattern) {
      if (seatIndex >= processedSeats.length) break;

      const rowSeats = [];
      for (
        let i = 0;
        i < rowPattern.seats && seatIndex < processedSeats.length;
        i++
      ) {
        rowSeats.push(processedSeats[seatIndex]);
        seatIndex++;
      }

      if (rowSeats.length > 0) {
        layout.push({
          type: rowPattern.type,
          seats: rowSeats,
        });
      }
    }

    while (seatIndex < processedSeats.length) {
      const rowSeats = [];
      for (let i = 0; i < 4 && seatIndex < processedSeats.length; i++) {
        rowSeats.push(processedSeats[seatIndex]);
        seatIndex++;
      }

      if (rowSeats.length > 0) {
        layout.push({
          type: "full-row",
          seats: rowSeats,
        });
      }
    }

    return layout;
  };

  const layout = generateLayout();

  const renderSeat = (seatNumber) => {
    return (
      <TouchableOpacity
        key={seatNumber}
        onPress={() => toggleSeatSelection(seatNumber)}
        disabled={unavailableSeats.includes(seatNumber)}
        style={getSeatStyle(seatNumber)}
      >
        <Text style={styles.seatText}>{seatNumber}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.miniBusLayout}>
      <View style={styles.busBody}>
        {layout.map((row, rowIndex) => {
          if (row.type === "center") {
            return (
              <View key={`row-${rowIndex}`} style={styles.centerRow}>
                {renderSeat(row.seats[0])}
              </View>
            );
          } else if (row.type === "left-group") {
            return (
              <View key={`row-${rowIndex}`} style={styles.leftGroupRow}>
                <View style={styles.leftGroup}>
                  {row.seats.map((seatNumber) => renderSeat(seatNumber))}
                </View>
              </View>
            );
          } else if (row.type === "left-right-group") {
            return (
              <View key={`row-${rowIndex}`} style={styles.leftRightRow}>
                <View style={styles.leftGroup}>
                  {row.seats
                    .slice(0, 2)
                    .map((seatNumber) => renderSeat(seatNumber))}
                </View>
                {row.seats.length > 2 && (
                  <View style={styles.rightSingle}>
                    {renderSeat(row.seats[2])}
                  </View>
                )}
              </View>
            );
          } else if (row.type === "full-row") {
            return (
              <View key={`row-${rowIndex}`} style={styles.fullRow}>
                {row.seats.map((seatNumber) => renderSeat(seatNumber))}
              </View>
            );
          }
          return null;
        })}
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
  miniBusLayout: {
    alignItems: "center",
    marginBottom: 4,
    maxWidth: 300,
  },
  busBody: {
    padding: 4,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  centerRow: {
    alignItems: "center",
    marginLeft: 152,
    marginBottom: 8,
  },
  leftGroupRow: {
    marginBottom: 8,
  },
  leftRightRow: {
    flexDirection: "row",
    gap: 48,
    marginBottom: 8,
  },
  fullRow: {
    flexDirection: "row",
    gap: 4,
    marginBottom: 8,
  },
  leftGroup: {
    flexDirection: "row",
    gap: 8,
    marginRight: 4,
  },
  rightSingle: {
    // Single seat on the right
  },
  seat: {
    width: 48,
    height: 48,
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

export default MiniBusLayout;
