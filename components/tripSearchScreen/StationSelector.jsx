import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Modal,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styleTripSearch";
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
