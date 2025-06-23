import { MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useUser } from "../../hooks/useUser";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { user, login, logout } = useUser();

  const isFormValid = email.trim() && password.trim() && password.length >= 8;

  const handleSubmit = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await login(email, password);
      router.replace("/(tabs)/home");
    } catch (error) {
      setError(error.message || "Login failed. Please try again");
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <View className="px-6 py-8 bg-white mx-4 mt-20 rounded-lg shadow-sm">
        <Text className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login
        </Text>

        {/* Email Input */}
        <View className="mb-4">
          <Text className="text-gray-700 font-medium mb-2">Email</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800 bg-white"
            placeholder="Enter your Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-2">Password</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800 bg-white"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>

        {/* Error Message */}
        {error && (
          <View className="mb-4 bg-red-100 border-red-400 p-3 rounded-md ">
            <Text className="text-red-600 text-sm">{error} </Text>
          </View>
        )}

        {/* Submit Button */}
        <TouchableOpacity
          className={`rounded-lg py-3 mb-4 ${
            isFormValid && !isLoading ? "bg-blue-600" : "bg-blue-300"
          }`}
          onPress={handleSubmit}
          disabled={!isFormValid || isLoading}
        >
          <Text className="text-white font-semibold text-center text-lg">
            {isLoading ? "Signing in..." : "Login"}
          </Text>
        </TouchableOpacity>

        {/* Register Link */}
        <View className="flex-row justify-center">
          <Text className="text-gray-600">Don't have an account? </Text>
          <Link href="/(auth)/register" asChild>
            <TouchableOpacity>
              <Text className="text-blue-600 font-medium">Register here</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Logout */}
        <View className="mt-8">
          <TouchableOpacity
            className="flex-row items-center justify-center bg-red-50 py-3 rounded-xl border border-red-100 active:opacity-90"
            onPress={logout}
          >
            <MaterialIcons name="logout" size={20} color="#DC2626" />
            <Text className="text-base font-semibold text-red-600 ml-2">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

//If you want, I can also show you how to persist the login token or user data (using AsyncStorage) after login. Just say the word.
