import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { firebase } from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Color } from '../../../GlobalStyles';
import Colors from '../../constants/Colors';
import Header from '../../components/Header';


const SupportOld = ({ navigation }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const chatRef = firebase.firestore().collection('chats/chatID1/messages');

    const unsubscribe = chatRef.onSnapshot((querySnapshot) => {
      const chatMessages = [];
      querySnapshot.forEach((doc) => {
        const { text, user, createdAt } = doc.data();
        chatMessages.push({
          _id: doc.id,
          text,
          user,
          createdAt: createdAt.toDate(),
        });
      });
      setMessages(chatMessages);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const onSend = (newMessages = []) => {
    const chatRef = firebase.firestore().collection('chats/chatID1/messages');
    chatRef.add({
      text: newMessages[0].text,
      user: {
        _id: 'user1',
        name: 'User 1',
      },
      createdAt: new Date(),
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Support" />

      <GiftedChat
        textInputProps={{
          style: {
            color: 'black',
            width: "85%",
            height: 50,
            textalign: 'center'
            // height:"20%"
            // Set your desired text color here
            // backgroundColor: 'yourBackgroundColor', // Set your desired background color here
          },
        }}
        renderBubble={props => {
          return (

            <Bubble
              {...props}

              textStyle={{
                right: {
                  color: 'white',
                  fontFamily: "CerebriSans-Book"
                },
                left: {
                  color: '#24204F',
                  fontFamily: "CerebriSans-Book"
                },
              }}
              wrapperStyle={{
                left: {
                  backgroundColor: '#E6E5EB',
                },
                right: {
                  backgroundColor: "#BF6BBB",
                },
              }}
            />
          );
        }}
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: 'user1',
        }}
      />
    </View>
  );
};

export default SupportOld;
