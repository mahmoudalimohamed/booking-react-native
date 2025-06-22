import { StyleSheet } from "react-native";

const cardShadowStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05,
  shadowRadius: 8,
  elevation: 3,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: "white",
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#6b7280",
  },
  content: {
    flex: 1,
    backgroundColor: "white",
  },
  arabicTitleContainer: {
    backgroundColor: "white",
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  arabicTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    textAlign: "center",
    marginBottom: 8,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  selectionCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 15,
    borderWidth: 1,
    borderColor: "black",
  },
  selectionCardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectionIcon: {
    width: 48,
    height: 48,
    backgroundColor: "white",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  selectionText: {
    flex: 1,
  },
  selectionSubtitle: {
    color: "#6b7280",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  selectionTitle: {
    color: "#1f2937",
    fontSize: 18,
    fontWeight: "600",
  },
  searchButton: {
    backgroundColor: "#3b82f6",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    ...cardShadowStyle,
  },
  searchButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  loadingContainer: {
    marginTop: 40,
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#6b7280",
    marginTop: 12,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  modalHeader: {
    backgroundColor: "white",
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 24,
    ...cardShadowStyle,
  },
  modalHeaderContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#f1f5f9",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
  },
  modalScrollView: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  cityContainer: {
    marginBottom: 16,
  },
  cityHeader: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f1f5f9",
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
  },
  cityIcon: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  cityName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
  },
  cityMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  stationCount: {
    fontSize: 16,
    color: "#6b7280",
    marginRight: 8,
  },
  stationsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  stationCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    margin: 4,
    borderWidth: 1,
    borderColor: "#f1f5f9",
    ...cardShadowStyle,
  },
  selectedStationCard: {
    borderColor: "#3b82f6",
    backgroundColor: "white",
  },
  stationName: {
    fontWeight: "500",
    color: "#374151",
  },
  selectedStationName: {
    color: "#1d4ed8",
  },
  // Results styles
  resultsContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 24,
    marginTop: 20,
  },
  resultsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    flex: 1,
  },
  newResultsBadge: {
    backgroundColor: "#dcfce7",
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
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
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
    backgroundColor: "#d1d5db",
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
    color: "#6b7280",
    textTransform: "uppercase",
    fontWeight: "500",
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
    backgroundColor: "#3b82f6",
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
    color: "#6b7280",
    fontSize: 12,
  },
  bookButton: {
    backgroundColor: "#3b82f6",
    borderRadius: 12,
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
    color: "#6b7280",
    marginBottom: 8,
  },
  noResultsSubtitle: {
    fontSize: 14,
    color: "#9ca3af",
  },
  errorContainer: {
    backgroundColor: "#fef2f2",
    borderLeftWidth: 4,
    borderLeftColor: "#f87171",
    padding: 16,
    marginHorizontal: 24,
    marginTop: 16,
    borderRadius: 8,
  },
  errorText: {
    color: "#b91c1c",
    fontSize: 14,
  },
});

export default styles;
