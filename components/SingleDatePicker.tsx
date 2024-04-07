import React, { useState, useCallback } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";
import fr from "react-native-paper-dates/src/translations/fr";

import { registerTranslation } from "react-native-paper-dates";

export default function SingleDatePicker({ setDate, date }) {
  registerTranslation("fr", {
    save: "Sauvegarder",
    selectSingle: "Selectionner une date",
    selectMultiple: "Selectionner plusieurs dates",
    selectRange: "Selectionner une periode",
    notAccordingToDateFormat: (inputFormat) =>
      `Le format de la date doit être ${inputFormat}`,
    mustBeHigherThan: (date) => `Doit être après ${date}`,
    mustBeLowerThan: (date) => `Doit être avant ${date}`,
    mustBeBetween: (startDate, endDate) =>
      `Doit être entre ${startDate} - ${endDate}`,
    dateIsDisabled: "Ce jour n'est pas autorise",
    previous: "Precedent·e",
    next: "Suivant·e",
    typeInDate: "Saisir une date",
    pickDateFromCalendar: "Choisir une date à partir du calendrier",
    close: "Fermer",
    hour: "Heure",
    minute: "Minute",
  });

  const [open, setOpen] = useState(false);

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = useCallback(
    (params) => {
      setOpen(false);
      const year = params.date.getFullYear();
      const month = params.date.getMonth() + 1;
      const day = params.date.getDate();
      params.date = year + "-" + month + "-" + day;
      setDate(params.date);
    },
    [setOpen, setDate]
  );

  return (
    <SafeAreaProvider>
      <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
        <Button
          mode="contained"
          onPress={() => setOpen(true)}
          uppercase={false}
          style={{
            elevation: 5,
            shadowColor: "black",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 2,
          }}
        >
          Choisir une date *
        </Button>
        {date && <Text style={{ color: "black" }}> {date}</Text>}
        <DatePickerModal
          locale="fr"
          mode="single"
          visible={open}
          onDismiss={onDismissSingle}
          date={date}
          onConfirm={onConfirmSingle}
          presentationStyle="pageSheet"
        />
      </View>
    </SafeAreaProvider>
  );
}
