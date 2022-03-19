import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import ja from 'date-fns/locale/ja';
registerLocale('ja', ja);

type DatetimeProps = {
  date: Date;
  onChange: (value: Date | null) => void;
};

const Datetime: React.VFC<DatetimeProps> = ({ onChange, date }) => {
  return (
    <DatePicker
      selected={date}
      onChange={(value) => onChange(value)}
      timeInputLabel='Time:'
      dateFormat='MM/dd/yyyy h:mm aa'
      locale='ja'
      showTimeInput
    />
  );
};

export { Datetime };
