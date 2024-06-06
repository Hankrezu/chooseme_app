import React,{useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import {Colors, Fonts, Images} from '../contants';
import {FoodCard, Separator} from '../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Display} from '../utils';
import {useSelector} from 'react-redux';
import UserService from '../services/UserService';

const CartScreen = ({navigation}) => {

  const [visible, setVisible] = useState(false);
  const [phoneNumber,setPhoneNumber] = useState()
  
  const hide = ()=> setVisible(false);

  const cart = useSelector(state => state?.cartState?.cart);

  const isPhoneNumber = async () => {
    setVisible(true) 
    try { 
      let response = await UserService.getUserData();  
      let userData = response.data;
      console.log(userData.data.phone)
        if (userData.data.phone) {
          console.log('Phone number exists')
          setPhoneNumber(userData.data.phone)
        } else {
          console.log('Phone number does not exists')
          return {
            status: false,
            message: 'Phone number does not exist',
          };
      } 
    } catch (error) {
      return {
        status: false,
        message: `Error checking phone number: ${error?.message}`,
      };
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_WHITE}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>
      {cart?.cartItems?.length > 0 ? (
        <>
          <ScrollView>
            <View style={styles.foodList}>
              {cart?.cartItems?.map(item => (
                <FoodCard
                  {...item?.food}
                  key={item?.food?.id}
                  navigate={() =>
                    navigation.navigate('Food', {foodId: item?.id})
                  }
                />
              ))}
            </View>
            <View style={styles.promoCodeContainer}>
              <View style={styles.rowAndCenter}>
                <Entypo name="ticket" size={30} color={Colors.DEFAULT_YELLOW} />
                <Text style={styles.promoCodeText}>Add Promo Code</Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color={Colors.DEFAULT_BLACK}
              />
            </View>
            <View style={styles.amountContainer}>
              <View style={styles.amountSubContainer}>
                <Text style={styles.amountLabelText}>Item Total</Text>
                <Text style={styles.amountText}>
                  $ {cart?.metaData?.itemsTotal?.toFixed(2)}
                </Text>
              </View>
              <View style={styles.amountSubContainer}>
                <Text style={styles.amountLabelText}>Discount</Text>
                <Text style={styles.amountText}>
                  $ {cart?.metaData?.discount?.toFixed(2)}
                </Text>
              </View>
              <View style={styles.amountSubContainer}>
                <Text style={styles.amountLabelText}>Delivery Fee</Text>
                <Text
                  style={{...styles.amountText, color: Colors.DEFAULT_GREEN}}>
                  Free
                </Text>
              </View>
            </View>
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalText}>
                $ {cart?.metaData?.grandTotal?.toFixed(2)}
              </Text>
            </View>
            <TouchableOpacity onPress={isPhoneNumber} style={styles.checkoutButton}>
              <View style={styles.rowAndCenter}>
                <Ionicons
                  name="cart-outline"
                  color={Colors.DEFAULT_WHITE}
                  size={20}
                />
                <Text style={styles.checkoutText}>Checkout</Text>
              </View>
              <Text style={styles.checkoutText}>
                $ {cart?.metaData?.grandTotal?.toFixed(2)}
              </Text>
            </TouchableOpacity>
            <Separator height={Display.setHeight(9)} />
          </ScrollView>
        </>
      ) : (
        <View style={styles.emptyCartContainer}>
          <Image
            style={styles.emptyCartImage}
            source={Images.EMPTY_CART}
            resizeMode="contain"
          />
          <Text style={styles.emptyCartText}>Cart Empty</Text>
          <Text style={styles.emptyCartSubText}>
            Go ahead and order some tasty food
          </Text>
          <TouchableOpacity style={styles.addButtonEmpty}>
            <AntDesign name="plus" color={Colors.DEFAULT_WHITE} size={20} />
            <Text style={styles.addButtonEmptyText}>Add Food</Text>
          </TouchableOpacity>
          <Separator height={Display.setHeight(15)} />
        </View>
      )}


      <Modal animationType='fade' transparent={true} visible={visible} onRequestClose={hide}>
        <View style={styles.lower}> 
          <View style={styles.modalContent}>
            { phoneNumber != null
            ? <Text style={{fontSize:12}} onPress={hide}>HavePhoneNumber</Text> 
            : <Text style={{fontSize:12}} onPress={hide}>DontHavePhoneNumber</Text> 
            }        
          </View>
        </View> 
      </Modal>

      
    </View>
  );
};

const styles = StyleSheet.create({
  fill:{flex:1},
  upper:{height:100, backgroundColor:'#DDD', opacity:.5},
  lower:
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,  // Optional: adds rounded corners
    height:Display.setHeight(30),
    width:Display.setWidth(90)
    
  },
  hideText: {
    fontSize: 50,
    color: 'white',  // Optional: sets text color to white for better visibility
  },

  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    width: Display.setWidth(80),
    textAlign: 'center',
  },
  foodList: {
    marginHorizontal: Display.setWidth(4),
  },
  promoCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Display.setWidth(4),
    paddingVertical: 15,
    marginTop: 10,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    justifyContent: 'space-between',
  },
  promoCodeText: {
    fontSize: 15,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 15 * 1.4,
    color: Colors.DEFAULT_BLACK,
    marginLeft: 10,
  },
  rowAndCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountContainer: {
    marginHorizontal: Display.setWidth(4),
    paddingVertical: 20,
    borderBottomWidth: 0.5,
  },
  amountSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  amountLabelText: {
    fontSize: 15,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    lineHeight: 15 * 1.4,
    color: Colors.DEFAULT_GREEN,
  },
  amountText: {
    fontSize: 15,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    lineHeight: 15 * 1.4,
    color: Colors.DEFAULT_BLACK,
  },
  totalContainer: {
    marginHorizontal: Display.setWidth(4),
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalText: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    lineHeight: 20 * 1.4,
    color: Colors.DEFAULT_BLACK,
  },
  checkoutButton: {
    flexDirection: 'row',
    width: Display.setWidth(80),
    backgroundColor: Colors.DEFAULT_GREEN,
    alignSelf: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    height: Display.setHeight(7),
    marginTop: 10,
  },
  checkoutText: {
    fontSize: 16,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 16 * 1.4,
    color: Colors.DEFAULT_WHITE,
    marginLeft: 8,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 30,
    fontFamily: Fonts.POPPINS_LIGHT,
    lineHeight: 30 * 1.4,
    color: Colors.DEFAULT_GREEN,
  },
  emptyCartSubText: {
    fontSize: 12,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 12 * 1.4,
    color: Colors.INACTIVE_GREY,
  },
  addButtonEmpty: {
    flexDirection: 'row',
    backgroundColor: Colors.DEFAULT_YELLOW,
    borderRadius: 8,
    paddingHorizontal: Display.setWidth(4),
    paddingVertical: 5,
    marginTop: 10,
    justifyContent: 'space-evenly',
    elevation: 3,
    alignItems: 'center',
  },
  addButtonEmptyText: {
    fontSize: 12,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 12 * 1.4,
    color: Colors.DEFAULT_WHITE,
    marginLeft: 10,
  },
  emptyCartImage: {
    height: Display.setWidth(60),
    width: Display.setWidth(60),
  },
});

export default CartScreen;
