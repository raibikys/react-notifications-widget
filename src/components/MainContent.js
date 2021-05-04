import { useState } from 'react';
import { Content, FlexboxGrid, Table, Icon, Notification } from 'rsuite';
import axios from 'axios';

const MainContent = ({ data, setTrigger, setCurrentPage, setRecordsDisplayLength }) => {
  const { Column, HeaderCell, Cell, Pagination } = Table;
  const [displayLength, setDisplayLength] = useState(8);
  const [page, setPage] = useState(1);
  const isTrigger = false;

  const handleChangePage = (dataKey) => {
    setPage(dataKey);
  };

  const handleChangeLength = (dataKey) => {
    setPage(1);
    setDisplayLength(dataKey);
  };

  const getData = () => {
    return data.filter((v, i) => {
      const start = displayLength * (page - 1);
      const end = start + displayLength;
      return i >= start && i < end;
    });
  };

  const tableData = getData();
  setCurrentPage(page);
  setRecordsDisplayLength(displayLength);

  const ActionCell = ({ rowData, dataKey, subject, receivedAt, email, ...data }) => {
    const id = rowData[dataKey];

    const handleNotificationsPopup = (type, title, description) => {
      Notification[type]({
        title: title,
        description: description,
      });
    };

    const handleReadAction = () => {
      axios
        .put(`http://localhost:3001/posts/${id}`, {
          id: id,
          subject: rowData[subject],
          receivedAt: rowData[receivedAt],
          email: rowData[email],
          read: 'Yes',
        })
        .then(() => {
          setTrigger((isTrigger) => !isTrigger);
          handleNotificationsPopup('success', 'Marked as Read', 'Table updated.');
        });
    };

    const handleRemoveAction = () => {
      axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
        setTrigger((isTrigger) => !isTrigger);
        handleNotificationsPopup('warning', 'Deleted Successfully!', 'Table updated.');
      });
    };

    return (
      <Cell {...data}>
        <FlexboxGrid justify='space-between'>
          {' '}
          <Icon icon='check' onClick={handleReadAction} className='text--cyan' style={{ cursor: 'pointer' }} />{' '}
          <Icon
            icon='eye'
            onClick={() =>
              handleNotificationsPopup(
                'info',
                'You are reading notification',
                'Here could be fetched notifications inside modal or something like that.'
              )
            }
            className='text--green'
            style={{ cursor: 'pointer' }}
          />{' '}
          <Icon icon='trash' onClick={handleRemoveAction} className='text--red' style={{ cursor: 'pointer' }} />{' '}
        </FlexboxGrid>
      </Cell>
    );
  };

  const ReadCell = ({ rowData, dataKey, ...data }) => {
    const read = rowData[dataKey];
    return (
      <Cell {...data}>
        <p className={read === 'Yes' ? 'bg--green' : 'bg--red'}>{read}</p>
      </Cell>
    );
  };

  return (
    <FlexboxGrid.Item colspan={18}>
      <Content className='box'>
        <Table data={tableData} autoHeight>
          <Column align='left' flexGrow={3} sortable>
            <HeaderCell>SUBJECT</HeaderCell>
            <Cell dataKey='subject' />
          </Column>

          <Column flexGrow={2} sortable>
            <HeaderCell>READ</HeaderCell>
            <ReadCell dataKey='read' />
          </Column>

          <Column flexGrow={3} sortable>
            <HeaderCell>RECEIVED AT</HeaderCell>
            <Cell dataKey='receivedAt' />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>ACTIONS</HeaderCell>
            <ActionCell dataKey='id' subject='subject' receivedAt='receivedAt' email='email' />
          </Column>
        </Table>

        <Pagination
          lengthMenu={[
            {
              value: 8,
              label: 8,
            },
            {
              value: 16,
              label: 16,
            },
          ]}
          activePage={page}
          displayLength={displayLength}
          total={data.length}
          onChangePage={handleChangePage}
          onChangeLength={handleChangeLength}
        />
      </Content>
    </FlexboxGrid.Item>
  );
};

export default MainContent;
