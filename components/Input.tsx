import * as React from 'react';
import { TextInput } from 'react-native-paper';

const Input = () => {
  const [text, setText] = React.useState("");

  return (
    <TextInput
      label="Intitulé"
      value={text}
      onChangeText={text => setText(text)}
    />
  );
};

export default Input;