import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
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
    try {
      const response = await LoginApi(email, password);
      setMessage("Login Successful.");
      setTimeout(() => {
        router.replace("/");
      }, 1000);
    } catch (error) {
      if (error.response?.data) {
        Object.keys(error.response.data).forEach((field) => {
          setError(field, {
            type: "server",
            message: error.response.data[field][0],
          });
        });
        setMessage("Login Failed.");
      } else {
        setMessage("Error: Something Went Wrong.");
        alert("Something went wrong.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        editable={!isSubmitting}
        style={[styles.input, isSubmitting && styles.disabledInput]}
        onChangeText={(text) => setValue("email", text)}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="*********"
          secureTextEntry={!showPassword}
          value={password}
          editable={!isSubmitting}
          style={[
            styles.input,
            { flex: 1 },
            isSubmitting && styles.disabledInput,
          ]}
          onChangeText={(text) => setValue("password", text)}
        />
        <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
          <Text style={styles.toggle}>{showPassword ? "Hide" : "Show"}</Text>
        </TouchableOpacity>
      </View>
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      <TouchableOpacity
        style={[styles.button, isSubmitting && styles.disabledButton]}
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      >
        <Text style={styles.buttonText}>
          {isSubmitting ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>

      {message ? (
        <Text
          style={{
            color: message === "Login Successful." ? "green" : "red",
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          {message}
        </Text>
      ) : null}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 10,
    borderRadius: 6,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  disabledInput: {
    backgroundColor: "#eee",
    color: "#999",
    opacity: 0.6,
  },
  error: {
    color: "red",
    marginBottom: 8,
    fontSize: 12,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  toggle: {
    color: "#007AFF",
    marginLeft: 12,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#A62C2C",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
