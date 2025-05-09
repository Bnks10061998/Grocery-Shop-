import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();

const CircularMenu = ({ navigation }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('MenuScreen')}>
        <Icon name="menu" size={18} color='black' />
      </TouchableOpacity>
      <Text style={styles.headerText}>Grocery Daily</Text>
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
  { id: "1", image: "https://smartyield.in/wp-content/uploads/2021/06/Tomato-red.png", itemname: "Tomato", title: "1 KG", Amount: "₹20",Category: "Vegetable" },
  { id: "2", image: "https://media.istockphoto.com/id/157430678/photo/three-potatoes.jpg?s=612x612&w=0&k=20&c=qkMoEgcj8ZvYbzDYEJEhbQ57v-nmkHS7e88q8dv7TSA=", itemname: "Potato", title: "1 KG", Amount: "₹50",Category: "Vegetable" },
  { id: "3", image: "https://groceryatdoor-com-2.myshopify.com/cdn/shop/products/Carrot-Vegetable_d019ad4a-e1f1-4933-bbc5-859a868a078a_large.jpeg?v=1407880557", itemname: "Carrot", title: "1 KG", Amount: "₹60",Category: "Vegetable" },
  { id: "4", image: "https://samsgardenstore.com/cdn/shop/files/Greenroundbrinjal.jpg", itemname: "Brinjal", title: "1 KG", Amount: "₹30",Category: "Vegetable" },
  { id: "5", image: "https://zamaorganics.com/cdn/shop/files/Untitleddesign_5_11zon.png", itemname: "Eggplant", title: "1 KG", Amount: "₹25",Category: "Vegetable" },
  { id: "6", image: "https://www.plantsnplanters.com/media/catalog/product/cache/1/thumbnail/600x/17f82f742ffe127f42dca9de82fb58b1/B/r/Broccoli-Green-Vegetable-Seeds_1.jpg", itemname: "Broccoli", title: "1 KG", Amount: "₹60",Category: "Vegetable" },
  { id: "7", image: "https://nativeindianorganics.com/wp-content/uploads/2022/11/cabbage-430x430.jpg", itemname: "Cabbage", title: "1 KG", Amount: "₹35",Category: "Vegetable" },
  { id: "8", image: "https://static.libertyprim.com/files/varietes/chou-fleur-large.jpg?1569513621", itemname: "Cauliflower", title: "1 Piece", Amount: "₹25",Category: "Vegetable" },
  { id: "9", image: "https://www.jiomart.com/images/product/original/rvfuquuook/paryavaraan-kohlrabi-vegetable-seeds-for-garden-pack-of-30-seeds-product-images-orvfuquuook-p606511531-0-202312041936.jpg?im=Resize=(1000,1000)", itemname: "Kohirabi ", title: "1 KG", Amount: "₹80",Category: "Vegetable" },
  { id: "10", image: "https://samsgardenstore.com/cdn/shop/files/51CGEjx6iBL._AC_UF1000_1000_QL80.jpg?v=1725803117", itemname: "Lady's Finger", title: "1 KG", Amount: "₹25",Category: "Vegetable" },
  { id: "11", image: "https://m.media-amazon.com/images/I/51DJ-9xkuQL.jpg", itemname: "Onion", title: "1 KG", Amount: "₹85",Category: "Vegetable" },
  { id: "12", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3iSEI-WI_s6ZiBPqvpWomgSvnMRfRgULPHw&s", itemname: "Small Onion", title: "1 KG", Amount: "₹70",Category: "Vegetable" },
  { id: "13", image: "https://media.istockphoto.com/id/158690297/photo/daikon-radishes-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=k_KVuE_UbE-shIiG2z2xY8Fu7BqKy_bk4D9NfZdrTfM=", itemname: "Parsnip", title: "1 KG", Amount: "₹40",Category: "Vegetable" },
  { id: "14", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh9G4A4df3XUFYA62a0fYVShC0LweF1tJPww&s", itemname: "Pea", title: "1 KG", Amount: "₹150",Category: "Vegetable" },
  { id: "15", image: "https://5.imimg.com/data5/SELLER/Default/2023/6/316774192/AM/QQ/MA/3042133/fresh-red-beetroot-500x500.jpg", itemname: "Beet Root", title: "1 KG", Amount: "₹90",Category: "Vegetable"},
  { id: "16", image: "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Pumpkin-sliced-open-f2b8dde.jpg", itemname: "Pumpkin", title: "1 KG", Amount: "₹30",Category: "Vegetable" },
  { id: "17", image: "https://cdn-prod.medicalnewstoday.com/content/images/articles/285/285753/beans.jpg", itemname: "Green beans", title: "1 KG", Amount: "₹25",Category: "Vegetable" },
  { id: "18", image: "https://ilovenursery.com/wp-content/uploads/2024/12/ILN_Bitter-Gourd-Summer-Special_Seeds.jpg", itemname: "Bitter Gourd", title: "1 KG", Amount: "₹60",Category: "Vegetable" },
  { id: "19", image: "https://thevegetablebazaar.in/wp-content/uploads/2022/04/Lemon.png", itemname: "Lemon", title: "1 KG", Amount: "₹20",Category: "Vegetable" },
  { id: "20", image: "https://dookan.com/cdn/shop/files/Dookan_Green_Bananas_500g_8b5765c5-d508-4670-b22b-7c03a8829506.png?v=1729254645&width=1445", itemname: "Raw Banana", title: "1 KG", Amount: "₹50",Category: "Vegetable" },
  { id: "21", image: "https://fruitique.in/cdn/shop/products/sweet_potato_1500_x_1500_4a960e48-6c3f-439b-a2cc-af3b26369348_750x810.jpg?v=1632308871", itemname: "Sweet Potato", title: "1 KG", Amount: "₹60",Category: "Vegetable" },
  { id: "22", image: "https://nativeindianorganics.com/wp-content/uploads/2022/11/snake-gourd.jpg", itemname: "Snake Gourd", title: "1 KG", Amount: "₹30",Category: "Vegetable" },
  { id: "23", image: "https://5.imimg.com/data5/EF/NF/MY-3822418/untitled.png", itemname: "Ginger", title: "1 KG", Amount: "₹25",Category: "Vegetable" },
  { id: "24", image: "https://organicbazar.net/cdn/shop/products/Untitled-design-6.jpg?v=1694169392", itemname: "Ridge Gourd", title: "1 KG", Amount: "₹60",Category: "Vegetable" },
  { id: "25", image: "https://t3.ftcdn.net/jpg/05/85/66/68/360_F_585666841_9PNi8WG6rn45vYLY54YZGvxLblBVkAvh.jpg", itemname: "Drumstick", title: "1 KG", Amount: "₹25",Category: "Vegetable" },
  { id: "26", image: "https://img.thecdn.in/241613/1660364504674_SKU-0035_0.jpg?width=600&format=webp", itemname: "Sweet Gourd", title: "1 KG", Amount: "₹25",Category: "Vegetable" },
  { id: "27", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO1vybuoiG2rYhSPos3VSzZX2bNlzo_jY-Ug&s", itemname: "Long Bean", title: "1 KG", Amount: "₹25",Category: "Vegetable" },
  { id: "28", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb5Ib_ebgZWnoB9tvcrIlVKvHRnE55q9SVEQ&s", itemname: "Turnip", title: "1 KG", Amount: "₹25",Category: "Vegetable" },
  { id: "29", image: "https://www.veggovilla.com/img/productimg/button_mushroom_200gm_1-719.webp", itemname: "Mushroom", title: "1 KG", Amount: "₹25",Category: "Vegetable" },
  { id: "30", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxUY8YKliJiVDdcJlG3Xq07pnhoXy5flcPug&s", itemname: "Chilli", title: "1 KG", Amount: "₹25",Category: "Vegetable" },
  { id: "31", image: "https://www.farmsteadfoods.com/wp-content/uploads/2016/05/lima-beans.jpg", itemname: "Lima Beans", title: "1 KG", Amount: "₹25",Category: "Vegetable" },
  { id: "32", image: "https://www.waangoo.com/cdn/shop/products/0016113_fresh-broad-beans-india.jpg?v=1694721184", itemname: "Elephant Ear Beans", title: "1 KG", Amount: "₹25",Category: "Vegetable" },
  { id: "33", image: "https://m.media-amazon.com/images/I/61EaCW5vtWL._AC_UF1000,1000_QL80_.jpg", itemname: "Red Beans", title: "1 KG", Amount: "₹25",Category: "Vegetable" },
  { id: "34", image: "https://eangadi.in/image/cache/catalog/Chicken/retouch%202-350x350.jpg", itemname: "Karunai Kilangu", title: "1 KG", Amount: "₹25",Category: "Vegetable" },
  { id: "35", image: "https://kurinjibazaar.com/storage/senaikaarakarunai-kilangu-400x400-800x800.jpg", itemname: "Senai Kilangu", title: "1 KG", Amount: "₹25",Category: "Vegetable" },
  { id: "36", image: "https://smartyield.in/wp-content/uploads/2021/06/images-1.jpeg", itemname: "Baby Potato", title: "1 KG", Amount: "₹25",Category: "Vegetable" },
  { id: "37", image: "https://store.terragreensorganic.com/storage/45-800x800.jfif", itemname: "White Pumpkin", title: "1 KG", Amount: "₹25",Category: "Vegetable" },
  { id: "38", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFMzVXnpIZG1skrJskB4D4oPePoLxMHSo4Lg&s", itemname: "Apple", title: "1 KG", Amount: "₹25",Category: "Fruit" },
  { id: "39", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXSP090Mw0IdwG6hAkNdQ9xio3qWsP2Vzsug&s", itemname: "Orange", title: "1 KG", Amount: "₹25",Category: "Fruit" },
  { id: "40", image: "https://media.istockphoto.com/id/1184345169/photo/banana.jpg?s=612x612&w=0&k=20&c=NdHyi6Jd9y1855Q5mLO2tV_ZRnaJGtZGCSMMT7oxdF4=", itemname: "Banana", title: "1 KG", Amount: "₹25",Category: "Fruit" },
  { id: "41", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXlRDC3qDNyJBoooUReCvD9NRZWMx3e1q5ZSmM_lqjSMqq0N27veJfR6tT3jGJPTbmi-M&usqp=CAU", itemname: "Red Banana", title: "1 KG", Amount: "₹25",Category: "Fruit" },
  { id: "42", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdG6zdxG4TyvDaBHV3eUqlemKBjIQsUroczw&s", itemname: "Cherry", title: "1 KG", Amount: "₹25",Category: "Fruit" },
  { id: "43", image: "https://i0.wp.com/www.ayurtimes.com/wp-content/uploads/2014/11/Coconut.png?fit=730%2C430&ssl=1", itemname: "Coconut", title: "1 KG", Amount: "₹25",Category: "Fruit" },
  { id: "44", image: "https://media.istockphoto.com/id/178481233/photo/a-halved-and-whole-fig-isolated-on-a-white-background.jpg?s=612x612&w=0&k=20&c=MgRKBC0IxYaplo_yc9S6iFS2dlQaVbpZ35qoquW67gI=", itemname: "Figs", title: "1 KG", Amount: "₹25",Category: "Fruit" },
  { id: "45", image: "https://thumbs.dreamstime.com/b/jack-fruit-2226006.jpg", itemname: "Jackfruit", title: "1 KG", Amount: "₹25",Category: "Fruit" },
  { id: "46", image: "https://maatarafruitscompany.com/wp-content/uploads/2022/12/WhatsApp-Image-2023-01-07-at-23.20.39.jpeg", itemname: "Green Grapes", title: "1 KG", Amount: "₹25",Category: "Fruit" },
  { id: "47", image: "https://m.media-amazon.com/images/I/41P8zMQqR7L._AC_UF1000,1000_QL80_.jpg", itemname: "Black Grapes", title: "1 KG", Amount: "₹25",Category: "Fruit" },
  { id: "48", image: "https://m.media-amazon.com/images/I/71Ks4iR+-7L.jpg", itemname: "Guava", title: "1 KG", Amount: "₹25",Category: "Fruit" },
  { id: "49", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFQ9KckwFOaXRvuYC8RtxThCpg1kziu_-e6w&s", itemname: "Red Guava", title: "1 KG", Amount: "₹25",Category: "Fruit" },
  { id: "50", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7mUlyg-dw7vR-32W2C-XdE4JgigzkcqSv0MUgJx_k6xHw7oP2YONE3ctYatTVjiSvsZ4&usqp=CAU", itemname: "Mango", title: "1 KG", Amount: "₹25",Category: "Fruit" },
  { id: "51", image: "https://e.saravanaonline.com/7222-large_default/fresh-watermelon-fruits-1kg.jpg", itemname: "Watermelon", title: "1 KG", Amount: "₹25",Category: "Fruit" },
  { id: "52", image: "https://media.istockphoto.com/id/834807852/photo/whole-kiwi-fruit-and-half-kiwi-fruit-on-white.jpg?s=612x612&w=0&k=20&c=zliUVnZlYPcOxEDYef7PMmOEEODFr8FUkTYqqFVaRG8=", itemname: "Kiwi", title: "1 KG", Amount: "₹25",Category: "Fruit" },
  { id: "53", image: "https://findfresh.in/attachments/shop_images/pineapple-500x500.webp", itemname: "Pineapple", title: "1 KG", Amount: "₹25",Category: "Fruit" },
  { id: "54", image: "https://aramgarhorchards.com/wp-content/uploads/2018/08/Pomegranate.jpg", itemname: "Pomegranate", title: "1 KG", Amount: "₹25",Category: "Fruit" },
  { id: "55", image: "https://organicmandya.com/cdn/shop/files/DragonFruit.jpg?v=1721374720&width=1000", itemname: "Dragon", title: "1 KG", Amount: "₹25",Category: "Fruit" },
  { id: "56", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo4LHEtVy2UD-KYSAAp6hx7rIlDq6V4MHSIA&s", itemname: "Papaya", title: "1 KG", Amount: "₹25",Category: "Fruit" },
  { id: "57", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbIVfCEAsQgAguL7FeqQKLXs8ISjoaP3P-cA&s", itemname: "Strawberry ", title: "1 KG", Amount: "₹25",Category: "Fruit" },
  { id: "58", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-nb6Ra_WONOTQGYySEiu1R9efm5cxBLOvLw&s", itemname: "Pear", title: "1 KG", Amount: "₹25",Category: "Fruit" },
  { id: "59", image: "https://organicmandya.com/cdn/shop/files/Amla.jpg?v=1721367933&width=1000", itemname: "Gooseberry", title: "1 KG", Amount: "₹25",Category: "Fruit" },
  { id: "60", image: "https://img.freepik.com/premium-photo/star-gooseberry-white_62856-4732.jpg", itemname: "Star gooseberry", title: "1 KG", Amount: "₹25",Category: "Fruit" },
  { id: "61", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlZhnkgqIZBluqIBsejzhkTenOiEjs7cBTEw&s", itemname: "Cucumber", title: "1 KG", Amount: "₹25",Category: "Fruit" },
  { id: "62", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDtFHIXVLsUZqrpA7ZHX1_Oixpc0UCAyCeeQ&s", itemname: "Mosambi", title: "1 KG", Amount: "₹25",Category: "Fruit" },
  { id: "63", image: "https://www.quickpantry.in/cdn/shop/products/lay-s-spanish-tomato-tango-potato-chips-32-g-quick-pantry.jpg?v=1710538823&width=800", itemname: "Red Lays", title: "1 KG", Amount: "₹25",Category:"Lays"  },
  { id: "64", image: "https://kiasumart.com/wp-content/uploads/2020/10/Lays-American-Style-Cream-Onion-52g.jpg", itemname: "Green Lays", title: "1 KG", Amount: "₹25",Category:"Lays"  },
  { id: "65", image: "https://dukaan.b-cdn.net/700x700/webp/projecteagle/images/388bcb00-1dd3-461c-91a1-0c3748016284.jpg", itemname: "Yellow Lays", title: "1 KG", Amount: "₹25",Category:"Lays"  },
  { id: "66", image: "https://www.shutterstock.com/image-photo/guwahati-assam-india-july-28-600nw-2495124895.jpg", itemname: "Blue Lays", title: "1 KG", Amount: "₹25",Category:"Lays" },
  { id: "67", image: "https://qwickpick.com/wp-content/uploads/2023/03/LBfA1643881293174-Lays20Chile20lemon.png", itemname: "Dark Green Lays", title: "1 KG", Amount: "₹25",Category:"Lays" },
  { id: "68", image: "https://m.media-amazon.com/images/I/81FL868Tf7L.jpg", itemname: "Red Bingo", title: "1 KG", Amount: "₹25",Category:"Lays",Brand:"Bingo" },
  { id: "69", image: "https://m.media-amazon.com/images/I/81LikCzjzvL.jpg", itemname: "Green Bingo", title: "1 KG", Amount: "₹25",Category:"Lays",Brand:"Bingo"  },
  { id: "70", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTqCPrOE-t38bGPeBuOdIiBgrZZEVVgeKCUA&s", itemname: "Blue Bingo", title: "1 KG", Amount: "₹25",Category:"Lays",Brand:"Bingo"  },
  { id: "71", image: "https://5.imimg.com/data5/SELLER/Default/2024/11/463097104/QP/DI/TR/42289182/lays-classic-potato-chips-500x500.jpeg", itemname: "Yellow Bingo", title: "1 KG", Amount: "₹25",Category:"Lays",Brand:"Bingo"  },
  { id: "72", image: "https://m.media-amazon.com/images/I/81oQOYKZHxL.jpg", itemname: "Original Style Bingo", title: "1 KG", Amount: "₹25",Category:"Lays",Brand:"Bingo"  },
  { id: "73", image: "https://frugivore-bucket.s3.amazonaws.com/media/package/img_one/2020-10-16/Bingo_Mad_Angles_-_Tomato_Madness_72.5_Gm.jpg", itemname: "Tomato Madness", title: "1 KG", Amount: "₹25",Category:"Lays",Brand:"Bingo" },
  { id: "74", image: "https://5.imimg.com/data5/SELLER/Default/2022/5/UJ/RZ/CN/126093947/bounce-cream-biscuits-500x500.jpg", itemname: "Achaari Masti", title: "1 KG", Amount: "₹25",Category:"Lays" },
  { id: "75", image: "https://www.freedomcart.com/image/cache/catalog/data/Products/britania_maska_chaska_50-50-700x700.jpg", itemname: "50-50 maska chaska", title: "1 KG", Amount: "₹25",Category:"Biscuit",Brand:"Britannia" },
  { id: "76", image: "https://bazaar5.com/image/cache/catalog/pro/product/apiData/b00lpclfv0-britannia-marie-gold-68g-5g-68g-10g-weight-mat-vary--0-320x320.jpg", itemname: "Marie Gold", title: "1 KG", Amount: "₹25",Category:"Biscuit",Brand:"Britannia"  },
  { id: "77", image: "https://homedelivery.ramachandran.in/media/catalog/product/cache/04c5c5c4276fe9dba74400abc896c29c/1/1/11.jpeg", itemname: "Milk Biscuit", title: "1 KG", Amount: "₹25",Category:"Biscuit",Brand:"Britannia"  },
  { id: "78", image: "https://m.media-amazon.com/images/I/61IhdI0oN8L.jpg", itemname: "Good Day Cashew", title: "1 KG", Amount: "₹25",Category:"Biscuit",Brand:"Britannia"  },
  { id: "79", image: "https://m.media-amazon.com/images/I/71B9DPbrSnL.jpg", itemname: "Little Heart", title: "1 KG", Amount: "₹25",Category:"Biscuit",Brand:"Britannia"  },
  { id: "80", image: "https://m.media-amazon.com/images/I/61BLfXsvmBL.jpg", itemname: "Nutri Choice Digestive", title: "1 KG", Amount: "₹25",Category:"Biscuit",Brand:"Britannia" },
  { id: "81", image: "https://5.imimg.com/data5/ECOM/Default/2023/7/325016236/BC/LV/BH/185557558/1684261534879-13-250x250.jpeg", itemname: "Nutri Choice Digestive", title: "100 GM", Amount: "₹10",Category:"Biscuit",Brand:"Britannia" },
  { id: "82", image: "https://www.ippobuy.com/cdn/shop/files/nutri-choice-d-20-rs_ee4960fe-95f2-493d-a6df-2f10ea2a3b69.jpg?v=1699621403", itemname: "Nutri Choice Digestive", title: "GM", Amount: "₹20",Category:"Biscuit",Brand:"Britannia" },
  { id: "83", image: "https://chheda.store/wp-content/uploads/2020/12/nutri-choice-digestive-zero-100g.jpg", itemname: "Nutri Choice Digestive Zero", title: "1 KG", Amount: "₹25",Category:"Biscuit",Brand:"Britannia" },
  { id: "84", image: "https://m.satvacart.com/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/B/r/Britannia_Bourbon_Biscuits_120Gm_result.jpg", itemname: "Bourbon", title: "1 KG", Amount: "₹25",Category:"Biscuit",Brand:"Britannia" },
  { id: "85", image: "https://m.media-amazon.com/images/I/315lHrP+jrL._BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", itemname: "Bourbon", title: "1 KG", Amount: "₹25",Category:"Biscuit",Brand:"Britannia" },
  { id: "86", image: "https://m.media-amazon.com/images/I/61VnQ1m1PeL.jpg", itemname: "Good Day Chocochip", title: "1 KG", Amount: "₹25",Category:"Biscuit",Brand:"Britannia" },
  { id: "87", image: "https://cdn.dmart.in/images/products/JUN120003981xx1JUN22_5_B.jpg", itemname: "Good Day Chocochip", title: "1 KG", Amount: "₹25",Category:"Biscuit",Brand:"Britannia" },
  { id: "88", image: "https://www.jiomart.com/images/product/original/491074412/britannia-milk-bikis-milky-sandwich-biscuits-200-g-product-images-o491074412-p491074412-0-202305311237.jpg", itemname: "Milk Bikis", title: "1 KG", Amount: "₹25",Category:"Biscuit",Brand:"Britannia" },
  { id: "89", image: "https://m.media-amazon.com/images/I/615LClrHmNL.jpg", itemname: "50-50 sweet and Salty", title: "1 KG", Amount: "₹25",Category:"Biscuit",Brand:"Britannia" },
  { id: "90", image: "https://aapkabazar.co/_next/image?url=https%3A%2F%2Fimage.aapkabazar.co%2Fproduct%2F8913%2F1700718498193.png&w=3840&q=75", itemname: "JIMJAM POPS", title: "1 KG", Amount: "₹25",Category:"Biscuit",Brand:"Britannia" },
  { id: "91", image: "https://chheda.store/wp-content/uploads/2020/12/treat-jim-jam-62g.jpg", itemname: "JIMJAM", title: "1 KG", Amount: "₹25",Category:"Biscuit",Brand:"Britannia" },
  { id: "92", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf5qy7-ZKJOWbW1XAsCHpYyH9dKvTREOfMRQ&s", itemname: "JIMJAM", title: "1 KG", Amount: "₹25",Category:"Biscuit",Brand:"Britannia" },
  { id: "93", image: "https://m.media-amazon.com/images/I/71AQ+Qd2UDL.jpg", itemname: "Toastea", title: "1 KG", Amount: "₹25",Category:"Biscuit",Brand:"Britannia" },
  { id: "94", image: "https://andamangreengrocers.com/wp-content/uploads/2023/01/chocolush.jpg", itemname: "Pure Magic", title: "1 KG", Amount: "₹25",Category:"Biscuit",Brand:"Britannia" },
  { id: "95", image: "https://www.quickpantry.in/cdn/shop/products/britannia-treat-kool-vanilla-cream-biscuits-60-g-quick-pantry.jpg?v=1710538229&width=500", itemname: "Kool vanilla cream", title: "1 KG", Amount: "₹25",Category:"Biscuit",Brand:"Britannia" },
  { id: "96", image: "https://homedelivery.ramachandran.in/media/catalog/product/cache/04c5c5c4276fe9dba74400abc896c29c/2/4/24_2nd.jpeg", itemname: "Burst Choco", title: "1 KG", Amount: "₹25",Category:"Biscuit",Brand:"Britannia" },
  { id: "97", image: "https://m.media-amazon.com/images/I/713ZERAwHEL.jpg", itemname: "Hide &  Seek", title: "1 KG", Amount: "₹25",Category:"Biscuit",Brand:"Parle" },
  { id: "98", image: "https://www.indiaathome.com.au/cdn/shop/files/BIS111_2048x.jpg?v=1720439993", itemname: "Hide &  Seek", title: "1 KG", Amount: "₹25",Category:"Biscuit",Brand:"Parle" },
  { id: "99", image: "https://rukminim3.flixcart.com/image/850/1000/ky1vl3k0/cookie-biscuit/k/g/9/-original-imagadczjysz8bh3.jpeg?q=90&crop=false", itemname: "Parle-G", title: "1 KG", Amount: "₹25",Category:"Biscuit",Brand:"Parle" },
  { id: "100", image: "https://5.imimg.com/data5/SELLER/Default/2022/2/DT/EQ/AP/146503902/20005925-2-8-parle-happy-happy-choco-chip-cookies.jpg", itemname: "Happy Happy", title: "1 KG", Amount: "₹25",Category:"Biscuit",Brand:"Parle" },
  { id: "101", image: "https://images-cdn.ubuy.ae/647fa63b562e3863a655bd80-sunfeast-dark-fantasy-choco-fills-cookie.jpg", itemname: "Dark Fantasy choco fills", title: "1 KG", Amount: "₹25",Category:"Biscuit",Brand:"Sunfeast" },
  { id: "102", image: "https://www.swadeshsquare.com/cdn/shop/files/Sunfeast_Dark_Fantasy_Vanilla_Creme_Biscuits.webp?v=1740668354", itemname: "Vanilla Creme", title: "1 KG", Amount: "₹25",Category:"Biscuit",Brand:"Sunfeast" },
  { id: "103", image: "https://m.media-amazon.com/images/I/81W+pBrbwXL.jpg", itemname: "Marie Light", title: "1 KG", Amount: "₹25",Category:"Biscuit",Brand:"Sunfeast" },
  { id: "104", image: "https://unibicestore.com/cdn/shop/files/Choco-nut-Tiffen-pack-of-12-1.jpg?v=1722505563", itemname: "Unibic Choco Nut", title: "1 KG", Amount: "₹25",Category:"Biscuit",Brand:"Unibic" },
  { id: "104", image: "https://www.bigbasket.com/media/uploads/p/l/30004678_1-unibic-cookies-fruit-nut.jpg", itemname: "Unibic Fruit & Nut", title: "1 KG", Amount: "₹25",Category:"Biscuit",Brand:"Unibic" },
  { id: "105", image: "https://static2.medplusmart.com/products/CADB0041_L.jpg", itemname: "Dairy Milk", title: "1 KG", Amount: "₹25",Category:"Chocolate",Brand:"Cadbury" },
  { id: "106", image: "https://m.media-amazon.com/images/I/61GmTQ6mykL.jpg", itemname: "Dairy Milk", title: "1 KG", Amount: "₹25",Category:"Chocolate",Brand:"Cadbury"},
  { id: "107", image: "https://m.media-amazon.com/images/I/61XVq39wuCL.jpg", itemname: "Dairy Milk", title: "1 KG", Amount: "₹25",Category:"Chocolate",Brand:"Cadbury" },
  { id: "108", image: "https://jagsfresh-bucket.s3.amazonaws.com/media/package/img_one/2019-09-19/Dairy_Milk_Silk_Fruit_and_nut_55_gm_2.jpg", itemname: "Dairy Milk Silk", title: "1 KG", Amount: "₹25",Category:"Chocolate",Brand:"Cadbury" },
  { id: "109", image: "https://5.imimg.com/data5/ANDROID/Default/2020/10/OW/QE/HA/44890393/images-44-jpeg-500x500.jpeg", itemname: "Dairy Milk Silk Bubbly", title: "1 KG", Amount: "₹25",Category:"Chocolate",Brand:"Cadbury" },
  { id: "110", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0GuJVg9nE7t3L5MjynQVon2zQ1BzjgbAvzbJkEfjg9LUExvgktzmDxjJvzOFXFvgly74&usqp=CAU", itemname: "Dairy Milk Heart Blush", title: "1 KG", Amount: "₹25",Category:"Chocolate",Brand:"Cadbury" },
  { id: "111", image: "https://m.media-amazon.com/images/I/41i6i4oj8-L.jpg", itemname: "5 Star", title: "1 KG", Amount: "₹25",Category:"Chocolate",Brand:"Cadbury" },
  { id: "112", image: "https://m.media-amazon.com/images/I/618fySthK8L.jpg", itemname: "5 Star", title: "1 KG", Amount: "₹25",Category:"Chocolate",Brand:"Cadbury" },
  { id: "113", image: "https://m.media-amazon.com/images/I/51LRrilIFSL.jpg", itemname: "Snickers", title: "1 KG", Amount: "₹25",Category:"Chocolate",Brand:"Cadbury" },
  { id: "114", image: "https://ik.imagekit.io/wlfr/wellness/images/products/244922-1.jpg/tr:w-3840,c-at_max,cm-pad_resize,ar-1210-700,pr-true,f-auto,q-70,l-image,i-Wellness_logo_BDwqbQao9.png,lfo-bottom_right,w-200,h-90,c-at_least,cm-pad_resize,l-end", itemname: "Kinder Joy", title: "1 KG", Amount: "₹25",Category:"Chocolate",Brand:"Cadbury" },
  { id: "115", image: "https://5.imimg.com/data5/SELLER/Default/2023/2/ZB/TW/FB/144328445/18122021053823-14903-600x600-250x250.jpg", itemname: "Munch", title: "1 KG", Amount: "₹25",Category:"Chocolate",Brand:"Nestle" },
  { id: "116", image: "https://www.jiomart.com/images/product/original/491074314/cadbury-perk-double-chocolate-22-g-product-images-o491074314-p491074314-0-202410151834.jpg?im=Resize=(1000,1000)", itemname: "Perk", title: "1 KG", Amount: "₹25",Category:"Chocolate",Brand:"Cadbury" },
  { id: "117", image: "https://m.media-amazon.com/images/I/61mdKzzh+JL.jpg", itemname: "Kitkat", title: "1 KG", Amount: "₹25",Category:"Chocolate",Brand:"Nestle" },
  { id: "118", image: "https://aachifoods.com/cdn/shop/files/Garam-Masala-powder.webp?v=1726912308", itemname: "Garam Masala", title: "1 KG", Amount: "₹25",Category:"Masala",Brand:"Aachi" },
  { id: "119", image: "https://aachifoods.com/cdn/shop/files/aachi-Garam-Masala-powder.webp?v=1726912335&width=1445", itemname: "", title: "1 KG", Amount: "₹25",Category:"Masala",Brand:"Aachi"},
  { id: "120", image: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/5162ab56-b576-42ce-9c6b-1ac919975da6.__CR0,0,300,300_PT0_SX300_V1___.jpg", itemname: "Chicken 65 Masala", title: "1 KG", Amount: "₹25",Category:"Masala",Brand:"Aachi" },
  { id: "121", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2KrLZwKchUSHNVstkEpE0VHPr4uoSsW7_Fg&s", itemname: "Chilli Chicken Masala", title: "1 KG", Amount: "₹25",Category:"Masala",Brand:"Aachi" },
  { id: "122", image: "https://aachifoods.com/cdn/shop/files/aachi-fish-Curry-Masala.webp?v=1726911250", itemname: "Fish Curry Masala", title: "1 KG", Amount: "₹25",Category:"Masala",Brand:"Aachi"},
  { id: "123", image: "https://m.media-amazon.com/images/I/517CqaJHliL._AC_UF894,1000_QL80_.jpg", itemname: "Fish Fry Masala", title: "1 KG", Amount: "₹25",Category:"Masala",Brand:"Aachi" },
  { id: "124", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeUsvjL_SjstXoFkgFU9b7Y_-uRtK77i7ZCQ&s", itemname: "Mutton Masala", title: "1 KG", Amount: "₹25",Category:"Masala",Brand:"Aachi" },
  { id: "125", image: "https://5.imimg.com/data5/SELLER/Default/2022/4/HP/CS/SS/140245462/90000349-500x500.jpg", itemname: "Mutton Masala", title: "1 KG", Amount: "₹25",Category:"Masala",Brand:"Aachi"},
  { id: "126", image: "https://m.media-amazon.com/images/I/71G8pqpdK6L.jpg", itemname: "Briyani Masala", title: "1 KG", Amount: "₹25",Category:"Masala",Brand:"Aachi" },
  { id: "127", image: "https://aachifoods.com/cdn/shop/files/aachi-Dindigul-Biryani-Masala.webp?v=1726909406", itemname: "Dindigul Biryani Masala", title: "1 KG", Amount: "₹25",Category:"Masala",Brand:"Aachi" },
  { id: "128", image: "https://m.media-amazon.com/images/I/61cROKxGDrL.jpg", itemname: "Kulambu Masala", title: "1 KG", Amount: "₹25",Category:"Masala",Brand:"Aachi" },
  { id: "129", image: "https://aachifoods.com/cdn/shop/files/aachi-Curry-Masala.webp?v=1726904866", itemname: "Curry Masala", title: "1 KG", Amount: "₹25",Category:"Masala",Brand:"Aachi" },
  { id: "130", image: "https://aachifoods.com/cdn/shop/files/aachi-Asafoetida-Powder.webp?v=1726819142", itemname: "Asafoetide", title: "1 KG", Amount: "₹25",Category:"Masala",Brand:"Aachi" },
  { id: "131", image: "https://aachifoods.com/cdn/shop/files/Kashmiri-Chilli-Powder-50g.webp?v=1727073515", itemname: "Kashmiri chill powder", title: "1 KG", Amount: "₹25",Category:"Masala",Brand:"Aachi" },
  { id: "132", image: "https://aachifoods.com/cdn/shop/files/aachi-Chilli-Powder.webp?v=1726898584", itemname: "Chilli Powder", title: "1 KG", Amount: "₹25",Category:"Masala",Brand:"Aachi"},
  { id: "133", image: "https://aachifoods.com/cdn/shop/files/aachi-Sambar-Powder.webp?v=1737457116&width=1445", itemname: "Sambar Powder", title: "1 KG", Amount: "₹25",Category:"Masala",Brand:"Aachi"},
  { id: "134", image: "https://e.saravanaonline.com/2505-large_default/aachi-rasam-powder-100-gm.jpg", itemname: "Rasam Powder", title: "1 KG", Amount: "₹25",Category:"Masala",Brand:"Aachi" },
  { id: "135", image: "https://static.wixstatic.com/media/0176e3_97b91c2df99f4464900932a075c30ee9~mv2.jpg/v1/fit/w_500,h_500,q_90/file.jpg", itemname: "Fish Fry Masala", title: "1 KG", Amount: "₹25",Category:"Masala",Brand:"Sakthi" },
  { id: "136", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpGc2qZeBX6aMH2EY_FMcRGWhFeup56J2OsA&s", itemname: "Mutton Masala", title: "1 KG", Amount: "₹25",Category:"Masala",Brand:"Sakthi"},
  { id: "137", image: "https://d4pmlgzenkweq.cloudfront.net/wv8tn2olbstpbyytqx9j7vlaesu1", itemname: "Curry Masala", title: "1 KG", Amount: "₹25",Category:"Masala",Brand:"Sakthi" },
  { id: "138", image: "https://nalansstore.com/wp-content/uploads/2020/04/Sakthi-Fish-Curry-Masala-1.jpg", itemname: "Fish Curry Masala", title: "1 KG", Amount: "₹25",Category:"Masala",Brand:"Sakthi" },
  { id: "139", image: "https://m.media-amazon.com/images/I/91GzooPpRLL.jpg", itemname: "Chicken Masala", title: "1 KG", Amount: "₹25",Category:"Masala",Brand:"Sakthi" },
  { id: "140", image: "https://m.media-amazon.com/images/I/71-UNMu79qL.jpg", itemname: "Black Pepper Powder", title: "1 KG", Amount: "₹25",Category:"Masala",Brand:"Sakthi" },
  { id: "141", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmz-KtDEShgMiM5FFJ-ZppHwJ5EbNfH0c_pQ&s", itemname: "Briyani Masala", title: "1 KG", Amount: "₹25",Category:"Masala",Brand:"Sakthi" },
  { id: "142", image: "https://www.onezeros.in/cdn/shop/products/sakthi-biryani-masala-sakthi-masala-35312307110086.jpg?v=1722167470", itemname: "Briyani Masala", title: "1 KG", Amount: "₹25",Category:"Masala",Brand:"Sakthi" },
  { id: "143", image: "https://grocerynxt.com/assets/uploads/media-uploader/untitled-design-2024-05-24t1532269951716544956.jpg", itemname: "Garam Masala", title: "1 KG", Amount: "₹25",Category:"Masala",Brand:"Sakthi" },
  { id: "144", image: "https://m.media-amazon.com/images/I/610eQrR3J4L.jpg", itemname: "Egg Kurma Masala", title: "1 KG", Amount: "₹25",Category:"Masala",Brand:"Sakthi" },
  { id: "145", image: "https://m.media-amazon.com/images/I/41KoSD0D92L.jpg", itemname: "Chicken chill 65 Masala", title: "1 KG", Amount: "₹25",Category:"Masala",Brand:"Sakthi" },
  { id: "146", image: "https://m.media-amazon.com/images/I/41LHGwZczwL.jpg", itemname: "Sambar Powder", title: "1 KG", Amount: "₹25",Category:"Masala",Brand:"Sakthi" },
  { id: "147", image: "https://m.media-amazon.com/images/I/71gkvbZeGpL.jpg", itemname: "Chilli Powder", title: "1 KG", Amount: "₹25",Category:"Masala",Brand:"Sakthi" },
  { id: "148", image: "https://m.media-amazon.com/images/I/61c+27bmd9L.jpg", itemname: "Rasam Powder", title: "1 KG", Amount: "₹25",Category:"Masala",Brand:"Sakthi" },
  { id: "149", image: "https://grocerynxt.com/assets/uploads/media-uploader/untitled-design-2024-05-24t1351233451716538891.jpg", itemname: "Lemon Rice Powder", title: "1 KG", Amount: "₹25",Category:"Masala",Brand:"Sakthi" },
  { id: "150", image: "https://m.media-amazon.com/images/I/81MYiaeX58L.jpg", itemname: "Mutton Chukka Masala", title: "1 KG", Amount: "₹25",Category:"Masala",Brand:"Sakthi" },
  { id: "151", image: "https://m.media-amazon.com/images/I/71bh0CL56sL.jpg", itemname: "Coriander ", title: "1 KG", Amount: "₹25",Category:"Masala",Brand:"Sakthi" },



];

const PromoCard = ({ item }) => (
  <View style={styles.promoCardContainer}>
    <LinearGradient colors={["#ff9a9e", "#fad0c4"]} style={styles.promoCard}>
      <Image source={{ uri: item.image }} style={styles.promoImage} />
      <View style={styles.promoDetails}>
        <Text style={styles.promoItemName}>{item.itemname}</Text>
        <Text style={styles.promoTitle}>{item.title}</Text>
        <Text style={styles.promoPrice}>{item.Amount}</Text>
        <TouchableOpacity style={styles.promoButton}>
          <Text style={styles.promoButtonText}>Buy Now</Text>
          <MaterialCommunityIcons name="arrow-right" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  </View>
);

const CategoryFilterScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = selectedCategory === "All"
    ? promoData
    : promoData.filter((item) => item.Category === selectedCategory);

  return (
    <View style={styles.categoryContainer}>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === item.name && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(item.name)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === item.name && styles.selectedText,
              ]}
            >
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
        renderItem={({ item }) => <PromoCard item={item} />}
      />
    </View>
  );
};

const HomeScreen = ({ navigation }) => (
  <SafeAreaView style={styles.mainContainer}>
    <CircularMenu navigation={navigation} />
    <CategoryFilterScreen />
  </SafeAreaView>
);

const AppNavigator = () => (
  <NavigationIndependentTree>
  <NavigationContainer>
    <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="MenuScreen" component={MenuScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  </NavigationIndependentTree>
);

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#fff', paddingTop: 30 },
  headerContainer: { flexDirection: 'row', backgroundColor: 'lightgrey', alignItems: 'center', padding: 15, borderRadius: 10, marginHorizontal: 20 },
  headerText: { flex: 1, fontSize: 20, color: 'blue', fontWeight: 'bold', textAlign: 'center' },
  menuButton: { width: 40, height: 40, borderRadius: 25, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' },
  categoryContainer: { paddingVertical: 10 },
  categoryButton: { marginHorizontal: 5, padding: 10, backgroundColor: "#ddd", borderRadius: 10 },
  selectedCategory: { backgroundColor: "#FF5722" },
  categoryText: { fontSize: 14, fontWeight: "bold" },
  selectedText: { color: "#fff" },
  promoCardContainer: { flex: 1, margin: 5 },
  promoCard: { borderRadius: 15, overflow: "hidden", elevation: 8, paddingBottom: 15 },
  promoImage: { width: "100%", height: 150 },
  promoDetails: { padding: 10, alignItems: "center" },
  promoItemName: { fontSize: 14, fontWeight: "bold", color: "#FF5722" },
  promoTitle: { fontSize: 14, fontWeight: "bold", marginVertical: 4 },
  promoPrice: { fontSize: 20, color: "#555" },
  promoButton: { flexDirection: "row", backgroundColor: "#FF5722", padding: 10, borderRadius: 8, marginTop: 8, alignItems: "center", justifyContent: "center" },
  promoButtonText: { color: "#fff", fontSize: 12, fontWeight: "bold", marginRight: 5 },
});

export default AppNavigator;



//
// const PromoScreen = () => {
//   return (
//     <FlatList
//       data={promoData}
//       keyExtractor={(item) => item.id}
//       renderItem={({ item }) => <PromoCard item={item} />}
//       numColumns={2} // Makes the list display in 2 columns
//       columnWrapperStyle={styles.row} // Adds spacing between columns
//       contentContainerStyle={styles.listContainer}
//     />
//   );
// };