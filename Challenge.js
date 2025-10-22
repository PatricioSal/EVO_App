import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';

//Images
import physicalImg from './assets/PhysicalPic.jpg';
import educationlImg from './assets/EducationPic.jpg';
import adventureImg from './assets/AdventurePic.jpg';
import communityImg from './assets/CommunityPic.jpg';
import evoImg from './assets/EvoImg.png';

export default function Challenge() {
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleGenerate = () => {
        // This will send the data to AI later
        console.log('Selected Difficulty:', selectedDifficulty);
        console.log('Selected Category:', selectedCategory);
    };

    return (
        <View style={styles.container}>
            <Image
                source={evoImg} 
                style={styles.evoHeader}

            />
            <View style={styles.bigbox}>
                {/* EVO Header */}
                

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
                >
                    <Text style={styles.generateText}>Generate</Text>
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
    evoText: {
        color: '#52B937',
        fontSize: 24,
        fontWeight: 'bold',
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
    textOverlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        paddingVertical: 8,
        alignItems: 'center',
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
});