import { router } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ForgotPasswordApi } from "../../api/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setMessage("");
    try {
      const response = await ForgotPasswordApi(email);
      setMessage(response.data.message || "Reset link sent.");
    } catch (error) {
      setMessage(error.response?.data?.error || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>Reset your password</Text>
        <Text style={styles.subtext}>
          Enter your email to receive a password reset link.
        </Text>
      </View>

      <View style={styles.form}>
        <TextInput
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          editable={!isSubmitting}
          onChangeText={setEmail}
          placeholderTextColor="#9CA3AF"
          style={styles.input}
        />
        {message && <Text style={styles.message}>{message}</Text>}

        <TouchableOpacity
          disabled={isSubmitting}
          onPress={handleSubmit}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? "Loading..." : "Send Reset Link"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/login")}
          disabled={isSubmitting}
        >
          <Text style={styles.backLink}>Back to Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 25,
    paddingBottom: 20,
    backgroundColor: "white",
  },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  subtext: { fontSize: 14, color: "#6B7280", marginBottom: 20 },
  form: { gap: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#10b981",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  message: { marginTop: 5, color: "red" },
  backLink: {
    marginTop: 20,
    color: "#3B82F6",
    fontSize: 16,
    textAlign: "center",
  },
});
