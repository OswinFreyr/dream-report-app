import * as React from "react";
import { List } from "react-native-paper";
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

const ListAcc = () => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Section>
      <List.Accordion
        title="Sélectionner une catégorie"
        left={(props) => <List.Icon {...props} icon="folder" />}
        expanded={expanded}
        onPress={handlePress}
        
      >
        <List.Item  title="Personne" />
        <List.Item title="Thème" />
        <List.Item title="Émotion" />
      </List.Accordion>
    </List.Section>
  );
};

export default ListAcc;
