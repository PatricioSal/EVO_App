import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

let Video, ResizeMode;
try {
    const avModule = require('expo-av');
    Video = avModule.Video;
    ResizeMode = avModule.ResizeMode;
} catch (error) {
    console.error('Failed to load expo-av:', error);
}

export default function PostPreview() {
    const navigation = useNavigation();
    const route = useRoute();
    const { videoUri } = route.params || {};
    const [description, setDescription] = useState('');
    const videoRef = React.useRef(null);
    const [status, setStatus] = React.useState({});

    const handleDone = () => {
        // Navigate to Video tab in MainTabs with the video data (or null if no video)
        navigation.navigate('MainTabs', {
            screen: 'Video',
            params: {
                newVideo: {
                    uri: videoUri || null,
                    description: description,
                    timestamp: new Date().toISOString(),
                }
            }
        });
    };

    const handleReRecord = () => {
        // Go back to camera screen to record again
        navigation.goBack();
    };

    // Show placeholder if no video
    const hasVideo = videoUri && videoUri !== null;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Preview Your Video</Text>
            
            <View style={styles.videoContainer}>
                {hasVideo && Video ? (
                    <Video
                        ref={videoRef}
                        style={styles.video}
                        source={{ uri: videoUri }}
                        useNativeControls
                        resizeMode={ResizeMode?.CONTAIN || 'contain'}
                        isLooping
                        onPlaybackStatusUpdate={setStatus}
                    />
                ) : (
                    <View style={styles.placeholderContainer}>
                        <Text style={styles.placeholderText}>📹</Text>
                        <Text style={styles.placeholderSubtext}>
                            {hasVideo ? 'Video player not available' : 'No video recorded'}
                        </Text>
                        <Text style={styles.placeholderSubtext}>Tap Re-record to try again</Text>
                    </View>
                )}
            </View>

            <View style={styles.descriptionContainer}>
                <Text style={styles.label}>Add a description:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Describe your challenge completion..."
                    placeholderTextColor="#999"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    numberOfLines={4}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.rerecordButton} onPress={handleReRecord}>
                    <Text style={styles.rerecordButtonText}>Re-record</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
                    <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#23353A',
        padding: 20,
    },
    title: {
        color: '#52B937',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 40,
        marginBottom: 20,
    },
    videoContainer: {
        width: '100%',
        height: 300,
        backgroundColor: '#000',
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#52B937',
    },
    video: {
        width: '100%',
        height: '100%',
    },
    descriptionContainer: {
        marginBottom: 20,
    },
    label: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        backgroundColor: '#023E05',
        borderRadius: 12,
        padding: 15,
        color: '#fff',
        fontSize: 16,
        borderWidth: 2,
        borderColor: '#52B937',
        minHeight: 100,
        textAlignVertical: 'top',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 15,
    },
    rerecordButton: {
        backgroundColor: '#AA0707',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#640202',
        flex: 1,
        alignItems: 'center',
    },
    rerecordButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    doneButton: {
        backgroundColor: '#023E05',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#52B937',
        flex: 1,
        alignItems: 'center',
    },
    doneButtonText: {
        color: '#52B937',
        fontSize: 18,
        fontWeight: 'bold',
    },
    placeholderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#023E05',
    },
    placeholderText: {
        fontSize: 64,
        marginBottom: 20,
    },
    placeholderSubtext: {
        color: '#999',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 5,
    },
    errorText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#52B937',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorText: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 20,
    },
});

