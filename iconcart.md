import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CircularMenu = ({ navigation, cartCount }) => {
  return (
    <View style={styles.headerContainer}>
      {/* Menu Icon */}
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate("MenuScreen")}>
        <MaterialCommunityIcons name="menu" size={24} color="black" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.headerText}>Grocery Daily</Text>

      {/* Cart Icon with Badge */}
      <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate("CartScreen")}>
        <MaterialCommunityIcons name="cart" size={24} color="black" />
        {cartCount > 0 && (
          <View style={styles.cartBadge}>
            <Text style={styles.badgeText}>{cartCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    elevation: 5, // Shadow effect for Android
  },
  menuButton: {
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cartButton: {
    padding: 10,
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    right: 5,
    top: 5,
    backgroundColor: "red",
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default CircularMenu;
