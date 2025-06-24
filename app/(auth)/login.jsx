import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LoginApi } from "../../api/auth";

const Login = () => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const email = watch("email");
  const password = watch("password");

  useEffect(() => {
    register("email", {
      required: "Email Is Required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid Email Address",
      },
    });
    register("password", {
      required: "Password Is Required",
      minLength: {
        value: 8,
        message: "Password Must Be At Least 8 Characters",
      },
    });
  }, [register]);

  const onSubmit = async ({ email, password }) => {
    setIsSubmitting(true);
    console.log("Logging in:", { email, password });
    try {
      const response = await LoginApi(email, password);
      console.log("Login success:", response.data);
      setMessage("Login Successful.");
      setTimeout(() => router.replace("/"), 1000);
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data,
        error.response?.status
      );
      if (error.response?.data) {
        Object.entries(error.response.data).forEach(([field, msgs]) => {
          setError(field, { type: "server", message: msgs[0] });
        });
        setMessage("Login Failed.");
      } else {
        setMessage("Error: Something went wrong.");
        alert("Unexpected error, check the console");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back</Text>
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            {/* Email Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                editable={!isSubmitting}
                style={[
                  styles.input,
                  errors.email && styles.inputError,
                  isSubmitting && styles.disabledInput,
                ]}
                onChangeText={(text) => setValue("email", text)}
                placeholderTextColor="#9CA3AF"
              />
              {errors.email && (
                <Text style={styles.error}>{errors.email.message}</Text>
              )}
            </View>

            {/* Password Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View
                style={[
                  styles.passwordContainer,
                  errors.password && styles.inputError,
                  isSubmitting && styles.disabledInput,
                ]}
              >
                <TextInput
                  placeholder="Enter your password"
                  secureTextEntry={!showPassword}
                  value={password}
                  editable={!isSubmitting}
                  style={styles.passwordInput}
                  onChangeText={(text) => setValue("password", text)}
                  placeholderTextColor="#9CA3AF"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword((prev) => !prev)}
                  style={styles.toggleButton}
                  disabled={isSubmitting}
                >
                  <Text style={styles.toggleText}>
                    {showPassword ? "Hide" : "Show"}
                  </Text>
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text style={styles.error}>{errors.password.message}</Text>
              )}
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={[styles.button, isSubmitting && styles.disabledButton]}
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>
                {isSubmitting ? "Signing In..." : "Sign In"}
              </Text>
            </TouchableOpacity>

            {/* Message */}
            {message ? (
              <View style={styles.messageContainer}>
                <Text
                  style={[
                    styles.message,
                    message.includes("Successful")
                      ? styles.successMessage
                      : styles.errorMessage,
                  ]}
                >
                  {message}
                </Text>
              </View>
            ) : null}
            {/* Register Link */}
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Don't have an account? </Text>
              <TouchableOpacity
                onPress={() => router.push("/register")}
                disabled={isSubmitting}
              >
                <Text style={styles.registerLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 25,
    paddingBottom: 20,
  },
  header: {
    marginBottom: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "semibold",
    color: "#111827",
    marginBottom: 8,
    textAlign: "center",
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "semibold",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: "black",
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    color: "#111827",
    shadowColor: "blue",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputError: {
    borderColor: "black",
    backgroundColor: "#FEF2F2",
  },
  disabledInput: {
    backgroundColor: "#F3F4F6",
    color: "#9CA3AF",
    opacity: 0.7,
  },
  error: {
    color: "#EF4444",
    marginTop: 6,
    fontSize: 14,
    fontWeight: "500",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    paddingRight: 16,
    shadowColor: "blue",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  passwordInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: "#111827",
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  toggleText: {
    color: "#3B82F6",
    fontSize: 14,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#10b981",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#3B82F6",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledButton: {
    backgroundColor: "#9CA3AF",
    shadowOpacity: 0.1,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  messageContainer: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  message: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  successMessage: {
    color: "#059669",
    backgroundColor: "#ECFDF5",
  },
  errorMessage: {
    color: "#DC2626",
    backgroundColor: "#FEF2F2",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  registerText: {
    fontSize: 16,
    color: "#6B7280",
  },
  registerLink: {
    fontSize: 16,
    color: "#10b981",
    fontWeight: "600",
  },
});
