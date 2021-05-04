import { useState, useEffect } from 'react';
import { SelectPicker } from 'rsuite';
import axios from 'axios';

const FilterByEmail = ({ setData }) => {
  const [notifications, setNotifications] = useState(['']);
  const [email, setEmail] = useState('');
  const author = [];

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios('http://localhost:3001/posts');
      const filtered = response.data.filter((item) => item.email == email);
      setData(filtered);
    };

    fetchItems();
  }, [email]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios('http://localhost:3001/posts');
      setNotifications(response.data);
    };

    fetchItems();
  }, []);

  notifications.map((item, index) => {
    if (item.email !== null) {
      author.push({
        label: notifications[index].email,
        value: notifications[index].email,
      });
    }
  });
  return (
    <SelectPicker
      data={author}
      placeholder='Select User'
      style={{ width: 224 }}
      key={author.id}
      onChange={setEmail}
      onClean={() => setData(notifications)}
      style={{ margin: '1rem 0', width: '100%' }}
    />
  );
};

export default FilterByEmail;
