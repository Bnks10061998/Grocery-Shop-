import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import React, { createContext,useContext,useState,useEffect,useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, SafeAreaView, ScrollView,Alert,Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";
// import CheckBox from "@react-native-community/checkbox";
import { CheckBox } from "react-native-elements";

const Stack = createStackNavigator();
const CartContext = createContext();
const CircularMenu = ({ navigation, onBrandSelect = () => {} }) => {

  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const { favoriteItems } = useFavorite();
  const favoriteCount = favoriteItems.length;

  const [modalVisible, setModalVisible] = useState(false);
  const Brand = ["Bingo", "Britannia", "Parle", "Sunfeast", "Unibic", "Cadbury", "Nestle", "Aachi", "Sakthi"];

  return (
    <View style={styles.headerContainer}>
      {/* Menu Button - Opens Brand Filter Modal */}
      <TouchableOpacity style={styles.menuButton} onPress={() => setModalVisible(true)}>
        <Icon name="menu" size={18} color="black" />
      </TouchableOpacity>

      <Text style={styles.headerText}>Grocery Daily</Text>

      {/* Cart Button */}
      <TouchableOpacity style={styles.cartincartButton} onPress={() => navigation.navigate("CartScreen")}>
        <MaterialCommunityIcons name="cart" size={24} color="black" />
        {cartCount > 0 && (
          <View style={styles.cartincartBadge}>
            <Text style={styles.cartinbadgeText}>{cartCount}</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Favorite Button */}
      <TouchableOpacity style={styles.favoriteheaderfavoriteButton} onPress={() => navigation.navigate("FavoriteScreen")}>
        <MaterialCommunityIcons name="heart" size={24} color="red" />
        {favoriteCount > 0 && (
          <View style={styles.favoriteheaderfavoriteBadge}>
            <Text style={styles.favoriteheaderbadgeText}>{favoriteCount}</Text>
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("PriceFilterScreen", { data: promoData })}>
      <MaterialCommunityIcons name="filter" size={24} color="black" />
      </TouchableOpacity>

      {/* Brand Filter Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.BrandmodalContainer}>
          <View style={styles.BrandmodalContent}>
            <Text style={styles.BrandmodalTitle}>Select Brand</Text>
            <FlatList
              data={Brand}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.BrandbrandItem}
                  onPress={() => {
                    onBrandSelect(item);
                    setModalVisible(false);
                    navigation.navigate("BrandFilterScreen", { selectedBrand: item });
                  }}
                >
                  <Text style={styles.BrandbrandText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.BrandcloseButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.BrandcloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

//Price Filter option
const PriceFilterScreen = ({ route }) => {
  const navigation = useNavigation();
  const { data } = route.params || {}; // Get products data if passed

  // Define price ranges
  const priceRanges = [
    { label: "Below ₹50", min: 0, max: 50 },
    { label: "₹50 - ₹100", min: 50, max: 100 },
    { label: "₹100 - ₹200", min: 100, max: 200 },
    { label: "Above ₹200", min: 200, max: Infinity },
  ];

  const [selectedRanges, setSelectedRanges] = useState([]);

  // Toggle selection of a price range
  const togglePriceRange = (range) => {
    if (selectedRanges.includes(range)) {
      setSelectedRanges(selectedRanges.filter((item) => item !== range));
    } else {
      setSelectedRanges([...selectedRanges, range]);
    }
  };

  // Filter products based on selected price ranges
  const filteredProducts =
    data?.filter((item) => {
      const itemPrice = parseInt(item.Amount.replace("₹", ""));
      return selectedRanges.some((range) => itemPrice >= range.min && itemPrice <= range.max);
    }) || [];

  return (
    <View style={styles.Pricedetailcontainer}>
      <Text style={styles.Pricedetailtitle}>Filter by Price</Text>

      {/* Price Range Selection */}
      <View style={styles.PricedetailcheckBoxContainer}>
        {priceRanges.map((range, index) => (
          <CheckBox
            key={index}
            title={range.label}
            checked={selectedRanges.includes(range)}
            onPress={() => togglePriceRange(range)}
            containerStyle={{ backgroundColor: "transparent", borderWidth: 0 }}
          />
        ))}
      </View>

      {/* Filtered Product List */}
      <FlatList
  data={filteredProducts}
  keyExtractor={(item) => item.id}
  numColumns={2} // Ensures two-column layout
  columnWrapperStyle={{ justifyContent: "space-between", paddingHorizontal: 10 }} // Adds spacing between columns
  renderItem={({ item }) => (
    <View style={styles.PricedetailproductCard}>
      <Image source={{ uri: item.image }} style={styles.PricedetailproductImage} />
      <Text style={styles.PricedetailproductName}>{item.itemname}</Text>
      <Text style={styles.PricedetailproductPrice}>{item.Amount}</Text>
      <TouchableOpacity
        style={styles.PricedetailbuyButton}
        onPress={() => navigation.navigate("ProductDetailScreen", { item })}
      >
        <Text style={styles.PricedetailbuyButtonText}>Buy Now</Text>
      </TouchableOpacity>
    </View>
      )}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
    </View>
  );
};

//Brand Filter option 
const BrandFilterScreen = ({ navigation }) => {
  const route = useRoute();
  const { selectedBrand } = route.params;

  // Filter products by brand
  const filteredProducts = promoData.filter((item) => item.Brand === selectedBrand);

  return (
    <View style={styles.brandfilterstylecontainer}>
      <Text style={styles.brandfilterstyletitle}>{selectedBrand} Products</Text>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.brandfilterstyleproductCard}>
            <Image source={{ uri: item.image }} style={styles.brandfilterstyleproductImage} />
            <Text style={styles.brandfilterstyleproductName}>{item.itemname}</Text>
            <Text style={styles.brandfilterstyleproductPrice}>{item.Amount}</Text>
            <TouchableOpacity 
              style={styles.brandfilterstylebuyButton} 
              onPress={() => navigation.navigate("ProductDetailScreen", { item })}
            >
              <Text style={styles.brandfilterstylebuyButtonText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        )}
      />
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
  { id: "2", name: "Vegetable",unit:"kg" },
  { id: "3", name: "Fruit",unit:"kg" },
  { id: "4", name: "Lays",unit:"pack" },
  { id: "5", name: "Biscuit",unit:"pack" },
  { id: "6", name: "Chocolate",unit:"pack" },
  { id: "7", name: "Masala",unit:"g" }
];

const promoData = [
  { id: "1", image: "https://smartyield.in/wp-content/uploads/2021/06/Tomato-red.png", itemname: "Tomato", title: "1", Amount: "₹20",Category: "Vegetable",unit:"kg" },
  { id: "2", image: "https://media.istockphoto.com/id/157430678/photo/three-potatoes.jpg?s=612x612&w=0&k=20&c=qkMoEgcj8ZvYbzDYEJEhbQ57v-nmkHS7e88q8dv7TSA=", itemname: "Potato", title: "1", Amount: "₹50",Category: "Vegetable",unit:"kg" },
  { id: "3", image: "https://groceryatdoor-com-2.myshopify.com/cdn/shop/products/Carrot-Vegetable_d019ad4a-e1f1-4933-bbc5-859a868a078a_large.jpeg?v=1407880557", itemname: "Carrot", title: "1", Amount: "₹60",Category: "Vegetable",unit:"kg"},
  { id: "4", image: "https://samsgardenstore.com/cdn/shop/files/Greenroundbrinjal.jpg", itemname: "Brinjal", title: "1", Amount: "₹30",Category: "Vegetable",unit:"kg"},
  { id: "5", image: "https://zamaorganics.com/cdn/shop/files/Untitleddesign_5_11zon.png", itemname: "Eggplant", title: "1", Amount: "₹25",Category: "Vegetable",unit:"kg" },
  { id: "6", image: "https://www.plantsnplanters.com/media/catalog/product/cache/1/thumbnail/600x/17f82f742ffe127f42dca9de82fb58b1/B/r/Broccoli-Green-Vegetable-Seeds_1.jpg", itemname: "Broccoli", title: "1", Amount: "₹60",Category: "Vegetable",unit:"kg" },
  { id: "7", image: "https://nativeindianorganics.com/wp-content/uploads/2022/11/cabbage-430x430.jpg", itemname: "Cabbage", title: "1", Amount: "₹35",Category: "Vegetable",unit:"kg" },
  { id: "8", image: "https://static.libertyprim.com/files/varietes/chou-fleur-large.jpg?1569513621", itemname: "Cauliflower", title: "1 Piece", Amount: "₹25",Category: "Vegetable",unit:"kg" },
  { id: "9", image: "https://www.jiomart.com/images/product/original/rvfuquuook/paryavaraan-kohlrabi-vegetable-seeds-for-garden-pack-of-30-seeds-product-images-orvfuquuook-p606511531-0-202312041936.jpg?im=Resize=(1000,1000)", itemname: "Kohirabi ", title: "1", Amount: "₹80",Category: "Vegetable",unit:"kg" },
  { id: "10", image: "https://samsgardenstore.com/cdn/shop/files/51CGEjx6iBL._AC_UF1000_1000_QL80.jpg?v=1725803117", itemname: "Lady's Finger", title: "1", Amount: "₹25",Category: "Vegetable",unit:"kg" },
  { id: "11", image: "https://m.media-amazon.com/images/I/51DJ-9xkuQL.jpg", itemname: "Onion", title: "1", Amount: "₹85",Category: "Vegetable",unit:"kg" },
  { id: "12", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3iSEI-WI_s6ZiBPqvpWomgSvnMRfRgULPHw&s", itemname: "Small Onion", title: "1", Amount: "₹70",Category: "Vegetable",unit:"kg" },
  { id: "13", image: "https://media.istockphoto.com/id/158690297/photo/daikon-radishes-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=k_KVuE_UbE-shIiG2z2xY8Fu7BqKy_bk4D9NfZdrTfM=", itemname: "Parsnip", title: "1", Amount: "₹40",Category: "Vegetable",unit:"kg" },
  { id: "14", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh9G4A4df3XUFYA62a0fYVShC0LweF1tJPww&s", itemname: "Pea", title: "1", Amount: "₹150",Category: "Vegetable",unit:"kg" },
  { id: "15", image: "https://5.imimg.com/data5/SELLER/Default/2023/6/316774192/AM/QQ/MA/3042133/fresh-red-beetroot-500x500.jpg", itemname: "Beet Root", title: "1", Amount: "₹90",Category: "Vegetable",unit:"kg"},
  { id: "16", image: "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Pumpkin-sliced-open-f2b8dde.jpg", itemname: "Pumpkin", title: "1", Amount: "₹30",Category: "Vegetable",unit:"kg" },
  { id: "17", image: "https://cdn-prod.medicalnewstoday.com/content/images/articles/285/285753/beans.jpg", itemname: "Green beans", title: "1", Amount: "₹25",Category: "Vegetable",unit:"kg" },
  { id: "18", image: "https://ilovenursery.com/wp-content/uploads/2024/12/ILN_Bitter-Gourd-Summer-Special_Seeds.jpg", itemname: "Bitter Gourd", title: "1", Amount: "₹60",Category: "Vegetable",unit:"kg" },
  { id: "19", image: "https://thevegetablebazaar.in/wp-content/uploads/2022/04/Lemon.png", itemname: "Lemon", title: "1", Amount: "₹20",Category: "Vegetable",unit:"kg" },
  { id: "20", image: "https://dookan.com/cdn/shop/files/Dookan_Green_Bananas_500g_8b5765c5-d508-4670-b22b-7c03a8829506.png?v=1729254645&width=1445", itemname: "Raw Banana", title: "1", Amount: "₹50",Category: "Vegetable",unit:"kg" },
  { id: "21", image: "https://fruitique.in/cdn/shop/products/sweet_potato_1500_x_1500_4a960e48-6c3f-439b-a2cc-af3b26369348_750x810.jpg?v=1632308871", itemname: "Sweet Potato", title: "1", Amount: "₹60",Category: "Vegetable",unit:"kg" },
  { id: "22", image: "https://nativeindianorganics.com/wp-content/uploads/2022/11/snake-gourd.jpg", itemname: "Snake Gourd", title: "1", Amount: "₹30",Category: "Vegetable",unit:"kg" },
  { id: "23", image: "https://5.imimg.com/data5/EF/NF/MY-3822418/untitled.png", itemname: "Ginger", title: "1", Amount: "₹25",Category: "Vegetable",unit:"kg" },
  { id: "24", image: "https://organicbazar.net/cdn/shop/products/Untitled-design-6.jpg?v=1694169392", itemname: "Ridge Gourd", title: "1", Amount: "₹60",Category: "Vegetable",unit:"kg" },
  { id: "25", image: "https://t3.ftcdn.net/jpg/05/85/66/68/360_F_585666841_9PNi8WG6rn45vYLY54YZGvxLblBVkAvh.jpg", itemname: "Drumstick", title: "1", Amount: "₹25",Category: "Vegetable",unit:"kg" },
  { id: "26", image: "https://img.thecdn.in/241613/1660364504674_SKU-0035_0.jpg?width=600&format=webp", itemname: "Sweet Gourd", title: "1", Amount: "₹25",Category: "Vegetable",unit:"kg" },
  { id: "27", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO1vybuoiG2rYhSPos3VSzZX2bNlzo_jY-Ug&s", itemname: "Long Bean", title: "1", Amount: "₹25",Category: "Vegetable",unit:"kg" },
  { id: "28", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb5Ib_ebgZWnoB9tvcrIlVKvHRnE55q9SVEQ&s", itemname: "Turnip", title: "1", Amount: "₹25",Category: "Vegetable",unit:"kg" },
  { id: "29", image: "https://www.veggovilla.com/img/productimg/button_mushroom_200gm_1-719.webp", itemname: "Mushroom", title: "1", Amount: "₹25",Category: "Vegetable",unit:"kg" },
  { id: "30", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxUY8YKliJiVDdcJlG3Xq07pnhoXy5flcPug&s", itemname: "Chilli", title: "1", Amount: "₹25",Category: "Vegetable",unit:"kg" },
  { id: "31", image: "https://www.farmsteadfoods.com/wp-content/uploads/2016/05/lima-beans.jpg", itemname: "Lima Beans", title: "1", Amount: "₹25",Category: "Vegetable",unit:"kg" },
  { id: "32", image: "https://www.waangoo.com/cdn/shop/products/0016113_fresh-broad-beans-india.jpg?v=1694721184", itemname: "Elephant Ear Beans", title: "1", Amount: "₹25",Category: "Vegetable",unit:"kg" },
  { id: "33", image: "https://m.media-amazon.com/images/I/61EaCW5vtWL._AC_UF1000,1000_QL80_.jpg", itemname: "Red Beans", title: "1", Amount: "₹25",Category: "Vegetable",unit:"kg" },
  { id: "34", image: "https://eangadi.in/image/cache/catalog/Chicken/retouch%202-350x350.jpg", itemname: "Karunai Kilangu", title: "1", Amount: "₹25",Category: "Vegetable",unit:"kg" },
  { id: "35", image: "https://kurinjibazaar.com/storage/senaikaarakarunai-kilangu-400x400-800x800.jpg", itemname: "Senai Kilangu", title: "1", Amount: "₹25",Category: "Vegetable",unit:"kg" },
  { id: "36", image: "https://smartyield.in/wp-content/uploads/2021/06/images-1.jpeg", itemname: "Baby Potato", title: "1", Amount: "₹25",Category: "Vegetable",unit:"kg" },
  { id: "37", image: "https://store.terragreensorganic.com/storage/45-800x800.jfif", itemname: "White Pumpkin", title: "1", Amount: "₹25",Category: "Vegetable",unit:"kg" },
];

const PromoCard = ({ item, navigation }) => {
  const { toggleFavorite, favoriteItems } = useFavorite();
  const isFavorite = favoriteItems.some((favItem) => favItem.id === item.id);

  const handleToggleFavorite = () => {
    toggleFavorite(item);

    if (!isFavorite) {
      Toast.show({
        type: "success",
        text1: "Added to Favorites",
        text2: `${item.itemname} has been added!`,
        position: "top",
        visibilityTime: 600, // 3 seconds
        topOffset: 50, // Distance from the top
      });
    }
  };

  return (
    <View style={styles.promoCardContainer}>
      <LinearGradient colors={["#ff9a9e", "#fad0c4"]} style={styles.promoCard}>
        <Image source={{ uri: item.image }} style={styles.promoImage} />
        
        {/* Favorite Icon */}
        <TouchableOpacity 
          style={styles.favoriteIcon} 
          onPress={handleToggleFavorite}
        >
          <MaterialCommunityIcons 
            name={isFavorite ? "heart" : "heart-outline"} 
            size={24} 
            color={isFavorite ? "red" : "black"} 
          />
        </TouchableOpacity>

        <View style={styles.promoDetails}>
          <Text style={styles.promoItemName}>{item.itemname}</Text>
          <Text style={styles.promoTitle}>{item.title} {item.unit}</Text>
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
};

const FavoriteContext = createContext();

const FavoriteProvider = ({ children }) => {
  const [favoriteItems, setFavoriteItems] = useState([]);

  // Load favorites from AsyncStorage when the app starts
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem("favorites");
        if (storedFavorites) {
          setFavoriteItems(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error("Failed to load favorites", error);
      }
    };
    loadFavorites();
  }, []);

  // Save favorites to AsyncStorage
  const saveFavorites = async (items) => {
    try {
      await AsyncStorage.setItem("favorites", JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save favorites", error);
    }
  };

  // Toggle favorite status
  const toggleFavorite = (item) => {
    setFavoriteItems((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some((fav) => fav.id === item.id);
      let updatedFavorites;
      if (isAlreadyFavorite) {
        updatedFavorites = prevFavorites.filter((fav) => fav.id !== item.id);
      } else {
        updatedFavorites = [...prevFavorites, item];
      }

      saveFavorites(updatedFavorites); // Save updated favorites to AsyncStorage
      return updatedFavorites;
    });
  };

  return (
    <FavoriteContext.Provider value={{ favoriteItems, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

// Custom hook to use Favorite Context
const useFavorite = () => useContext(FavoriteContext);



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
      <Text style={styles.detailSubtitle}>{item.title}{item.unit}</Text>
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
        onPress={() => navigation.navigate("HomeScreen")} 
      >
        <Text style={styles.bundledetailhomeButtonText}>Go to Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const CartScreen = ({ navigation }) => {
  const { cartItems, setCartItems } = useCart();
  const [countdown, setCountdown] = useState(800);
  const timerRef = useRef(null);

  useEffect(() => {
    if (cartItems.length > 0) {
      timerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setCartItems([]);
            Alert.alert("Cart Cleared!", "Your cart has been emptied due to inactivity.");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
  
    return () => clearInterval(timerRef.current);
  }, [cartItems]);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + parseInt(item.Amount.replace("₹", "")) * item.quantity, 
    0
  );

  const handleConfirmOrder = () => {
    setCartItems([]);
    Alert.alert("Order Confirmed!", "Thank you for your purchase.", [
      { text: "OK", onPress: () => navigation.navigate("HomeScreen") }
    ]);
  };

  const handleDeleteItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleIncreaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      )
    );
  };

  return (
    <SafeAreaView style={styles.updatecartcontainer}>
      <Text style={styles.updatecarttitle}>Your Cart</Text>

      {cartItems.length === 0 ? (
        <View style={styles.updatecartemptyCartContainer}>
          <Text style={styles.updatecartemptyCartText}>Your cart is empty.</Text>
          <TouchableOpacity 
            style={styles.updatecartshopButton} 
            onPress={() => navigation.navigate("HomeScreen")}
          >
            <Text style={styles.updatecartshopButtonText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {/* 🛒 Cart Items List */}
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const itemPrice = parseInt(item.Amount.replace("₹", ""));
              const subtotal = itemPrice * item.quantity;

              return (
                <View style={styles.updatecartcartItem}>
                  {/* Product Image */}
                  <Image source={{ uri: item.image }} style={styles.updatecartcartImage} />
                  
                  {/* Product Details */}
                  <View style={styles.updatecartcartDetails}>
                    <Text style={styles.updatecartcartItemName}>{item.itemname}
                      <Text style={styles.updatecartcartItemPrice}> {item.title}{item.unit}</Text>
                    </Text>
                    
                    <Text style={styles.updatecartcartItemPrice}>₹{itemPrice}</Text>

                    {/* Quantity Control */}
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity 
                        style={styles.quantityButton} 
                        onPress={() => handleDecreaseQuantity(item.id)}
                      >
                        <Text style={styles.quantityButtonText}>-</Text>
                      </TouchableOpacity>

                      <Text style={styles.quantityText}>{item.quantity}</Text>

                      <TouchableOpacity 
                        style={styles.quantityButton} 
                        onPress={() => handleIncreaseQuantity(item.id)}
                      >
                        <Text style={styles.quantityButtonText}>+</Text>
                      </TouchableOpacity>
                    </View>

                    {/* Display Subtotal */}
                    <Text style={styles.subtotalText}>Subtotal: ₹{subtotal}</Text>
                  </View>

                  {/* Delete Button */}
                  <TouchableOpacity 
                    style={styles.cartdetailfulldeleteButton} 
                    onPress={() => handleDeleteItem(item.id)}
                  >
                    <Text style={styles.cartdetailfullbuttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />

          {/* 🏁 Footer Section */}
          <View style={styles.updatecartfooter}>
            <Text style={styles.updatecarttotalPrice}>Total: ₹{totalPrice}</Text>
            <TouchableOpacity style={styles.updatecartcheckoutButton} onPress={handleConfirmOrder}>
              <Text style={styles.updatecartcheckoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>

            <View style={styles.gohomecontainer}>
              {/* Timer Display */}
              <Text style={styles.timerText}>
                Cart resets in: {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
              </Text>

              <TouchableOpacity style={styles.gohomeaddButton} onPress={() => navigation.navigate("HomeScreen")}>
                <Text style={styles.updatecartcheckoutButtonText}>Go to Homepage</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};


const CartProvider = ({ children }) => {
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
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, getCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
const useCart = () => useContext(CartContext);


const FavoriteScreen = ({ navigation }) => {
  const { favoriteItems, toggleFavorite } = useFavorite();

  return (
    <View style={styles.favoritedetailcontainer}>
      <Text style={styles.favoritedetailtitle}>Your Favorite Items</Text>

      {favoriteItems.length === 0 ? (
        <Text style={styles.favoritedetailemptyText}>No favorites added yet.</Text>
      ) : (
        <FlatList
          data={favoriteItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.favoritedetailitemContainer}>
              <Image source={{ uri: item.image }} style={styles.favoritedetailimage} />
              <Text style={styles.itemName}>{item.itemname}</Text>

              <TouchableOpacity onPress={() => toggleFavorite(item)} style={styles.favoritedetailremoveButton}>
                <Text style={styles.favoritedetailremoveText}>Remove</Text>
              </TouchableOpacity>
            </View>
        )}
        />
      )}

       {/* "Go to Homepage" Button */}
       <TouchableOpacity style={styles.detailhomepagehomeButton} onPress={() => navigation.navigate("HomeScreen")}>
        <Text style={styles.detailhomepagehomeButtonText}>Go to Homepage</Text>
      </TouchableOpacity>
    </View>
  );
};

const HomeScreen = ({ navigation }) => (
  
  <SafeAreaView style={styles.mainContainer}>
    <CircularMenu navigation={navigation} onBrandSelect={(brand) => console.log("Selected Brand:", brand)}/>
    <CategoryFilterScreen navigation={navigation} />
    <Toast />
  </SafeAreaView>
  
);

const AppNavigator = () => (
  <NavigationIndependentTree>
  <FavoriteProvider>
  <CartProvider>
  <NavigationContainer>
    <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="MenuScreen" component={MenuScreen} />
      <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
      <Stack.Screen name="BundleDetailScreen" component={BundleDetailScreen} />
      <Stack.Screen name="BrandFilterScreen" component={BrandFilterScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
      <Stack.Screen name="PriceFilterScreen" component={PriceFilterScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  </CartProvider>
  </FavoriteProvider>
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

  //Update Cart style
  updatecartcontainer: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  updatecarttitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  updatecartemptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  updatecartemptyCartText: {
    fontSize: 18,
    color: "#555",
    marginBottom: 10,
  },
  updatecartshopButton: {
    backgroundColor: "#ff6b6b",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  updatecartshopButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  updatecartcartItem: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  updatecartcartImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 15,
  },
  updatecartcartDetails: {
    flex: 1,
  },
  updatecartcartItemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  updatecartcartItemPrice: {
    fontSize: 16,
    color: "#28a745",
    fontWeight: "bold",
  },
  updatecartcartItemQuantity: {
    fontSize: 14,
    color: "#555",
  },
  updatecartfooter: {
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 10,
    alignItems: "center",
  },
  updatecarttotalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  updatecartcheckoutButton: {
    backgroundColor: "#ff6b6b",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginLeft:-150,
  },
  updatecartcheckoutButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },

  //Go to Home Page 
  gohomecontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  gohometitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  gohomesubtitle: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginHorizontal: 20,
  },
  gohomeaddButton: {
    // position: "absolute",
    paddingVertical: 10,
    paddingHorizontal: 15,
    bottom: 20,
    right: -100,
    backgroundColor: "#ff6b6b",
    width: 155,
    height: 40,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  favoriteIcon: { position: "absolute", top: 10, right: 10 },
  //Favorite Header style
  favoriteheaderfavoriteButton: {
    position: "relative",
    padding: 10,
  },
  favoriteheaderfavoriteBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "red",
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteheaderbadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  //Favorite details style
  favoritedetailcontainer: { flex: 1, padding: 20, backgroundColor: "#fff" },
  favoritedetailtitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  favoritedetailemptyText: { fontSize: 16, color: "gray", textAlign: "center", marginTop: 20 },
  favoritedetailitemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
  },
  favoritedetailimage: { width: 50, height: 50, marginRight: 10 },
  favoritedetailitemName: { fontSize: 16, flex: 1 },
  favoritedetailremoveText: { color: "red", fontWeight: "bold", },
  favoritedetailremoveButton: {
    position: "absolute", 
    right: 15, // Move to right side
    backgroundColor: "transparent", 
  },
  favoritedetailremoveText: { 
    color: "red", 
    fontWeight: "bold", 
    fontSize: 14 
  },

  //Favorite Details go to homepage style
  detailhomepagehomeButton: {
    marginTop: 20,
    backgroundColor: "#ff5a5f",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  detailhomepagehomeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  //Detail Cart Edit and Delete style
  cartdetailfulleditButton: {
    backgroundColor: "#fbc02d",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginRight: 10,
  },
  cartdetailfulldeleteButton: {
    backgroundColor: "#e53935",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  cartdetailfullbuttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  //Brand Style
  BrandmodalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  BrandmodalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  BrandmodalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  BrandbrandItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "100%",
    alignItems: "center",
  },
  BrandbrandText: {
    fontSize: 16,
  },
  BrandcloseButton: {
    marginTop: 10,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  BrandcloseText: {
    color: "white",
    fontWeight: "bold",
  },
  //Brand filter style
  brandfilterstylecontainer: { flex: 1, padding: 16, backgroundColor: "#fff" },
  brandfilterstyletitle: { fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  brandfilterstyleproductCard: { padding: 10, backgroundColor: "#f9f9f9", marginBottom: 10, borderRadius: 8 },
  brandfilterstyleproductImage: { width: "100%", height: 120, resizeMode: "contain" },
  brandfilterstyleproductName: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
  brandfilterstyleproductPrice: { fontSize: 14, color: "green", marginTop: 2 },
  brandfilterstylebuyButton: { backgroundColor: "orange", padding: 10, borderRadius: 5, marginTop: 5, alignItems: "center" },
  brandfilterstylebuyButtonText: { color: "white", fontSize: 14, fontWeight: "bold" },

  Pricedetailcontainer: {
    flex: 1,
  backgroundColor: "#f8f8f8",
  paddingTop: 5,
  },
  Pricedetailtitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10, // Increased margin for more space below the title
    marginTop: 30, // Add space above the title if needed
    textAlign: "center",
    paddingHorizontal: 20,
  },
  PricedetailcheckBoxContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    width:330,
    margin:15,
  },
  PricedetailcheckBox: {
    backgroundColor: "transparent",
    borderWidth: 0,
    paddingVertical: 5,
  },
  PricedetailcheckBoxLabel: {
    fontSize: 16,
    color: "#333",
  },
  PricedetailproductCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    margin: 3,
    width: "48%", // Adjust width so two items fit in one row
    height: 230, // Set proper height
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: "space-between",
    alignItems: "center",
  },
  PricedetailproductImage: {
    width: 100, // Larger image for better visibility
    height: 100,
    borderRadius: 10,
    resizeMode: "contain",
  },
  PricedetailproductInfo: {
    flex: 1,
    marginLeft: 15,
  },
  PricedetailproductName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  PricedetailproductPrice: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  PricedetailbuyButton: {
    backgroundColor: "#ff6600",
    paddingVertical: 8,
    borderRadius: 8,
    width: "80%", // Makes sure it's not too wide
    alignSelf: "center",
  },
  PricedetailbuyButtonText: {
    color: "#fff",
    fontSize: 16, // Slightly larger text for better readability
    fontWeight: "bold",
    textAlign: "center", // Ensures text is centered
  },
});

export default AppNavigator;