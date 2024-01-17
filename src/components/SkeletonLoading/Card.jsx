import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const SkeletonLoader = () => {
    const pulseAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnimation, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnimation, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ]),
        );

        pulse.start();

        return () => pulse.stop();
    }, [pulseAnimation]);

    const pulseStyles = {
        opacity: pulseAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1],
        }),
        transform: [
            {
                scale: pulseAnimation.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [1, 1.2, 1],
                }),
            },
        ],
    };

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.skeleton, pulseStyles]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    skeleton: {
        width: 200,
        height: 20,
        backgroundColor: '#E0E0E0', // Placeholder color
        borderRadius: 5,
        marginBottom: 10,
    },
});

export default SkeletonLoader;
