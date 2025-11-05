import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

let CameraView, CameraType, useCameraPermissions;
let Audio;
let cameraAvailable = false;
try {
    const cameraModule = require('expo-camera');
    CameraView = cameraModule.CameraView;
    CameraType = cameraModule.CameraType;
    useCameraPermissions = cameraModule.useCameraPermissions;
    cameraAvailable = true;
} catch (error) {
    console.error('Failed to load expo-camera:', error);
    cameraAvailable = false;
}

try {
    const avModule = require('expo-av');
    Audio = avModule.Audio;
} catch (error) {
    console.error('Failed to load expo-av:', error);
}

// Ensure useCameraPermissions is always defined (even as a dummy)
if (!useCameraPermissions) {
    useCameraPermissions = () => [null, () => {}];
}

export default function CameraScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const cameraRef = useRef(null);
    const recordingPromiseRef = useRef(null);
    const isCancelledRef = useRef(false);
    const recordingStartTimeRef = useRef(null);
    const [facing, setFacing] = useState(CameraType?.back || 'back');
    const [isRecording, setIsRecording] = useState(false);
    const [recordedVideo, setRecordedVideo] = useState(null);
    const [cameraError, setCameraError] = useState(null);
    const [audioPermission, setAudioPermission] = useState(null);
    
    // Always call useCameraPermissions - it's now always defined
    const [permission, requestPermission] = useCameraPermissions();

    // Request audio permissions
    useEffect(() => {
        const requestAudioPermission = async () => {
            if (Audio) {
                try {
                    const { status } = await Audio.requestPermissionsAsync();
                    setAudioPermission(status);
                } catch (error) {
                    console.error('Error requesting audio permission:', error);
                    setAudioPermission('denied');
                }
            }
        };
        requestAudioPermission();
    }, []);

    useEffect(() => {
        if (!cameraAvailable || !CameraView || !useCameraPermissions) {
            setCameraError('Camera module not available. Please rebuild the app after installing expo-camera.');
            return;
        }
        if (CameraType && facing !== CameraType.back && facing !== CameraType.front) {
            setFacing(CameraType.back);
        }
        if (permission && !permission.granted && requestPermission) {
            requestPermission();
        }
    }, [permission]);

    const toggleCameraFacing = () => {
        if (CameraType) {
            setFacing(current => {
                // Handle both string and enum values
                if (current === CameraType.back || current === 'back') {
                    return CameraType.front;
                } else {
                    return CameraType.back;
                }
            });
        }
    };

    const startRecording = async () => {
        // Check audio permission before recording
        if (Audio && audioPermission !== 'granted') {
            try {
                const { status } = await Audio.requestPermissionsAsync();
                setAudioPermission(status);
                if (status !== 'granted') {
                    Alert.alert(
                        'Microphone Permission Required',
                        'Please grant microphone permission to record videos with audio.',
                        [
                            { text: 'Cancel', style: 'cancel' },
                            { text: 'Grant Permission', onPress: async () => {
                                const { status: newStatus } = await Audio.requestPermissionsAsync();
                                setAudioPermission(newStatus);
                                if (newStatus === 'granted') {
                                    // Retry recording after permission granted
                                    startRecording();
                                }
                            }}
                        ]
                    );
                    return;
                }
            } catch (error) {
                console.error('Error requesting audio permission:', error);
                Alert.alert('Error', 'Failed to request microphone permission');
                return;
            }
        }

        if (cameraRef.current && !isRecording) {
            try {
                setIsRecording(true);
                isCancelledRef.current = false;
                recordingStartTimeRef.current = Date.now();
                
                // Start recording - recordAsync returns a promise that resolves when recording stops
                recordingPromiseRef.current = cameraRef.current.recordAsync({
                    maxDuration: 60, // 60 seconds max
                    quality: '720p',
                });

                // Wait for the promise to resolve (when stopRecording is called)
                const video = await recordingPromiseRef.current;
                recordingPromiseRef.current = null;
                recordingStartTimeRef.current = null;
                setIsRecording(false);
                
                // Always navigate to PostPreview if recording wasn't cancelled
                if (!isCancelledRef.current) {
                    // Pass video URI if we have it, otherwise null
                    const videoUri = (video && video.uri) ? video.uri : null;
                    navigation.navigate('PostPreview', { videoUri: videoUri });
                }
            } catch (error) {
                console.error('Error recording video:', error);
                setIsRecording(false);
                recordingPromiseRef.current = null;
                recordingStartTimeRef.current = null;
                
                // Always navigate to PostPreview even if recording failed
                if (!isCancelledRef.current) {
                    navigation.navigate('PostPreview', { videoUri: null });
                }
            }
        }
    };

    const stopRecording = async () => {
        if (cameraRef.current && isRecording) {
            try {
                // Stop recording - this will resolve the promise
                await cameraRef.current.stopRecording();
            } catch (error) {
                console.error('Error stopping recording:', error);
                // Even if stopping fails, we'll still navigate to preview
                setIsRecording(false);
                recordingPromiseRef.current = null;
                recordingStartTimeRef.current = null;
                
                // Navigate to PostPreview anyway with null video
                if (!isCancelledRef.current) {
                    navigation.navigate('PostPreview', { videoUri: null });
                }
            }
        }
    };

    const handleCancel = () => {
        if (isRecording) {
            isCancelledRef.current = true;
            stopRecording().then(() => {
                // Recording stopped, but don't navigate since it was cancelled
                setIsRecording(false);
                navigation.goBack();
            }).catch(() => {
                setIsRecording(false);
                navigation.goBack();
            });
        } else {
            navigation.goBack();
        }
    };

    // Show error/permission screens if needed
    if (cameraError || !CameraView) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>{cameraError || 'Camera not available'}</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (!permission) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Requesting camera permission...</Text>
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to use the camera</Text>
                <TouchableOpacity style={styles.button} onPress={requestPermission}>
                    <Text style={styles.buttonText}>Grant Permission</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { marginTop: 10, backgroundColor: '#AA0707' }]} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        );
    }


    return (
        <View style={styles.container}>
            <CameraView
                ref={cameraRef}
                style={styles.camera}
                facing={facing}
            />
            {/* Controls overlay with absolute positioning */}
            <View style={styles.controlsContainer}>
                {/* Top Controls */}
                <View style={styles.topControls}>
                    <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                        <Text style={styles.cancelButtonText}>✕</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
                        <Text style={styles.flipButtonText}>🔄</Text>
                    </TouchableOpacity>
                </View>

                {/* Bottom Controls */}
                <View style={styles.bottomControls}>
                    {!isRecording ? (
                        <TouchableOpacity style={styles.recordButton} onPress={startRecording}>
                            <View style={styles.recordButtonInner} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.stopButton} onPress={stopRecording}>
                            <View style={styles.stopButtonInner} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    camera: {
        flex: 1,
    },
    controlsContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
        pointerEvents: 'box-none',
    },
    topControls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 50,
        paddingHorizontal: 20,
        pointerEvents: 'auto',
    },
    cancelButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 25,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    flipButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 25,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flipButtonText: {
        color: '#fff',
        fontSize: 24,
    },
    bottomControls: {
        alignItems: 'center',
        paddingBottom: 50,
        pointerEvents: 'auto',
    },
    recordButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 4,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    recordButtonInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#52B937',
    },
    stopButton: {
        width: 80,
        height: 80,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
        borderWidth: 4,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stopButtonInner: {
        width: 40,
        height: 40,
        borderRadius: 5,
        backgroundColor: '#AA0707',
    },
    message: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#52B937',
        padding: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

