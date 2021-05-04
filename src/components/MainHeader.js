import { FlexboxGrid, Header } from 'rsuite';

const Top = ({ currentPage, totalRecords, recordsDisplayLength, setTrigger }) => {
  const totalPages = Math.ceil(totalRecords / recordsDisplayLength);
  const isTrigger = false;

  return (
    <Header>
      <FlexboxGrid justify='space-between' className='box'>
        <FlexboxGrid.Item colspan={4} className='heading'>
          <p onClick={() => setTrigger((isTrigger) => !isTrigger)} style={{ cursor: 'pointer' }}>
            Notifications
          </p>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={4} align='right'>
          <small>
            {currentPage} of {totalPages}
          </small>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Header>
  );
};

export default Top;
