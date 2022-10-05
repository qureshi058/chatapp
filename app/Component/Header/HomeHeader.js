import { Icon } from 'native-base'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { useSelector,useDispatch } from 'react-redux'
import { COLORS } from '../Constant/Color'
import { FONTS } from '../Constant/Font'
import { removeUser } from '../../Redux/reducer/user';
import Auth from '../../Service/Auth.js'

const HomeHeader = () => {
  const dispatch = useDispatch();
    const {userData} = useSelector(state => state.User);
    const logout_user=()=>{
       Auth.logout()
        .then(res=>{
            console.log("res-------",res)
            dispatch(removeUser())
        })
        .catch((error)=>console.log("error logout---------",error))
    }
    return (
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',
        padding:10,paddingHorizontal:15,backgroundColor:COLORS.white,elevation:2,paddingVertical:15}}>
            <Text style={styles.logo}>{userData?.name}</Text>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                
                <Avatar 
                  source={{uri: userData.img}} 
                  rounded
                  size="small" />
                  <Icon 
                  onPress={logout_user}
                 name={"logout"}
                 type={"MaterialIcons"}
                 style={{color:COLORS.theme,marginLeft:7}}
                />
            </View>
        </View>
    )
}

export default HomeHeader;

const styles = StyleSheet.create({
    logo: {
        fontFamily: FONTS.Bold,
        color: COLORS.theme,
        fontSize: 22,
      },
})
