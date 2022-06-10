import {Text, TouchableOpacity} from '@components';
import React from 'react';
import {ActivityIndicator} from 'react-native';
import styles from './styles';

type TMainButtonProps = {
  onPressHandler: () => void;
  title: string;
  isLoading?: boolean;
};

const MainButton: React.FC<TMainButtonProps> = ({
  onPressHandler,
  title,
  isLoading = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPressHandler}
      activeOpacity={0.9}
      style={styles.constainer}>
      {isLoading ? (
        <ActivityIndicator color="violet" size="small" />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default MainButton;
