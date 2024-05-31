import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  CategoryMenuItem,
  RestaurantCard,
  RestaurantMediumCard,
  FoodCard,
  Separator,
} from '../components';
import {Colors, Fonts, Mock} from '../contants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {RestaurantService} from '../services';
import {FoodService} from '../services';
import {Display} from '../utils';

const sortStyle = isActive =>
  isActive
    ? styles.sortListItem
    : {...styles.sortListItem, borderBottomColor: Colors.DEFAULT_WHITE};

const HomeScreen = ({navigation}) => {
  const [activeCategory, setActiveCategory] = useState();
  const [foods, setFoods] = useState(null);
  const [activeSortItem, setActiveSortItem] = useState('recent');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      FoodService.getAllFoods().then(response => {
        if (response?.status) {
          setFoods(response?.data);
        }
      }
    );
    });
    return unsubscribe;
  }, []);


  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.DEFAULT_GREEN}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      
      <View style={styles.backgroundCurvedContainer} />
      <View style={styles.headerContainer}>

        <View style={styles.searchContainer}>

          <View style={styles.searchSection}>
            <Ionicons
              name="search-outline"
              size={25}
              color={Colors.DEFAULT_GREY}
            />
            <Text style={styles.searchText}>Search..</Text>
          </View>

          <Feather
            name="sliders"
            size={20}
            color={Colors.DEFAULT_YELLOW}
            style={{marginRight: 10}}
          />
        </View>

        <View style={styles.categoriesContainer}>
          {Mock.CATEGORIES.map(({name, logo}) => (
            <CategoryMenuItem
              key={name}
              name={name}
              logo={logo}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          ))}
        </View>
      </View>
        
        <View style={styles.horizontalListContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={foods}
            keyExtractor={item => item?.id}
            ListHeaderComponent={() => <Separator height={20} />}
            ListFooterComponent={() => <Separator height={20} />}
            ItemSeparatorComponent={() => <Separator height={10} />}
            renderItem={({item}) => (   
               <FoodCard
                 {...item}
                  navigate={() =>
                    navigation.navigate('Restaurant', { restaurantId: item?.restaurantId})
                  }
              />
            )}
            />
        </View>
        <Separator height={Display.setHeight(5)} />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.LIGHT_GREY3,
  },
  backgroundCurvedContainer: {
    backgroundColor: Colors.PEACH,
    height: 1927,
    position: 'absolute',
    top: -1 * (2000 - 230),
    width: 2000,
    alignSelf: 'center',
    zIndex: -1,
  },
  headerContainer: {
    justifyContent: 'space-evenly',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 20,
  },
  locationText: {
    color: Colors.DEFAULT_WHITE,
    marginLeft: 5,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  selectedLocationText: {
    color: Colors.DEFAULT_YELLOW,
    marginLeft: 5,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  alertBadge: {
    borderRadius: 32,
    backgroundColor: Colors.DEFAULT_YELLOW,
    justifyContent: 'center',
    alignItems: 'center',
    height: 16,
    width: 16,
    position: 'absolute',
    right: -2,
    top: -10,
  },
  alertBadgeText: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 10,
    lineHeight: 10 * 1.4,
    fontFamily: Fonts.POPPINS_BOLD,
  },
  searchContainer: {
    backgroundColor: Colors.DEFAULT_WHITE,
    height: 45,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  searchText: {
    color: Colors.DEFAULT_GREY,
    fontSize: 16,
    lineHeight: 16 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
    marginLeft: 10,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  listContainer: {
    paddingVertical: 5,
    zIndex: -5,
  },
  horizontalListContainer: {
    marginTop: 20,
    marginLeft:'5%',
    marginBottom:190,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 5,
  },
  listHeaderTitle: {
    color: Colors.DEFAULT_BLACK,
    fontSize: 16,
    lineHeight: 16 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  listHeaderSubtitle: {
    color: Colors.DEFAULT_YELLOW,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  sortListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: Colors.DEFAULT_WHITE,
    marginTop: 8,
    elevation: 1,
  },
  sortListItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.DEFAULT_YELLOW,
    height: 40,
  },
  sortListItemText: {
    color: Colors.DEFAULT_BLACK,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
  },
});

export default HomeScreen;
