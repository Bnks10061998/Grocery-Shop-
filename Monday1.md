import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import React, { createContext,useContext,useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, SafeAreaView, ScrollView,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const CartContext = createContext();
const CircularMenu = ({ navigation }) => {
  const { getCartCount } = useCart(); // Get cart count
  const cartCount = getCartCount();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate("MenuScreen")}>
        <Icon name="menu" size={18} color="black" />
      </TouchableOpacity>
      <Text style={styles.headerText}>Grocery Daily</Text>
      <TouchableOpacity style={styles.cartincartButton} onPress={() => navigation.navigate("CartScreen")}>
        <MaterialCommunityIcons name="cart" size={24} color="black" />
        {cartCount > 0 && (
          <View style={styles.cartincartBadge}>
            <Text style={styles.cartinbadgeText}>{cartCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};


const MenuScreen = () => (
  <View style={styles.menuContainer}>
    <Text style={styles.menuText}>Welcome to React Native</Text>
  </View>
);

const categories = [
  { id: "1", name: "All" },
  { id: "2", name: "Vegetable" },
  { id: "3", name: "Fruit" },
  { id: "4", name: "Lays" },
  { id: "5", name: "Biscuit" },
  { id: "6", name: "Chocolate" },
  { id: "7", name: "Masala" }
];

const promoData = [
  { id: "1", image: "https://smartyield.in/wp-content/uploads/2021/06/Tomato-red.png", itemname: "Tomato", title: "1 KG", Amount: "₹20", Category: "Vegetable" },
  { id: "2", image: "https://media.istockphoto.com/id/157430678/photo/three-potatoes.jpg?s=612x612&w=0&k=20&c=qkMoEgcj8ZvYbzDYEJEhbQ57v-nmkHS7e88q8dv7TSA=", itemname: "Potato", title: "1 KG", Amount: "₹50", Category: "Vegetable" },
  { id: "3", image: "https://groceryatdoor-com-2.myshopify.com/cdn/shop/products/Carrot-Vegetable_d019ad4a-e1f1-4933-bbc5-859a868a078a_large.jpeg?v=1407880557", itemname: "Carrot", title: "1 KG", Amount: "₹60",Category: "Vegetable" },
     { id: "4", image: "https://samsgardenstore.com/cdn/shop/files/Greenroundbrinjal.jpg", itemname: "Brinjal", title: "1 KG", Amount: "₹30",Category: "Vegetable" },
     { id: "5", image: "https://zamaorganics.com/cdn/shop/files/Untitleddesign_5_11zon.png", itemname: "Eggplant", title: "1 KG", Amount: "₹25",Category: "Vegetable" },
     { id: "6", image: "https://www.plantsnplanters.com/media/catalog/product/cache/1/thumbnail/600x/17f82f742ffe127f42dca9de82fb58b1/B/r/Broccoli-Green-Vegetable-Seeds_1.jpg", itemname: "Broccoli", title: "1 KG", Amount: "₹60",Category: "Vegetable" },
  
];

const PromoCard = ({ item, navigation }) => (
  <View style={styles.promoCardContainer}>
    <LinearGradient colors={["#ff9a9e", "#fad0c4"]} style={styles.promoCard}>
      <Image source={{ uri: item.image }} style={styles.promoImage} />
      <View style={styles.promoDetails}>
        <Text style={styles.promoItemName}>{item.itemname}</Text>
        <Text style={styles.promoTitle}>{item.title}</Text>
        <Text style={styles.promoPrice}>{item.Amount}</Text>

        <TouchableOpacity 
          style={[styles.promoButton, { marginTop: 10, width: "80%" }]}
          onPress={() => navigation.navigate('ProductDetailScreen', { item })}
        >
          <Text style={styles.promoButtonText}>Buy Now</Text>
          <MaterialCommunityIcons name="arrow-right" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  </View>
);




const CategoryFilterScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = selectedCategory === "All"
    ? promoData
    : promoData.filter((item) => item.Category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <View style={styles.categoryContainer}>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.categoryButton, selectedCategory === item.name && styles.selectedCategory]}
            onPress={() => setSelectedCategory(item.name)}
          >
            <Text style={[styles.categoryText, selectedCategory === item.name && styles.selectedText]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
      
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.categoryRow}
        renderItem={({ item }) => <PromoCard item={item} navigation={navigation} />}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={10}
        removeClippedSubviews
        contentContainerStyle={{ paddingBottom: 120 }}
        getItemLayout={(data, index) => ({
          length: 320, // Approximate item height
          offset: 320 * index,
          index,
        })}
      />
    </View>
  );
};


