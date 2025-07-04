import { Stack } from "expo-router";

export default function BookingLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="trip-booking" 
        options={{ 
          title: "Book Trip",
          headerShown: true,
          headerBackTitle: "Search",
          presentation: "card"
        }} 
      />
      <Stack.Screen 
        name="success" 
        options={{ 
          title: "Booking Confirmed",
          headerShown: true,
          headerBackVisible: false,
          gestureEnabled: false
        }} 
      />
      <Stack.Screen 
        name="payment" 
        options={{ 
          title: "Payment",
          headerShown: true,
          headerBackTitle: "Back"
        }} 
      />
    </Stack>
  );
} 