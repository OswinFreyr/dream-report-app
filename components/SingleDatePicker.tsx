import React, { useState, useCallback } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";
import fr from "react-native-paper-dates/src/translations/fr";
import { Snackbar } from "react-native-paper";


import { registerTranslation } from "react-native-paper-dates";

export default function SingleDatePicker({ setDate, date }) {
  registerTranslation("fr", {
    save: "Sauvegarder",
    selectSingle: "Sélectionner une date",
    selectMultiple: "Sélectionner plusieurs dates",
    selectRange: "Sélectionner une période",
    notAccordingToDateFormat: (inputFormat) =>
      `Le format de la date doit être ${inputFormat}`,
    mustBeHigherThan: (date) => `Doit être après ${date}`,
    mustBeLowerThan: (date) => `Doit être avant ${date}`,
    mustBeBetween: (startDate, endDate) =>
      `Doit être entre ${startDate} - ${endDate}`,
    dateIsDisabled: "Ce jour n'est pas autorisé",
    previous: "Précédent·e",
    next: "Suivant·e",
    typeInDate: "Saisir une date",
    pickDateFromCalendar: "Choisir une date à partir du calendrier",
    close: "Fermer",
    hour: "Heure",
    minute: "Minute",
  });

  const [open, setOpen] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onDismissSnackbar = () => {
    setSnackbarVisible(false);
  };

  const onConfirmSingle = useCallback(
    (params) => {
      setOpen(false);
      const selectedDate = params.date;
      const currentDate = new Date();
      if (selectedDate <= currentDate) {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1;
        const day = selectedDate.getDate();
        const formattedDate = `${year}-${month}-${day}`;
        setDate(formattedDate);
      } else {
        setSnackbarVisible(true);
        setTimeout(() => {
          setSnackbarVisible(false);
        }, 3000);
      }
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
          minDate={new Date()}
        />
        <Snackbar
          visible={snackbarVisible}
          onDismiss={onDismissSnackbar}
          duration={Snackbar.DURATION_SHORT}
        >
          La date doit être antérieure ou égale à aujourd'hui.
        </Snackbar>
      </View>
    </SafeAreaProvider>
  );
}