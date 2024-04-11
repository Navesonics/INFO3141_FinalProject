//Author : E_BENITEZ

// styles.js
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
    backgroundColor: "#FFF",
  },
  navBar: {
    backgroundColor: "#FFC0CB",
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "20%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  formContainer: {
    width: "80%",
    alignItems: "center",
    marginBottom: "100%",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "100%",
  },
  buttonContainerLogin: {
    width: "100%",
    alignItems: "center",
    borderRadius: 25,
    overflow: "hidden",
    marginTop: 10, 
  },
  buttonContainerSignup: {
    width: "100%",
    alignItems: "center",
    borderRadius: 25,
    overflow: "hidden",
    marginTop: 10, 
  },
  button: {
    width: "100%",
    borderRadius: 25,
  },
  logoContainer: {
    paddingTop: 200,
    padding: 20,
  },
  space: {
        width: 10, 
    },
});
