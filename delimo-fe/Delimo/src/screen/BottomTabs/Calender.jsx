import react, {useState} from 'react';
import {Text, View} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';

const Calender = () => {
  const dateDate = new Date();
  const dateYear = dateDate.getFullYear();
  const dateMonth = dateDate.getMonth();
  const [selected, setSelected] = useState('');
  const [year, setYear] = useState(dateYear);
  const [month, setMonth] = useState(dateMonth + 1);
  const markedDates = {
    '2023-04-26': {selected: true},
    '2023-04-27': {selected: true, selectedColor: '#f2f2f2'},
    '2023-04-28': {selected: true, selectedColor: 'yellow'},
  };
  console.log('year', year);
  console.log('month', month);

  return (
    <>
      <View
        style={{
          justifyContent: 'center',
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <Calendar
          style={{
            borderColor: 'gray',
            height: 350,
          }}
          onDayPress={day => {
            console.log(day);
            setSelected(day.dateString);
          }}
          onMonthChange={date => {
            setYear(date.year);
            setMonth(date.month);
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: 'orange',
            },
            ...markedDates,
          }}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e',
          }}
        />
      </View>
    </>
  );
};

export default Calender;
