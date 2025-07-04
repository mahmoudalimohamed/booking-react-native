import { useNavigation, useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { WebView } from "react-native-webview";

const PaymentWebViewScreen = () => {
  const route = useRoute();
  const router = useRouter();
  const navigation = useNavigation();
  const { paymentUrl } = route.params || {};
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if paymentUrl exists
  if (!paymentUrl) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No payment URL provided</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleNavigationStateChange = (navState) => {
    setCanGoBack(navState.canGoBack);

    // Check if payment is completed based on URL changes
    if (navState.url.includes("success") || navState.url.includes("callback")) {
      // Payment successful - navigate to success screen
      if (router && router.push) {
        router.push("/BookingSuccess");
      } else {
        navigation.navigate("BookingSuccess");
      }
    } else if (
      navState.url.includes("error") ||
      navState.url.includes("failed")
    ) {
      // Payment failed - show error and go back
      Alert.alert(
        "Payment Failed",
        "Your payment could not be processed. Please try again.",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }
  };

  const handleGoBack = () => {
    if (canGoBack && webViewRef.current) {
      webViewRef.current.goBack();
    } else {
      Alert.alert(
        "Cancel Payment",
        "Are you sure you want to cancel the payment?",
        [
          { text: "No", style: "cancel" },
          { text: "Yes", onPress: () => navigation.goBack() },
        ]
      );
    }
  };

  const handleError = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.error("WebView error: ", nativeEvent);
    Alert.alert(
      "Error",
      "Failed to load payment page. Please check your internet connection and try again.",
      [
        { text: "Retry", onPress: () => webViewRef.current?.reload() },
        { text: "Cancel", onPress: () => navigation.goBack() },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={styles.placeholder} />
      </View>

      <WebView
        ref={webViewRef}
        source={{ uri: paymentUrl }}
        style={styles.webview}
        onNavigationStateChange={handleNavigationStateChange}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={handleError}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        mixedContentMode="compatibility"
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        // Add these props to handle SSL and network issues
        onShouldStartLoadWithRequest={(request) => {
          // Allow all requests for now, but you can add custom logic here
          return true;
        }}
        // Handle HTTP errors
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn("HTTP error: ", nativeEvent);
        }}
      />

      {loading && (
        <View style={styles.loadingOverlay}>
          <Text style={styles.loadingText}>Loading payment...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    backgroundColor: "#A62C2C",
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  placeholder: {
    width: 60, // Same width as back button for centering
  },
  webview: {
    flex: 1,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#A62C2C",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#A62C2C",
    marginBottom: 20,
    textAlign: "center",
  },
});

// This is the required default export
export default PaymentWebViewScreen;
