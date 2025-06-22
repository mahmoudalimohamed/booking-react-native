import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // Modern Styles matching the card design pattern - Add to styleTripSearch.js

  // Main Container (px-6 py-4)
  cardContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },

  // Header Section (flex-row items-center justify-between mb-4)
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  // Title (text-xl font-bold text-gray-800)
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
  },

  // See All Text (text-purple-600 font-medium)
  seeAllText: {
    color: "#7c3aed",
    fontWeight: "500",
  },

  // Trips List Container
  tripCardsList: {
    gap: 16,
  },

  // Featured Trip Card (bg-purple-600 rounded-3xl p-6 shadow-lg)
  featuredTripCard: {
    backgroundColor: "green",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },

  // Trip Card Header (flex-row items-center justify-between mb-4)
  tripCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  // Status Badge (bg-purple-400 px-3 py-1 rounded-full)
  statusBadge: {
    backgroundColor: "rgba(139, 92, 246, 0.8)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },

  // Status Badge Text (text-white text-xs font-bold)
  statusBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },

  // Action Button (w-12 h-12 bg-white/20 rounded-full items-center justify-center)
  actionButton: {
    width: 48,
    height: 48,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  // Trip Route (text-2xl font-bold text-white mb-2)
  tripRoute: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },

  // Trip Subtitle (text-purple-100 mb-4)
  tripSubtitle: {
    color: "#e9d5ff",
    marginBottom: 16,
    fontSize: 14,
  },

  // Trip Details Row (flex-row items-center justify-between)
  tripDetailsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  // Detail Item (flex-row items-center)
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  // Detail Icon (w-8 h-8 bg-white/20 rounded-full items-center justify-center mr-2)
  detailIcon: {
    width: 32,
    height: 32,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  // Detail Text (text-white font-medium)
  detailText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 4,
  },

  // Trip Footer Row (flex-row items-center mt-4 space-x-4)
  tripFooterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
  },

  // Trip Metrics Container
  tripMetrics: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 16,
  },

  // Metric Item (flex-row items-center)
  metricItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  // Metric Text (text-white text-sm ml-1)
  metricText: {
    color: "white",
    fontSize: 14,
    marginLeft: 4,
  },

  // Price Action Container
  priceActionContainer: {
    alignItems: "flex-end",
  },

  // Trip Price
  tripPrice: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },

  // Continue Button (bg-white px-4 py-2 rounded-full ml-auto)
  continueButton: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },

  // Continue Button Text (text-purple-600 font-semibold text-sm)
  continueButtonText: {
    color: "#7c3aed",
    fontWeight: "600",
    fontSize: 14,
  },

  // No Trips Card - Similar gradient style
  noTripsCard: {
    backgroundColor: "#6b7280",
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },

  // No Trips Icon
  noTripsIcon: {
    width: 64,
    height: 64,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  // No Trips Title
  noTripsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
    textAlign: "center",
  },

  // No Trips Subtitle
  noTripsSubtitle: {
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    marginBottom: 20,
    fontSize: 14,
  },

  // Retry Button
  retryButton: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },

  // Retry Button Text
  retryButtonText: {
    color: "#6b7280",
    fontWeight: "600",
    fontSize: 14,
  },
});

export default styles;
