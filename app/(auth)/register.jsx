import { Link, router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useUser } from "../../hooks/useUser";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useUser();

  const isFormValid =
    name.trim() && email.trim() && password.trim() && password.length >= 8;

  const handleSubmit = async () => {
    setError(null);
    if (!isFormValid) {
      setError(
        "Please fill in all fields and use a password with at least 8 characters."
      );
      return;
    }
    setIsLoading(true);
    try {
      await register(email, password, name);
      router.replace("/(tabs)");
    } catch (error) {
      setError(error.message || "Registration failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <View className="px-6 py-8 bg-white mx-4 mt-20 rounded-lg shadow-sm">
        <Text className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Register
        </Text>

        {/* Name Input */}
        <View className="mb-4">
          <Text className="text-gray-700 font-medium mb-2">Name</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800 bg-white"
            placeholder="Enter your Name"
            value={name}
            onChangeText={setName}
            autoCorrect={false}
          />
        </View>

        {/* Email Input */}
        <View className="mb-4">
          <Text className="text-gray-700 font-medium mb-2">Email</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800 bg-white"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Password Input */}
        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-2">Password</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800 bg-white"
            placeholder="Enter your password (min 8 characters)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>

        {/* Error Message */}
        {error && (
          <View className="mb-4 bg-red-100 border-red-400 p-3 rounded-md">
            <Text className="text-red-700 text-sm">{error}</Text>
          </View>
        )}

        {/* Submit Button */}
        <TouchableOpacity
          className={`rounded-lg py-3 mb-4 ${
            isFormValid && !isLoading ? "bg-green-600" : "bg-green-300"
          }`}
          onPress={handleSubmit}
        >
          <Text className="text-white font-semibold text-center text-lg">
            {isLoading ? "Registering..." : "Register"}
          </Text>
        </TouchableOpacity>

        {/* Login Link */}
        <View className="flex-row justify-center">
          <Text className="text-gray-600">Already have an account? </Text>
          <Link href="/login" asChild>
            <TouchableOpacity>
              <Text className="text-green-600 font-medium">Login here</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}
