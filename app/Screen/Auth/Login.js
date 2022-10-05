import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Animated,
  TextInput,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import {
  Container,
  Card,
  CardItem,
  Icon,
} from 'native-base';
import uuid from 'react-native-uuid';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { COLORS } from '../../Component/Constant/Color';
import { FONTS } from '../../Component/Constant/Font';
import Navigation from '../../Service/Navigation';
import database from '@react-native-firebase/database';
import SimpleToast from 'react-native-simple-toast';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Redux/reducer/user';
import Auth from '../../Service/Auth';
import { GoogleSignin,statusCodes } from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';

const {width, height} = Dimensions.get('window');

function Login() {
 const logo_img='https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/800px-Signal-Logo.svg.png'
 const google_logo='https://seeklogo.com/images/G/google-2015-logo-65BBD07B01-seeklogo.com.png'
 const dispatch = useDispatch();
  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');
  const [load, setLoad] = useState(false);
  GoogleSignin.configure({
    webClientId: '1011617769854-45rhiitpbd6bhklk0u60suosdmg8qqfk.apps.googleusercontent.com',
  });
  
  const loginWithGoogle=async ()=>{
try {
   setLoad(true)
 const res = await GoogleSignin.signIn();
 console.log("res-------------",res)
if(res?.user){
  console.log("user-------------",res.user)
  await loginUser(res.user)
  setLoad(false)
}
} catch (error) {
  if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    null
  }
  else{
  Alert.alert("ERROR","AN ERROR TO SIGN IN WITH GOOGLE")
  }
  setLoad(false)
  console.log("error-------------",error)
}
  }
  const loginUser = async ({email,name,photo}) => {
    let userData;
    database()
      .ref('users/')
      .orderByChild("emailId")
      .equalTo(email)
      .once('value')
      .then( async snapshot => {
        if (snapshot.val() == null) {
          //  SimpleToast.show("Invalid Email Id!");
          //  return false;
           userData = {
            id: uuid.v4(),
            name: name,
            emailId: email,
            // password: pass,
            about: "lorem ipsum ",
            img :photo?photo: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png"
          };
      
         await database()
            .ref('/users/'+userData.id)
            .set(userData)
         
        }
        else  userData = Object.values(snapshot.val())[0];
        console.log('User data: ', userData);
        dispatch(setUser(userData));
        await Auth.setAccount(userData);
        SimpleToast.show("Login Successfully!");
        setLoad(false)
        return true
      })
      .catch(error=>{
        console.log("error-----------",error)
        setLoad(false)
        return false
      })
  };

  return (
    <Container>
      <StatusBar
        backgroundColor={COLORS.theme}
        barStyle="light-content"
        hidden={false}
      />
      <View style={styles.uppercard}>
        <Image 
         style={{width:70,height:70,borderRadius:35}}
         source={{uri:logo_img}}   
        />
        <Text 
        style={{color:'#fff',
        fontFamily: FONTS.Bold,
        fontSize:25
        }}>
         Chat App
        </Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
                style={styles.btn}
                onPress={loginWithGoogle}
                >
           {load? <ActivityIndicator size={27}
            color={COLORS.theme} style={{marginRight:10}} />
           :<> 
           <Image 
         style={{width:30,height:30,resizeMode:"contain",marginRight:10}}
         source={{uri:google_logo}}   
        />    
        </> }
          <Text style={styles.btnText}>Continue With Google</Text>
          
              </TouchableOpacity>
      </View>
    </Container>
  );
}

export default Login;

const styles = StyleSheet.create({
  uppercard: {
    height: height *0.4,
    backgroundColor : COLORS.theme,
    borderBottomLeftRadius: height / 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: height / 2 - 50,
    width: '95%',
    resizeMode: 'cover',
    borderRadius: 13,
  },
  loginBtn: {
    height: 48,
    width: '95%',
    backgroundColor: COLORS.theme,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
  },
  loginText: {
    color : COLORS.lightgray,
    fontSize: 18,
    fontFamily : FONTS.Regular,
  },
  buttonSec: {marginTop: 20, justifyContent: 'center', alignItems: 'center'},
  logo: {
    height: height / 2 - 50,
    width: '95%',
    resizeMode: 'cover',
    borderRadius: 13,
  },

  inputs: {
    borderBottomColor: COLORS.white,
    flex: 1,
    color: COLORS.liteBlack,
    paddingLeft: 10,
    fontFamily : FONTS.Regular,
  },
  inputContainer: {
    borderRadius: 30,
    height:48,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginBottom:10,
    elevation: 2,
  },
  inputIconView: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor : COLORS.theme,
    height: '100%',
    borderRadius: 30,
    alignSelf: 'center',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    elevation: 2,
  },
  smallTxt: {
    fontSize: 13,
    color: COLORS.black,
    fontFamily : FONTS.Regular,
    marginTop: 10,
    opacity:.5,
    textAlign: 'center',
  },
  register: {
    fontSize: 13,
    fontFamily : FONTS.SemiBold,
    marginTop: 12,
    textAlign: 'center',
    color : COLORS.textInput,
    textDecorationLine:'underline'
  },
  contactView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  btnText: {
    color: COLORS.black,
    fontFamily : FONTS.SemiBold,
    fontSize: 16,
    marginTop: 2,
  },
  btn: {
    flexDirection:"row",
    backgroundColor : "white",
    width: '80%',
    minHeight: 50,
    borderRadius: 30,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    
    elevation: 7,
  },
  Login: {
    alignSelf: 'center',
    fontFamily : FONTS.Medium,
    color : COLORS.textInput,
    fontSize: 20,
    marginTop: 10,
  },
  cardView: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingBottom: 20,
    paddingTop: 20,
  }
});