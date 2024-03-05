import * as React from 'react';
import { TextInput } from 'react-native-paper';

const TitleInput = () => {
  const [text, setText] = React.useState("");

  return (
    <TextInput
      label="Rentrez un titre à votre titre"
      value={text}
      onChangeText={text => setText(text)}
    />
  );
};

export default TitleInput;