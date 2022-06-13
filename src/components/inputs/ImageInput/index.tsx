import {useCallback} from '@hooks';
import {Image, Pressable, View, Icon} from '@components';
import * as ImagePicker from 'react-native-image-picker';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {
  Alert,
  ImageStyle,
  StyleProp,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import storage from '@react-native-firebase/storage';

type TImageInputProps = {
  imageUri: string;
  setImageUri: (imageUri: string) => void;
  imageStyles?: StyleProp<ImageStyle>;
  imageContainerStyles?: StyleProp<ViewStyle>;
  iconColor?: string;
};

const ImageInput: React.FC<TImageInputProps> = ({
  imageUri,
  setImageUri,
  imageStyles = {},
  imageContainerStyles = {},
  iconColor = '#000',
}) => {
  const openImage: () => Promise<void> = useCallback(async () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxWidth: 1080,
        maxHeight: 608,
        quality: 0.8,
      },
      response => {
        if (response.didCancel) {
          Alert.alert('', 'screen.addNewsCustom.messageResponseDidCancel', [
            {
              text: 'screen.addNewsCustom.close',
              onPress: () => {},
              style: 'cancel',
            },
          ]);
        } else if (response.errorCode) {
          Alert.alert('', 'screen.addNewsCustom.messageResponseError', [
            {
              text: 'screen.addNewsCustom.close',
              onPress: () => {},
              style: 'cancel',
            },
          ]);
        } else if (
          response.assets &&
          response.assets[0].width &&
          response.assets[0].height
        ) {
          response.assets[0].height > 608 || response.assets[0].width > 1080
            ? Alert.alert('', 'screen.addNewsCustom.messageResponseSizeError', [
                {
                  text: 'screen.addNewsCustom.close',
                  onPress: () => {},
                  style: 'cancel',
                },
              ])
            : response.assets[0].uri && setImageUri(response.assets[0].uri);
        }
      },
    );
  }, []);

  return (
    <Pressable onPress={openImage} style={imageContainerStyles}>
      {imageUri ? (
        <View style={styles.imageContainer}>
          <Image source={{uri: imageUri}} style={[styles.image, imageStyles]} />
        </View>
      ) : (
        <View style={styles.pressableContainer}>
          <View style={styles.iconContainer}>
            <Icon size={27} name={'camera'} color={iconColor} />
          </View>
        </View>
      )}
    </Pressable>
  );
};
export default ImageInput;
