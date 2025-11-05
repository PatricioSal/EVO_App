import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

let Video, ResizeMode;
try {
    const avModule = require('expo-av');
    Video = avModule.Video;
    ResizeMode = avModule.ResizeMode;
} catch (error) {
    console.error('Failed to load expo-av:', error);
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function VideoFeed() {
    const navigation = useNavigation();
    const route = useRoute();
    const [videos, setVideos] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const videoRefs = useRef({});

    // Check if there's a new video from PostPreview
    useEffect(() => {
        if (route.params?.newVideo) {
            const newVideo = route.params.newVideo;
            // Add video to list (even if it's null/empty)
            setVideos(prev => [newVideo, ...prev]);
            // Clear the params so it doesn't add again on re-render
            navigation.setParams({ newVideo: null });
        }
    }, [route.params?.newVideo]);

    // Sample videos for demonstration (replace with your actual video data)
    useEffect(() => {
        // You can load videos from your backend here
        // For now, we'll use empty array or sample data
        if (videos.length === 0) {
            // This is just for demo - replace with actual data fetching
            setVideos([]);
        }
    }, []);

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            const newIndex = viewableItems[0].index;
            setCurrentIndex(newIndex);
            
            // Play current video, pause others
            Object.keys(videoRefs.current).forEach((key) => {
                if (key === String(newIndex)) {
                    videoRefs.current[key]?.playAsync();
                } else {
                    videoRefs.current[key]?.pauseAsync();
                }
            });
        }
    }).current;

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50,
    };

    const renderVideo = ({ item, index }) => {
        const hasVideoUri = item?.uri && item.uri !== null;
        
        return (
            <View style={styles.videoContainer}>
                {hasVideoUri && Video ? (
                    <Video
                        ref={(ref) => {
                            videoRefs.current[String(index)] = ref;
                        }}
                        source={{ uri: item.uri }}
                        style={styles.video}
                        resizeMode={ResizeMode?.COVER || 'cover'}
                        isLooping
                        shouldPlay={index === currentIndex}
                        onPlaybackStatusUpdate={(status) => {
                            if (status.didJustFinish) {
                                // Video finished, could auto-play next or loop
                            }
                        }}
                    />
                ) : (
                    <View style={styles.placeholderContainer}>
                        <Text style={styles.placeholderText}>Video would go here if existed</Text>
                    </View>
                )}
                
                {/* Description at the bottom like TikTok */}
                <View style={styles.overlay}>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.description}>{item?.description || 'No description'}</Text>
                    </View>
                </View>
            </View>
        );
    };

    // Show placeholder if no videos
    if (videos.length === 0) {
        return (
            <View style={styles.container}>
                <View style={styles.placeholderContainer}>
                    <Text style={styles.placeholderText}>Video would go here if existed</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={videos}
                renderItem={renderVideo}
                keyExtractor={(item, index) => String(index)}
                pagingEnabled
                showsVerticalScrollIndicator={false}
                snapToInterval={SCREEN_HEIGHT}
                snapToAlignment="start"
                decelerationRate="fast"
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                getItemLayout={(data, index) => ({
                    length: SCREEN_HEIGHT,
                    offset: SCREEN_HEIGHT * index,
                    index,
                })}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    videoContainer: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: '#000',
    },
    video: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        paddingBottom: 100,
    },
    descriptionContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        padding: 15,
        borderRadius: 10,
    },
    description: {
        color: '#fff',
        fontSize: 16,
    },
    placeholderContainer: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: '#999',
        fontSize: 18,
        textAlign: 'center',
    },
});

