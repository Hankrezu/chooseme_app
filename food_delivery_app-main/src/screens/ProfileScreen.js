import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Separator, ToggleButton} from '../components';
import {Colors, Fonts, Images} from '../contants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Display} from '../utils';
import {useDispatch} from 'react-redux';
import {StorageService} from '../services';
import {GeneralAction} from '../actions';
import { useNavigation } from '@react-navigation/native';
import UserService from '../services/UserService';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');


  useEffect(()=>{
    const getData = async () => {
      try { 
        let response = await UserService.getUserData();  
        let userData = response.data;
        setUsername(userData.data.username) 
        setEmail(userData.data.email)
        setPhoneNumber(userData.data.phone) 
        setAddress(userData.data.address)
      } catch (error) {
        return {
          status: false,
          message: `${error?.message}`,
        };
      }
    };
    getData()
  },[])

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
    <Ionicons
      name="chevron-back-outline"
      size={20}
      color={Colors.DEFAULT_WHITE}
      onPress={() => {
        navigation.goBack();
      }}
    />
    <Text style={styles.headerText}>Profile</Text>
    <View>
      <Feather name="bell" size={20} color={Colors.DEFAULT_WHITE} />
      <View style={styles.alertBadge}>
        <Text style={styles.alertBadgeText}>12</Text>
      </View>
    </View>
  </View>
  <View style={styles.profileHeaderContainer}>
    <TouchableOpacity onPress={()=>{navigation.navigate('Modify')}}>
     <View style={styles.profileImageContainer}>
       <Image style={styles.profileImage} source={Images.AVATAR} />
     </View>
    </TouchableOpacity>
    
    <View style={styles.profileTextContainer}>
      <Text style={styles.nameText}>{username}</Text>
      <Text style={styles.emailText}>{email}</Text>
    </View>
  </View>
  <Separator height={70}/>
  <View style={styles.mainContainer}>
    <Text style={styles.sectionHeaderText}>My Account</Text>
    <TouchableOpacity style={styles.sectionContainer} activeOpacity={0.8}>
      <View style={styles.sectionTextContainer}>
        <Ionicons
          name="person-outline"
          size={18}
          color={Colors.DEFAULT_GREEN}
        />
        <Separator width={5}/>
        <Text style={styles.sectionText}>{username}</Text>
      </View>
      <Feather
        name="edit-2"
        color={Colors.INACTIVE_GREY}
        size={20}
      />
    </TouchableOpacity>

    <TouchableOpacity style={styles.sectionContainer} activeOpacity={0.8}>
      <View style={styles.sectionTextContainer}>
        <Feather
          name="lock"
          size={18}
          color={Colors.DEFAULT_GREEN}
        />
        <Text style={styles.sectionText}>Password</Text>
      </View>
      <Feather
        name="chevron-right"
        color={Colors.INACTIVE_GREY}
        size={20}
      />
    </TouchableOpacity>

    <TouchableOpacity style={styles.sectionContainer} activeOpacity={0.8}>
      <View style={styles.sectionTextContainer}>
        <Feather
          name="mail"
          size={18}
          color={Colors.DEFAULT_GREEN}
        />
        <Text style={styles.sectionText}>{email}</Text>
      </View>
      <Feather
        name="chevron-right"
        color={Colors.INACTIVE_GREY}
        size={20}
      />
    </TouchableOpacity>

    <TouchableOpacity style={styles.sectionContainer} activeOpacity={0.8}>
      <View style={styles.sectionTextContainer}>
        <Feather
          name="phone"
          size={18}
          color={Colors.DEFAULT_GREEN}
        />
        <Text style={styles.sectionText}>{phoneNumber? phoneNumber :'Phone Number'}</Text>
      </View>
      <Feather
        name="chevron-right"
        color={Colors.INACTIVE_GREY}
        size={20}
      />
    </TouchableOpacity>
    
    <TouchableOpacity style={styles.sectionContainer} activeOpacity={0.8}>
      <View style={styles.sectionTextContainer}>
        <Feather
          name="map-pin"
          size={18}
          color={Colors.DEFAULT_GREEN}
        />
        <Text style={styles.sectionText}>{address? address : 'Address'}</Text>
      </View>
      <Feather
        name="chevron-right"
        color={Colors.INACTIVE_GREY}
        size={20}
      />
    </TouchableOpacity>

    <TouchableOpacity style={styles.sectionContainer} activeOpacity={0.8}>
      <View style={styles.sectionTextContainer}>
        <Feather
          name="globe"
          size={18}
          color={Colors.DEFAULT_GREEN}
        />
        <Text style={styles.sectionText}>Language-English</Text>
      </View>
      <Feather
        name="chevron-right"
        color={Colors.INACTIVE_GREY}
        size={20}
      />
    </TouchableOpacity>
    
    
  </View>
