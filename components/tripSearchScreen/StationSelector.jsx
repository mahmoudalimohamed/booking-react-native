import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const StationSelector = ({
  visible,
  onClose,
  onSelect,
  title,
  groupedData,
}) => {
  const [expandedCity, setExpandedCity] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);

  const toggleCity = (index) => {
    setExpandedCity(expandedCity === index ? null : index);
  };

  const handleSelect = (city, area) => {
    setSelectedStation({ city, area });
    setTimeout(() => {
      onSelect(city, area);
      onClose();
      setSelectedStation(null);
    }, 200);
  };

  const cities = Object.entries(groupedData);

  return (
    <Modal visible={visible} animationType="fade" transparent={false}>
      <StatusBar backgroundColor="#f8fafc" barStyle="dark-content" />
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <View style={styles.modalHeaderContent}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={25} color="#EF4444" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{title}</Text>
            <View style={{ width: 40 }} />
          </View>
        </View>
        <ScrollView
          style={styles.modalScrollView}
          showsVerticalScrollIndicator={false}
        >
          {cities.map(([city, areas], index) => (
            <View key={city} style={styles.cityContainer}>
              <TouchableOpacity
                style={styles.cityHeader}
                onPress={() => toggleCity(index)}
              >
                <View style={styles.cityHeaderContent}>
                  <View style={styles.cityInfo}>
                    <View style={styles.cityIcon}>
                      <Ionicons name="business" size={25} color="#3b82f6" />
                    </View>
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
                </View>
              </TouchableOpacity>
              {expandedCity === index && (
                <View style={styles.stationsGrid}>
                  {areas.map((area, i) => {
                    const isSelected =
                      selectedStation?.city === city &&
                      selectedStation?.area === area.name;
                    return (
                      <TouchableOpacity
                        key={i}
                        style={[
                          styles.stationCard,
                          isSelected && styles.selectedStationCard,
                        ]}
                        onPress={() => handleSelect(city, area)}
                      >
                        <Ionicons
                          name="train"
                          size={24}
                          color={isSelected ? "#3b82f6" : "#6b7280"}
                        />
                        <Text
                          style={[
                            styles.stationName,
                            isSelected && styles.selectedStationName,
                          ]}
                        >
                          {area.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default StationSelector;

const cardShadowStyle = {
  shadowColor: "blue",
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.12,
  shadowRadius: 24,
  elevation: 8,
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  modalHeader: {
    backgroundColor: "white",

    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    ...cardShadowStyle,
  },
  modalHeaderContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  closeButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
    backgroundColor: "#f1f5f9",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1e293b",
    flex: 1,
    textAlign: "center",
    marginLeft: 5,
  },
  modalScrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  cityContainer: {
    marginBottom: 24,
  },
  cityHeader: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 0,
    ...cardShadowStyle,
  },
  cityHeaderContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cityInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  cityIcon: {
    width: 48,
    height: 48,
    backgroundColor: "white",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  cityName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1e293b",
    flex: 1,
  },
  cityMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  stationCount: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "600",
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  stationsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 2,
  },
  stationCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    minWidth: "45%",
    borderWidth: 2,
    borderColor: "#f1f5f9",
    ...cardShadowStyle,
  },
  selectedStationCard: {
    borderColor: "#10b981",
    backgroundColor: "#ecfdf5",
  },
  stationName: {
    fontWeight: "600",
    color: "#374151",
    fontSize: 15,
    textAlign: "center",
  },
  selectedStationName: {
    color: "#059669",
    fontWeight: "700",
  },
});
