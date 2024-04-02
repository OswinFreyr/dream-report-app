import * as React from 'react';
import { Chip } from 'react-native-paper';



const ChipChoice = ({content, tabInfos}) => (
  <Chip icon="information" onPress={() => {
    tabInfos.push(content)
  }}>{content}</Chip>
);

export default ChipChoice;