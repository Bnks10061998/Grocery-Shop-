Error:

1) Warning: <headerLine /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements at headerLine..
===>React expects component names to follow PascalCase (e.g., HeaderLine) instead of camelCase or lowercase (e.g., headerLine).
===>Rename headerLine to HeaderLine when defining and using the component


2) The error "Cannot read property 'bubblingEventTypes' of null" in React Native usually happens due to an issue with the react-native-linear-gradient package.
==>npm uninstall react-native-linear-gradient
==>npm install react-native-linear-gradient
==>import LinearGradient from "react-native-linear-gradient";
==>import { LinearGradient } from "expo-linear-gradient";
==>expo install expo-linear-gradient
==>import { LinearGradient } from "expo-linear-gradient";



quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  quantityButton: {
    backgroundColor: "#ddd",
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    minWidth: 30,
    textAlign: "center",
  },

