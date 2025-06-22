import { StyleSheet } from "react-native";

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

  // Gradient header section
  tripCardHeader: {
    backgroundColor: "#4f46e5",
    paddingHorizontal: 20,
    paddingVertical: 20,
    position: "relative",
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

  // Metric Text
  metricText: {
    color: "#059669",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 12,
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

  continueButtonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
    letterSpacing: 0.5,
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

export default styles;
