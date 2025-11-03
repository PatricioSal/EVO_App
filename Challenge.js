import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, ActivityIndicator, Modal, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//Images
import physicalImg from './assets/PhysicalPic.jpg';
import educationlImg from './assets/EducationPic.jpg';
import adventureImg from './assets/AdventurePic.jpg';
import communityImg from './assets/CommunityPic.jpg';
import evoImg from './assets/EvoImg.png';

export default function Challenge() {
    const navigation = useNavigation();
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [aiResponse, setAiResponse] = useState(null);
    const [showChallengeScreen, setShowChallengeScreen] = useState(false);

    const generateChallenge = async () => {
        setIsGenerating(true);
        
        try {
            // Call Groq API
            const response = await fetch(
                'https://api.groq.com/openai/v1/chat/completions',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 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',
                    },
                    body: JSON.stringify({
                        model: 'llama-3.1-8b-instant',
                        messages: [
                            {
                                role: 'system',
                                content: 'You are a creative challenge generator. Generate short, actionable challenges in 2-3 sentences. These challenges should be able to be completed in a minute max once the challenge has begun. Keep it nice and fun that social media could also enjoy. Dont say anything else other than explaing the title of the challenge and the description.'
                            },
                            {
                                role: 'user',
                                content: `Generate a creative and achievable ${selectedDifficulty.toLowerCase()} difficulty ${selectedCategory.toLowerCase()} challenge.`
                            }
                        ],
                        temperature: 0.8,
                        max_tokens: 150,
                    })
                }
            );

            const data = await response.json();
            console.log('Groq response:', data);
            
            if (data.choices && data.choices[0] && data.choices[0].message) {
                const generatedText = data.choices[0].message.content.trim();
                setAiResponse(generatedText);
                setShowChallengeScreen(true);
            } else if (data.error) {
                alert(`AI Error: ${data.error.message}`);
            } else {
                throw new Error('Invalid response from AI');
            }
            
        } catch (error) {
            console.error('AI Error:', error);
            alert('Failed to generate challenge. Please check your API key and try again!');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleGenerate = () => {
        // Validate selections
        if (!selectedDifficulty || !selectedCategory) {
            alert('Please select both difficulty and category!');
            return;
        }

        generateChallenge();
    };

    const handleNo = () => {
        // User doesn't like this challenge, generate a new one
        generateChallenge();
    };

    const handleBeginRecording = () => {
        // This will handle video recording later
        alert('Recording functionality coming soon!');
        // Go back to HomeScreen
        navigation.goBack();
    };

    // Challenge Screen (shown after AI generates response)
    if (showChallengeScreen) {
        return (
            <View style={styles.container}>
                <Image
                    source={evoImg} 
                    style={styles.evoHeader}
                />
                <View style={styles.challengeScreenBox}>
                    <Text style={styles.challengeTitle}>Your Challenge:</Text>
                    
                    <ScrollView 
                        style={styles.challengeScrollView}
                        contentContainerStyle={styles.challengeScrollContent}
                    >
                        <Text style={styles.challengeText}>{aiResponse}</Text>
                    </ScrollView>

                    <View style={styles.challengeButtonContainer}>
                        <TouchableOpacity
                            style={styles.noBtn}
                            onPress={handleNo}
                        >
                            <Text style={styles.noBtnText}>✗ No</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.recordBtn}
                            onPress={handleBeginRecording}
                        >
                            <Text style={styles.recordText}>Begin Recording</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Loading Modal for regenerating */}
                <Modal
                    transparent={true}
                    visible={isGenerating}
                    animationType="fade"
                >
                    <View style={styles.loadingOverlay}>
                        <View style={styles.loadingBox}>
                            <ActivityIndicator size="large" color="#52B937" />
                            <Text style={styles.loadingText}>AI is thinking...</Text>
                            <Text style={styles.loadingSubtext}>Generating your challenge</Text>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }

    // Main Selection Screen
    return (
        <View style={styles.container}>
            <Image
                source={evoImg} 
                style={styles.evoHeader}
            />
            <View style={styles.bigbox}>
                {/* Difficulty Section */}
                <Text style={styles.boxText}>Choose Difficulty of</Text>
                <Text style={styles.boxText}>Your Challenge</Text>

                <View style={styles.difficultyRow}>
                    <TouchableOpacity
                        style={[
                            styles.difficultyBtn,
                            styles.easyBtn,
                            selectedDifficulty === 'Easy' && styles.selectedDifficulty
                        ]}
                        onPress={() => setSelectedDifficulty('Easy')}
                    >
                        <Text style={styles.difficultyText}>Easy</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.difficultyBtn,
                            styles.mediumBtn,
                            selectedDifficulty === 'Medium' && styles.selectedDifficulty
                        ]}
                        onPress={() => setSelectedDifficulty('Medium')}
                    >
                        <Text style={styles.difficultyText}>Medium</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.difficultyBtn,
                            styles.hardBtn,
                            selectedDifficulty === 'Hard' && styles.selectedDifficulty
                        ]}
                        onPress={() => setSelectedDifficulty('Hard')}
                    >
                        <Text style={styles.difficultyText}>Hard</Text>
                    </TouchableOpacity>
                </View>

                {/* Extreme Button */}
                <TouchableOpacity
                    style={[
                        styles.extremeBtn,
                        selectedDifficulty === 'Extreme' && styles.selectedExtreme
                    ]}
                    onPress={() => setSelectedDifficulty('Extreme')}
                >
                    <Text style={styles.extremeText}>EXTREME</Text>
                </TouchableOpacity>

                {/* Category Section */}
                <Text style={[styles.boxText, { marginTop: 20 }]}>Choose Your Category</Text>

                <View style={styles.categoryGrid}>
                    <TouchableOpacity
                        style={[
                            styles.categoryBtn,
                            selectedCategory === 'Physical' && styles.selectedCategory
                        ]}
                        onPress={() => setSelectedCategory('Physical')}
                    >
                        <ImageBackground 
                            source={physicalImg} 
                            style={styles.categoryBg}
                            imageStyle={{borderRadius: 12}}
                            resizeMode="cover"
                        >
                            <Text style={styles.categoryText}>Physical</Text>
                        </ImageBackground>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.categoryBtn,
                            selectedCategory === 'Education' && styles.selectedCategory
                        ]}
                        onPress={() => setSelectedCategory('Education')}
                    >
                        <ImageBackground
                            source={educationlImg} 
                            style={styles.categoryBg}
                            imageStyle={{borderRadius: 12}}
                            resizeMode="cover"
                        >
                            <Text style={styles.categoryText}>Education</Text>
                        </ImageBackground>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.categoryBtn,
                            selectedCategory === 'Adventure' && styles.selectedCategory
                        ]}
                        onPress={() => setSelectedCategory('Adventure')}
                    >
                        <ImageBackground 
                            source={adventureImg} 
                            style={styles.categoryBg}
                            imageStyle={{borderRadius: 12}}
                            resizeMode="cover"
                        >
                            <Text style={styles.categoryText}>Adventure</Text>
                        </ImageBackground>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.categoryBtn,
                            selectedCategory === 'Community' && styles.selectedCategory
                        ]}
                        onPress={() => setSelectedCategory('Community')}
                    >
                        <ImageBackground 
                            source={communityImg} 
                            style={styles.categoryBg}
                            imageStyle={{borderRadius: 12}}
                            resizeMode="cover"
                        >
                            <Text style={styles.categoryText}>Community</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>

                {/* Generate Button */}
                <TouchableOpacity
                    style={styles.generateBtn}
                    onPress={handleGenerate}
                    disabled={isGenerating}
                >
                    <Text style={styles.generateText}>
                        {isGenerating ? 'Generating...' : 'Generate'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Loading Modal */}
            <Modal
                transparent={true}
                visible={isGenerating}
                animationType="fade"
            >
                <View style={styles.loadingOverlay}>
                    <View style={styles.loadingBox}>
                        <ActivityIndicator size="large" color="#52B937" />
                        <Text style={styles.loadingText}>AI is thinking...</Text>
                        <Text style={styles.loadingSubtext}>Generating your challenge</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#23353A',
        padding: 20,
        justifyContent: 'center',
    },
    bigbox: {
        backgroundColor: '#1A661E',
        borderColor: '#023E05',
        borderWidth: 5,
        borderRadius: 28,
        padding: 20,
        alignItems: 'center',
    },
    evoHeader: {
        width: 150,
        height:100,
        resizeMode:'contain',
        marginTop:-100,
        alignSelf: 'center',
    },
    boxText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    difficultyRow: {
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 10,
    },
    difficultyBtn: {
        paddingHorizontal: 20,
        paddingVertical: 6,
        borderWidth: 3,
        marginHorizontal: 5,
        borderRadius: 20,
    },
    easyBtn: {
        backgroundColor: '#028009',
        borderColor: '#023E05'
    },
    mediumBtn: {
        backgroundColor: '#9FB607',
        borderColor: '#393F01'
    },
    hardBtn: {
        backgroundColor: '#CF530b',
        borderColor: '#4D2007'
    },
    selectedDifficulty: {
        borderColor: '#fff',
        borderWidth: 3,
        transform: [{ scale: 1.05 }],
    },
    difficultyText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    extremeBtn: {
        backgroundColor: '#AA0707',
        paddingVertical: 12,
        paddingHorizontal: 60,
        borderRadius: 20,
        marginTop: 10,
        borderWidth: 3,
        borderColor: '#640202',
    },
    selectedExtreme: {
        borderColor: '#fff',
        borderWidth: 3,
        transform: [{ scale: 1.05 }],
    },
    extremeText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    categoryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
        marginTop: 15,
        justifyContent: 'center',
    },
    categoryBtn: {
        width: 140,
        height: 120,
        borderRadius: 15,
        justifyContent: 'center',
        overflow: 'hidden',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: 'transparent',
    },
    selectedCategory: {
        borderColor: '#52B937',
        borderWidth: 4,
        transform: [{ scale: 1.05 }],
    },
    categoryBg: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
    },
    categoryText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 8,
    },
    generateBtn: {
        backgroundColor: '#023E05',
        paddingVertical: 12,
        paddingHorizontal: 60,
        borderRadius: 20,
        marginTop: 20,
        borderWidth: 2,
        borderColor: '#52B937',
    },
    generateText: {
        color: '#52B937',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loadingOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingBox: {
        backgroundColor: '#1A661E',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#52B937',
    },
    loadingText: {
        color: '#52B937',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
    },
    loadingSubtext: {
        color: '#fff',
        fontSize: 14,
        marginTop: 5,
    },
    // Challenge Screen Styles
    challengeScreenBox: {
        backgroundColor: '#1A661E',
        borderColor: '#023E05',
        borderWidth: 5,
        borderRadius: 28,
        padding: 20,
        width: '100%',
    },
    challengeTitle: {
        color: '#52B937',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    challengeScrollView: {
        maxHeight: 400,
        backgroundColor: '#023E05',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#52B937',
    },
    challengeScrollContent: {
        padding: 20,
        flexGrow: 1,
    },
    challengeText: {
        color: '#fff',
        fontSize: 20,
        lineHeight: 32,
        textAlign: 'center',
    },
    challengeButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        gap: 15,
    },
    noBtn: {
        backgroundColor: '#AA0707',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#640202',
        flex: 1,
        alignItems: 'center',
    },
    noBtnText: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    recordBtn: {
        backgroundColor: '#023E05',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#52B937',
        flex: 1,
        alignItems: 'center',
    },
    recordText: {
        color: '#52B937',
        fontSize: 20,
        fontWeight: 'bold',
    },
});