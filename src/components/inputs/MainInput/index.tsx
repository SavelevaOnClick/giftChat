import {TextInput, View} from '@components';
import React, {useMemo} from 'react';
import {KeyboardTypeOptions, ViewStyle} from 'react-native';
import styles from './styles';

type TMainInputProps = {
  value: string;
  setValue: (text: string) => void;
  containerStyle?: ViewStyle;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
};

const MainInput: React.FC<TMainInputProps> = ({
  value,
  setValue,
  containerStyle = {},
  placeholder,
  keyboardType,
}) => {
  const inputContainer = useMemo(() => [styles.container, containerStyle], []);

  return (
    <View style={inputContainer}>
      <TextInput
        value={value}
        keyboardType={keyboardType}
        onChangeText={setValue}
        placeholder={placeholder}
      />
    </View>
  );
};

export default MainInput;