</View>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: Colors.SECONDARY_WHITE,
},
backgroundCurvedContainer: {
backgroundColor: Colors.DEFAULT_GREEN,
height: 2000,
position: 'absolute',
top: -1 * (2000 - 230),
width: 2000,
borderRadius: 2000,
alignSelf: 'center',
zIndex: -1,
},
headerContainer: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
paddingVertical: 10,
paddingHorizontal: 20,
},
headerText: {
fontSize: 20,
fontFamily: Fonts.POPPINS_MEDIUM,
lineHeight: 20 * 1.4,
color: Colors.DEFAULT_WHITE,
},
alertBadge: {
backgroundColor: Colors.DEFAULT_YELLOW,
position: 'absolute',
height: 16,
width: 16,
borderRadius: 32,
justifyContent: 'center',
alignItems: 'center',
right: -2,
top: -10,
},
alertBadgeText: {
fontSize: 10,
fontFamily: Fonts.POPPINS_BOLD,
lineHeight: 10 * 1.4,
color: Colors.DEFAULT_WHITE,
},
profileHeaderContainer: {
marginHorizontal: 20,
flexDirection: 'row',
alignItems: 'center',
marginTop: 10,
},
profileImageContainer: {
backgroundColor: Colors.DEFAULT_WHITE,
borderRadius: 32,
justifyContent: 'center',
alignItems: 'center',
padding: 1,
elevation: 3,
},
profileImage: {
width: Display.setWidth(15),
height: Display.setWidth(15),
borderRadius: 32,
},
profileTextContainer: {
marginLeft: 10,
},
nameText: {
fontSize: 14,
fontFamily: Fonts.POPPINS_REGULAR,
lineHeight: 14 * 1.4,
color: Colors.DEFAULT_WHITE,
},
emailText: {
fontSize: 10,
fontFamily: Fonts.POPPINS_REGULAR,
lineHeight: 10 * 1.4,
color: Colors.DEFAULT_WHITE,
},
menuContainer: {
backgroundColor: Colors.DEFAULT_WHITE,
borderRadius: 10,
marginHorizontal: 20,
marginTop: 20,
elevation: 3,
flexDirection: 'row',
justifyContent: 'space-between',
paddingVertical: 20,
},
menuItem: {
flex: 1,
alignItems: 'center',
},
menuIcon: {
backgroundColor: Colors.LIGHT_GREEN,
height: Display.setWidth(8),
width: Display.setWidth(8),
justifyContent: 'center',
alignItems: 'center',
borderRadius: 32,
},
menuText: {
fontSize: 12,
fontFamily: Fonts.POPPINS_SEMI_BOLD,
lineHeight: 12 * 1.4,
color: Colors.DEFAULT_BLACK,
textAlign: 'center',
marginTop: 5,
},
mainContainer: {
marginHorizontal: 20,
marginTop: 10,
backgroundColor: Colors.DEFAULT_WHITE,
elevation: 3,
paddingHorizontal: 20,
borderRadius: 10,
paddingBottom: 20,
},
sectionHeaderText: {
fontSize: 14,
fontFamily: Fonts.POPPINS_SEMI_BOLD,
lineHeight: 14 * 1.4,
color: Colors.DEFAULT_BLACK,
marginTop: 25,
},
sectionContainer: {
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'space-between',
marginTop: 15,
},
sectionTextContainer: {
flexDirection: 'row',
alignItems: 'center',
},
sectionText: {
fontSize: 16,
fontFamily: Fonts.POPPINS_REGULAR,
lineHeight: 16 * 1.4,
color: Colors.INACTIVE_GREY,
marginLeft: 10,

},
});

export default ProfileScreen