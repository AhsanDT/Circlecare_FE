import React, { useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, SafeAreaView, StatusBar } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Video from 'react-native-video';
import { scale } from '../utils/responsiveSizes';
import Header from './Header';
import Colors from '../constants/Colors';

const VideoPlayer = () => {
    const route = useRoute();

    const videoRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.black }}>
            <StatusBar barStyle={'light-content'} backgroundColor='black' translucent={false} />
            {/* <StatusBar barStyle={'light-content'} /> */}
            <View flex={1}>
                <Header custumStyles={{ backgroundColor: 'black' }} />
                <View style={styles.container}>
                    {isLoading && <ActivityIndicator size='large' color="white" style={{ marginTop: 20 }} />}

                    <Video
                        ref={videoRef}
                        source={{ uri: route?.params?.source }}
                        style={isFullScreen ? styles.fullScreen : styles.video}
                        resizeMode="contain"
                        controls={true}
                        fullscreenOrientation='landscape'
                        // playInBackground={true}
                        onLoad={() => setIsLoading(true)}
                        onReadyForDisplay={() => setIsLoading(false)}
                        onFullscreenPlayerWillPresent={toggleFullScreen}
                        onFullscreenPlayerWillDismiss={toggleFullScreen}
                        onEnd={() => console.log('Video ended')}
                        onError={(error) => console.log('Error: ', error)}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default VideoPlayer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    video: {
        // width: Dimensions.get('window').width,
        height: scale(220),
        // backgroundColor: 'lightgreen',
    },
    fullScreen: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
