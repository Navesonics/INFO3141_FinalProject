import React, { useState } from 'react';
import { View, Button, FlatList, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const MediaScreen = () => {
    const [images, setImages] = useState([]);
    const [imageUri, setImageUri] = useState(null);
    const [altText, setAltText] = useState('');
    const [imageLoaded, setImageLoaded] = useState(false);

    const takeImage = async () => {
        try {
            let result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1
            });

            if (result.cancelled) return;
            const { uri } = result.assets[0];
            setImageUri(uri);
            setImageLoaded(true);
        } catch (ex) {
            console.log(ex);
        }
    };

    const loadLibrary = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (result.cancelled) return;
            const { uri } = result.assets[0];
            setImageUri(uri);
            setImageLoaded(true);
        } catch (error) {
            console.error("Error loading image from library:", error);
        }
    };

    const clearImage = () => {
        setImageUri(null);
        setAltText('');
        setImageLoaded(false);
    };

    const useImage = () => {
        if (imageUri) {
            const newImage = { uri: imageUri, altText };
            setImages([...images, newImage]);
            clearImage();
        }
    };
    const handleImagePress = (altText) => {
        alert(altText);
    };

    return (
        <View style={styles.container}>
            <FlatList
                    data={images}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleImagePress(item.altText)}>
                            <View style={styles.imageContainer}>
                                <Image source={{ uri: item.uri }} style={styles.image} />
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
            />
            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
            <TextInput
                placeholder="Enter alt text"
                value={altText}
                onChangeText={setAltText}
                style={styles.input}
            />
             {!imageLoaded && (
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonWrapper}>
                        <Button title="Take a Picture" onPress={takeImage} style={styles.button} />
                    </View>
                    <View style={styles.buttonWrapper}>
                        <Button title="Load from Media Library" onPress={loadLibrary} style={styles.button} />
                    </View>
                </View>
            )}
            {imageLoaded && altText !== '' && (
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonWrapper}>
                        <Button title="Use Image" onPress={useImage} style={styles.button} />
                    </View>
                    <View style={styles.buttonWrapper}>
                        <Button title="Clear Image" onPress={clearImage} style={styles.button} />
                    </View>
                </View>
            )}

            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 10,
    },
    input: {
        width: '80%',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
    buttonContainer: {
        flexDirection: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
    },
    buttonWrapper: {
        marginVertical: 5, // Add space between buttons vertically
        width: '100%', // Ensure buttons take full width of container
    },
    button: {
        width: '100%', // Ensure buttons take full width of container
    },
    imageContainer: {
        marginBottom: 10,
    },
});

export default MediaScreen;
