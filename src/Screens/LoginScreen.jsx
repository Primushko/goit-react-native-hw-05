import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableWithoutFeedback,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  Alert,
} from "react-native";
import Bg from "../image/bg-image.png";
import { useNavigation } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";

const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [focusEmail, setIsFocusEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [focusPassword, setFocusPassword] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const [phoneWidth, setPhoneWidth] = useState(Dimensions.get("window").width);
  const [phoneHeight, setPhoneHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setPhoneWidth(width);
      const height = Dimensions.get("window").height;
      setPhoneHeight(height);
    };
    const addListener = Dimensions.addEventListener("change", onChange);
    return () => addListener.remove();
  }, []);
  const emailSave = (email) => setEmail(email);
  const passwordSave = (password) => setPassword(password);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert(`Усі поля мають бути заповнені!`);
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert(`Некоректна адреса електронної пошти!`);
      return;
    }

    Alert.alert(`${email}, успішно увійшли!`);
    console.log("email" - email, "password" - password);

    setEmail("");
    setPassword("");
    Keyboard.dismiss();

    navigation.navigate("Home", { screen: "PostsScreen" });
  };

  const keyboardIsHidden = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={keyboardIsHidden}>
        <View style={styles.containerFlex}>
          <ImageBackground
            style={{
              ...styles.backgroundImg,
              width: phoneWidth,
              height: phoneHeight,
            }}
            source={Bg}
          >
            <ScrollView>
              <View
                style={{
                  ...styles.containerWrapper,
                  width: phoneWidth,
                }}
              >
                <View style={{ width: phoneWidth - 16 * 2 }}>
                  <Text style={styles.title}>Увійти</Text>

                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor: focusEmail ? "#FF6C00" : "#E8E8E8",
                    }}
                    onFocus={() => setIsFocusEmail(true)}
                    onBlur={() => setIsFocusEmail(false)}
                    value={email}
                    placeholder="Адреса електронної пошти"
                    cursorColor={"#BDBDBD"}
                    placeholderTextColor={"#BDBDBD"}
                    onChangeText={emailSave}
                    keyboardType="email-address"
                  ></TextInput>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor: focusPassword ? "#FF6C00" : "#E8E8E8",
                    }}
                    onFocus={() => setFocusPassword(true)}
                    onBlur={() => setFocusPassword(false)}
                    value={password}
                    placeholder="Пароль"
                    cursorColor={"#BDBDBD"}
                    placeholderTextColor={"#BDBDBD"}
                    secureTextEntry={isPasswordHidden}
                    onChangeText={passwordSave}
                  ></TextInput>
                  <TouchableOpacity
                    style={styles.isPassword}
                    onPress={() =>
                      setIsPasswordHidden((prevState) => !prevState)
                    }
                  >
                    <Text style={styles.isPasswordShow}>
                      {isPasswordHidden ? "Показати" : "Приховати"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={onLogin}>
                    <Text style={styles.textButton}>Увійти</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.textLink}>
                      Немає акаунту?
                      <Text
                        style={styles.textLinkUnderline}
                        onPress={() =>
                          navigation.navigate("RegistrationScreen")
                        }
                      >
                        Зареєстуватися
                      </Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerFlex: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  backgroundImg: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },

  containerWrapper: {
    flex: 1,
    height: 550,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 400,
  },

  title: {
    marginTop: 35,
    marginBottom: 30,
    textAlign: "center",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    fontWeight: "500",
  },

  input: {
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 15,
    backgroundColor: "#F6F6F6",
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    fontWeight: "400",
    color: "#212121",
  },

  isPassword: {
    position: "absolute",
    right: 0,
    bottom: 265,
    paddingRight: 16,
  },

  isPasswordShow: {
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
    fontWeight: "400",
  },

  button: {
    height: 50,
    marginTop: 43,
    paddingVertical: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },

  textButton: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "700",
  },

  textLink: {
    marginTop: 16,
    marginBottom: 110,
    textAlign: "center",
    color: "#1B4371",
    fontWeight: "400",
  },

  textLinkUnderline: {
    textDecorationLine: "underline",
  },
});
