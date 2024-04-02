import React, { useState } from "react";
import { Chip } from "react-native-paper";

const ChipChoice = ({ content, tabInfos }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    if (isPressed) {
      const index = tabInfos.indexOf(content);
      if (index !== -1) {
        tabInfos.splice(index, 1);
      }
      setIsPressed(false);
    } else {
      setIsPressed(true);
      tabInfos.push(content);
    }
  };

  return (
    <Chip
      icon="information"
      onPress={handlePress}
      style={{
        backgroundColor: isPressed ? "#b9b686" : "#d6d162",
        marginRight: 5,
      }}
      textStyle={{ color: isPressed ? "gray" : "white" }}
    >
      {content}
    </Chip>
  );
};

export default ChipChoice;
