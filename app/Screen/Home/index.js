import {Container, Icon} from 'native-base';
import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar, StyleSheet, TouchableOpacity} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import { useSelector } from 'react-redux';
import {COLORS} from '../../Component/Constant/Color';
import { FONTS } from '../../Component/Constant/Font';
import HomeHeader from '../../Component/Header/HomeHeader';
import Navigation from '../../Service/Navigation';
import database from '@react-native-firebase/database';

const Home = (props) => {

  const {userData} = useSelector(state => state.User);
  const [chatList, setchatList] = useState([]);

  useEffect(() => {
    getChatlist();
  }, []);

  const getChatlist = async () => {
    database()
    .ref('/chatlist/'+userData?.id)
    .on('value', snapshot => {
      // console.log('User data: ', Object.values(snapshot.val()));
      if (snapshot.val() != null) {
        setchatList(Object.values(snapshot.val()))
      }
    });
  
  }


  const renderItem = ({item}) => (
    <ListItem 
    containerStyle={{paddingVertical:8,marginVertical:0}}
    onPress={()=>Navigation.navigate('SingleChat',{receiverData:item})}>
      <Avatar 
      source={{uri: item.img}} 
      rounded
      // title={item.name.charAt(0)}
      size="medium" />
      <ListItem.Content>
        <ListItem.Title style={{fontFamily:FONTS.Medium,fontSize:14}}>
           {item.name}
        </ListItem.Title>
        <ListItem.Subtitle 
        style={{fontFamily:FONTS.Regular,fontSize:12}}  numberOfLines={1}>
          {item.lastMsg}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <Container style={{flex: 1, backgroundColor: COLORS.white}}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <HomeHeader />
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item,index) => index.toString()}
        data={chatList}
        renderItem={renderItem}
      />
      <TouchableOpacity 
      style={styles.but}
      onPress={()=>Navigation.navigate('AllUser')}>
          <Icon 
              name="chat"
              type="MaterialCommunityIcons"
              style={{color:COLORS.white,fontSize:30}}
          />
      </TouchableOpacity>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({
  but: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.theme,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});