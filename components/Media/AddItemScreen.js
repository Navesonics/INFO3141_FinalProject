import React, { useState } from 'react';
import { View, Image, TextInput, Button, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native";

const AddNewRoomItemScreen = () => {
    const [imageUri, setImageUri] = useState(null);
    const [altText, setAltText] = useState('');
    const [imageLoaded, setImageLoaded] = useState(false);
    const navigation = useNavigation();

    const takePicture = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImageUri(result.uri);
            setImageLoaded(true);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImageUri(result.uri);
            setImageLoaded(true);
        }
    };

    const clearImage = () => {
        setImageUri(null);
        setAltText('');
        setImageLoaded(false);
    };

    const useImage = () => {
        navigation.navigate('MediaScreen', { selectedImage: imageUri, altText });
    };


    return (
        <View style={styles.container}>
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
                        <Button title="Take a Picture" onPress={takePicture} style={styles.button} />
                    </View>
                    <View style={styles.buttonWrapper}>
                        <Button title="Load from Media Library" onPress={pickImage} style={styles.button} />
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
        marginVertical: 5, 
        width: '100%', 
    },
    button: {
        width: '100%',
    },
});

export default AddNewRoomItemScreen;
