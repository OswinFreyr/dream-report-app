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
      tabInfos.push({ content: content });
    }
  };

  return (
    <Chip
      onPress={handlePress}
      style={{
        backgroundColor: isPressed ? "#d0bcff" : "#ab9ccf",
        marginRight: 5,
        marginTop: 5,
        elevation: 5, 
        shadowColor: "black", 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
      }}
      textStyle={{ color: isPressed ? "gray" : "white" }}
    >
      {content}
    </Chip>
  );
};

export default ChipChoice;
