import { useState, useEffect } from 'react';
import { DateRangePicker } from 'rsuite';
import axios from 'axios';

const FilterByDateRange = ({ setData }) => {
  const [date, setDate] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios('http://localhost:3001/posts');

      if (date !== null) {
        const filteredNotificationsByDateRange = response.data.filter((item) => {
          const receivedAt = new Date(item.receivedAt);
          return receivedAt >= new Date(date[0]) && receivedAt <= new Date(date[1]);
        });
        setData(filteredNotificationsByDateRange);
      }
    };

    fetchItems();
  }, [date]);

  const onEmptyRange = () => {
    setDate(null);
  };

  return <DateRangePicker style={{ width: 280 }} onChange={setDate} onClean={onEmptyRange} />;
};

export default FilterByDateRange;