//Buy Now Detail screen
const ProductDetailScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart(); // Get cart functions

  const price = parseInt(item.Amount.replace("₹", ""));
  const totalAmount = price * quantity;

  const handleAddToCart = () => {
    addToCart(item, quantity); // Save quantity
    Alert.alert(
      "Added to Cart",
      `${quantity} ${item.itemname}(s) added to your cart!`,
      [{ text: "OK", onPress: () => navigation.navigate("CartScreen") }]
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      
      <Image source={{ uri: item.image }} style={styles.detailImage} />
      <Text style={styles.detailTitle}>{item.itemname}</Text>
      <Text style={styles.detailSubtitle}>{item.title}</Text>
      <Text style={styles.detailPrice}>₹{price}</Text>

      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))} style={styles.quantityButton}>
          <MaterialCommunityIcons name="minus" size={20} color="white" />
        </TouchableOpacity>
        <View style={styles.quantityBox}>
          <Text style={styles.quantityText}>{quantity}</Text>
        </View>
        <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.quantityButton}>
          <MaterialCommunityIcons name="plus" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <Text style={styles.totalAmountText}>Total: ₹{totalAmount}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const BundleDetailScreen = ({ route, navigation }) => {
  const { item, quantity, totalAmount } = route.params;

  return (
    <SafeAreaView style={styles.bundledetailcontainer}>
      <Text style={styles.bundledetailtitle}>Order Summary</Text>
      <Text style={styles.bundledetailinfo}>Product: {item.itemname}</Text>
      <Text style={styles.bundledetailinfo}>Quantity: {quantity}</Text>
      <Text style={styles.bundledetailinfo}>Total Amount: ₹{totalAmount}</Text>

      <TouchableOpacity 
        style={styles.bundledetailhomeButton} 
        onPress={() => navigation.navigate("HomeScreen")} // Change to your home screen
      >
        <Text style={styles.bundledetailhomeButtonText}>Go to Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const CartScreen = ({ navigation }) => {
  const { cartItems } = useCart();

  const totalPrice = cartItems.reduce((sum, item) => sum + parseInt(item.Amount.replace("₹", "")) * item.quantity, 0);

  return (
    <SafeAreaView style={styles.shopcontainer}>
      <Text style={styles.shoptitle}>Your Cart</Text>

      {cartItems.length === 0 ? (
        <>
          <Text style={styles.shopmessage}>Your cart is empty.</Text>
          <TouchableOpacity style={styles.shopButton} onPress={() => navigation.navigate("HomeScreen")}>
            <Text style={styles.shopButtonText}>Continue Shopping</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image source={{ uri: item.image }} style={styles.cartImage} />
                <View style={styles.cartDetails}>
                  <Text style={styles.cartItemName}>{item.itemname}</Text>
                  <Text style={styles.cartItemPrice}>₹{item.Amount}</Text>
                  <Text style={styles.cartItemQuantity}>Qty: {item.quantity}</Text>
                </View>
              </View>
            )}
          />
          <Text style={styles.totalAmountText}>Total: ₹{totalPrice}</Text>
        </>
      )}
    </SafeAreaView>
  );
};




//cart context


export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item, quantity) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity }];
      }
    });
  };

  const getCartCount = () => cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, getCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);












const HomeScreen = ({ navigation }) => (
  
  <SafeAreaView style={styles.mainContainer}>
    <CircularMenu navigation={navigation} />
    <CategoryFilterScreen navigation={navigation} />
  </SafeAreaView>
  
);

const AppNavigator = () => (
  <NavigationIndependentTree>
  <CartProvider>
  <NavigationContainer>
    <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="MenuScreen" component={MenuScreen} />
      <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
      <Stack.Screen name="BundleDetailScreen" component={BundleDetailScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  </CartProvider>
  </NavigationIndependentTree>
);

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#fff', paddingTop: 30 },
  headerContainer: { flexDirection: 'row', backgroundColor: 'lightgrey', alignItems: 'center', padding: 15, borderRadius: 10, marginHorizontal: 20 },
  headerText: { flex: 1, fontSize: 20, color: 'blue', fontWeight: 'bold', textAlign: 'center' },
  menuButton: { width: 40, height: 40, borderRadius: 25, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' },
  categoryContainer: { paddingVertical: 10 },
  categoryButton: { marginHorizontal: 5, paddingVertical: 8, paddingHorizontal: 12, backgroundColor: "#ddd", borderRadius: 10 },
  selectedCategory: { backgroundColor: "#FF5722" },
  categoryText: { fontSize: 14, fontWeight: "bold" },
  selectedText: { color: "#fff" },
  promoCardContainer: {
    flex: 1,
    margin: 8,
    paddingBottom: 10,
    minHeight: 320, // Increased height
  },
  promoCard: {
    borderRadius: 15,
    overflow: "hidden",
    elevation: 8,
    paddingBottom: 20,
    backgroundColor: "white",
    minHeight: 280, // Ensure enough space for the button
  },
  promoImage: { width: "100%", height: 150 },
  promoDetails: {
    flexGrow: 1, 
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between", 
    width: "100%",
  },  
  promoItemName: { fontSize: 14, fontWeight: "bold", color: "#FF5722" },
  promoTitle: { fontSize: 14, fontWeight: "bold", marginVertical: 4 },
  promoPrice: { fontSize: 20, color: "#555" },
  promoButton: {
    flexDirection: "row",
    backgroundColor: "#FF5722",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%", // Ensures full width
  },
  
  promoButtonText: { color: "#fff", fontSize: 12, fontWeight: "bold", marginRight: 5 },


  //Buy now detail style
  backButton: { margin: 10 },
  detailImage: { width: "100%", height: 300, resizeMode: "contain" },
  detailTitle: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginTop: 10 },
  detailSubtitle: { fontSize: 18, color: "gray", textAlign: "center" },
  detailPrice: { fontSize: 22, color: "#FF5722", textAlign: "center", marginVertical: 10 },
  buyNowButton: {
    flex: 1,
    backgroundColor: "#FF5722",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buyNowText: { color: "#fff", fontSize: 16, fontWeight: "bold" },

  //Product Detail Style
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  quantityButton: {
    backgroundColor: "#FF5722",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalAmountText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF5722",
    textAlign: "center",
    marginVertical: 15,
  },

  //Bundle Detail Page
  bundledetailcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  bundledetailtitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  bundledetailinfo: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  bundledetailhomeButton: {
    marginTop: 20,
    backgroundColor: "#FF5722",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  bundledetailhomeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  //Add to cart
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginRight: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  //Shopping Cart
  shopcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  shoptitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  shopmessage: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  shopButton: {
    backgroundColor: "#FF5722",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  shopButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  //Full cart Detail style
  cartincartButton: {
    padding: 10,
    position: "relative",
  },
  cartincartBadge: {
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
  cartinbadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },

  
});

export default AppNavigator;











