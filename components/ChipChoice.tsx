import * as React from 'react';
import { Chip } from 'react-native-paper';

const ChipChoice = ({content}) => (
  <Chip icon="information" onPress={() => console.log('Pressed')}>{content}</Chip>
);

export default ChipChoice;