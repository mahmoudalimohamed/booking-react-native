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
import { RegisterApi } from "../../api/auth";

const Register = () => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      password: "",
    },
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const name = watch("name");
  const email = watch("email");
  const password = watch("password");
  const phoneNumber = watch("phone_number");

  // Setup TextInput refs
  useEffect(() => {
    register("name", { required: "Name Is Required" });
    register("email", {
      required: "Email Is Required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid Email Address",
      },
    });
    register("phone_number", {
      required: "Phone Number Is Required",
      pattern: {
        value: /^\d{11}$/,
        message: "Phone Number Must Be Exactly 11 Digits",
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

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await RegisterApi(data);
      setMessage("Registration Successful.");
      router.replace("/");
    } catch (error) {
      if (error.response?.data) {
        Object.keys(error.response.data).forEach((field) => {
          setError(field, {
            type: "server",
            message: error.response.data[field][0],
          });
        });
        setMessage("Registration Failed.");
      } else {
        setMessage("Error: Something Went Wrong.");
        alert("Something went wrong.");
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
            <Text style={styles.title}>Create Account</Text>
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            {/* Name Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                placeholder="Enter your full name"
                value={name}
                editable={!isSubmitting}
                style={[
                  styles.input,
                  errors.name && styles.inputError,
                  isSubmitting && styles.disabledInput,
                ]}
                onChangeText={(text) => setValue("name", text)}
                placeholderTextColor="#9CA3AF"
              />
              {errors.name && (
                <Text style={styles.error}>{errors.name.message}</Text>
              )}
            </View>

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

            {/* Phone Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                placeholder="Enter your phone number"
                keyboardType="number-pad"
                style={[
                  styles.input,
                  errors.phone_number && styles.inputError,
                  isSubmitting && styles.disabledInput,
                ]}
                maxLength={11}
                value={phoneNumber}
                editable={!isSubmitting}
                onChangeText={(text) => {
                  const sanitized = text.replace(/[^0-9]/g, "");
                  setValue("phone_number", sanitized);
                }}
                placeholderTextColor="#9CA3AF"
              />
              {errors.phone_number && (
                <Text style={styles.error}>{errors.phone_number.message}</Text>
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
                {isSubmitting ? "Creating Account..." : "Create Account"}
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
          </View>

          {/* Register Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have account ? </Text>
            <TouchableOpacity
              onPress={() => router.push("/login")}
              disabled={isSubmitting}
            >
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;

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
    marginBottom: 10,
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
    padding: 12,
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
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  loginText: {
    fontSize: 16,
    color: "#6B7280",
  },
  loginLink: {
    fontSize: 16,
    color: "#10b981",
    fontWeight: "600",
  },
});
