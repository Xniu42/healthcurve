// components/FormattedDate.tsx
'use client';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

interface FormattedDateProps {
  date: string;
}

const FormattedDate: React.FC<FormattedDateProps> = ({ date }) => {
  return <>{dayjs(date).tz('Asia/Hong_Kong').format('YYYY-MM-DD HH:mm:ss')}</>;
};

export default FormattedDate;