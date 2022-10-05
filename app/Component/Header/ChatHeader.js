//import liraries
import { Icon } from 'native-base';
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, Platform } from 'react-native';
import moment from 'moment';
import { COLORS } from '../Constant/Color';
import { FONTS } from '../Constant/Font';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import Navigation from '../../Service/Navigation';

// create a component
const ChatHeader = (props) => {
    const { data } = props;
    // console.log("cht saa",data);

    const [lastSeen, setlastSeen] = useState('')

    return (
        <View style={styles.container}>

            <StatusBar barStyle="light-content" backgroundColor={COLORS.theme} translucent={false} />
            <Icon
                style={{
                    marginHorizontal: 10,
                    color: COLORS.white,
                }}
                name = "chevron-back"
                type = "Ionicons"
                onPress = {() => Navigation.back()}
            />
          
            <View 
                style={{flex:1, alignItems:"center"}}
            >
                <Text
                    numberOfLines={1}
                    style={{
                        color: COLORS.white,
                        fontSize: 16,
                        fontFamily: FONTS.SemiBold,
                        textTransform:'capitalize'
                    }}
                >
                    {data.name}
                </Text>

                {/* <Text
                    style={{ color: COLORS.primaryBackground, fontSize: 10,fontFamily: FONTS.Regular }}
                >
                    {lastSeen}
                </Text> */}
            </View>

            <Avatar
              containerStyle={{marginRight:10}}
               source = {{uri: data.img}} 
               rounded
               size="small"
            /> 

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        height:70,
        backgroundColor: COLORS.theme,
        elevation: 5,
        flexDirection: 'row',
        alignItems:'center',
    },
});

//make this component available to the app
export default ChatHeader;