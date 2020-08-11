import React, { useState, useEffect } from "react";
import { useFormikContext } from "formik";
import { StyleSheet, View, Text } from "react-native";
import utils from "../../utils/utils";

import Button from "../Button";
import DateTimePicker from "@react-native-community/datetimepicker";
import AppText from "../Text";

function AppFormDate({ name, width, placeholder, ...otherProps }) {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [showDate, setShowDate] = useState(false);

  const { setFieldValue, values } = useFormikContext();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(!show);
    setFieldValue(name, currentDate);
    setDate(currentDate);
    setShowDate(true);
  };

  return (
    <View style={styles.container}>
      <Button
        onPress={() => setShow(true)}
        title={showDate ? utils.getDateFormatted(values[name]) : "Due date"}
        color="secondary"
        width={width}
      />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
});

export default AppFormDate;
