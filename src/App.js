import 'rsuite/dist/styles/rsuite-default.css';
import { useState, useEffect } from 'react';
import { Container, FlexboxGrid } from 'rsuite';
import MainHeader from './components/MainHeader';
import MainSidebar from './components/MainSidebar';
import MainContent from './components/MainContent';

import './App.scss';
import axios from 'axios';

function App() {
  const [data, setData] = useState(['']);
  const [currentPage, setCurrentPage] = useState('');
  const [totalRecords, setTotalRecords] = useState('');
  const [recordsDisplayLength, setRecordsDisplayLength] = useState('');
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios('http://localhost:3001/posts');
      setData(response.data);
      setTotalRecords(response.data.length);
    };

    fetchItems();
  }, [trigger]);

  return (
    <div className='App'>
      <MainHeader
        currentPage={currentPage}
        totalRecords={totalRecords}
        recordsDisplayLength={recordsDisplayLength}
        setTrigger={setTrigger}
      />
      <Container>
        <FlexboxGrid>
          <Container>
            <MainSidebar data={data} setData={setData} setTrigger={setTrigger} />
          </Container>
          <MainContent
            data={data}
            setData={setData}
            setCurrentPage={setCurrentPage}
            setRecordsDisplayLength={setRecordsDisplayLength}
            setTrigger={setTrigger}
          />
        </FlexboxGrid>
      </Container>
    </div>
  );
}

export default App;
