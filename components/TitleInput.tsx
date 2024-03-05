import * as React from 'react';
import { TextInput } from 'react-native-paper';

const TitleInput = () => {
  const [text, setText] = React.useState("");

  return (
    <TextInput
      label="Email"
      value={text}
      onChangeText={text => setText(text)}
    />
  );
};

export default TitleInput;