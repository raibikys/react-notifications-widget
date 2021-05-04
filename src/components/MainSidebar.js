import { Sidebar, Sidenav, Nav, Dropdown, FlexboxGrid, Icon, Divider } from 'rsuite';
import FilterByEmail from './FilterByEmail';
import FilterByDateRange from './FilterByDateRange';

const MainSidebar = ({ data, setData }) => {
  //Map through data instead of axios call just for demonstration
  const HandleMarkAllAsReadAction = () => {
    const marked = [];
    data.map((item) => {
      marked.push({
        id: item.id,
        subject: item.subject,
        receivedAt: item.receivedAt,
        email: item.email,
        read: 'Yes',
      });
    });
    setData(marked);
  };

  const HandelDeleteReadNotifications = () => {
    const deleted = data.filter((item) => item.read != 'Yes');
    setData(deleted);
  };

  //Filter through data instead of axios call just for demonstration
  const HandleDeleteOldNotifications = () => {
    const deleted = data.filter((item) => {
      const newDate = new Date(item.receivedAt);
      const oldDate = new Date('2021-04-29');
      return newDate <= oldDate;
    });
    setData(deleted);
  };

  //Filter through data instead of axios call just for demonstration
  const HandleDeleteAllNotifications = () => {
    const deleted = data.filter((item, index) => item.id === item[index]);
    setData(deleted);
  };

  //Group table records by subject
  const HandleGroupBySubject = () => {
    function groupBy(list, keyGetter) {
      const map = new Map();
      list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
          map.set(key, [item]);
        } else {
          collection.push(item);
        }
      });
      return map;
    }

    const grouped = groupBy(data, (item) => item.subject);
    const newObj = [...grouped.entries()];
    const newTable = [];
    newObj.map((item) => {
      item.map((second) => {
        if (Array.isArray(second)) {
          second.map((third) => {
            newTable.push(third);
          });
        } else {
          return;
        }
      });
    });

    setData(newTable);
  };

  return (
    <FlexboxGrid.Item colspan={7} className='heading'>
      <Sidebar>
        <Sidenav>
          <Sidenav.Body>
            <Nav>
              <div className='box'>
                <Nav.Item
                  onClick={HandleMarkAllAsReadAction}
                  className='side-nav--cyan'
                  eventKey='1'
                  icon={<Icon icon='check' />}
                >
                  Mark All as Read
                </Nav.Item>
                <Nav.Item
                  onClick={HandelDeleteReadNotifications}
                  className='side-nav--green'
                  eventKey='2'
                  icon={<Icon icon='envelope' />}
                >
                  Delete Read Notifications
                </Nav.Item>
                <Nav.Item
                  onClick={HandleDeleteOldNotifications}
                  className='side-nav--orange'
                  eventKey='2'
                  icon={<Icon icon='trash' />}
                >
                  Delete Old Notifications
                </Nav.Item>
                <Nav.Item
                  onClick={HandleDeleteAllNotifications}
                  className='side-nav--red'
                  eventKey='2'
                  icon={<Icon icon='archive' />}
                >
                  Delete All Notifications
                </Nav.Item>
                <Nav.Item
                  onClick={HandleGroupBySubject}
                  className='side-nav--black'
                  eventKey='1'
                  icon={<Icon icon='object-group' />}
                >
                  Group by Subject
                </Nav.Item>
              </div>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
        <Sidenav>
          <div className='box'>
            <Sidenav.Body>
              <Dropdown eventKey='4' title='Filters Menu' icon={<Icon icon='filter' />}>
                <Divider>Filter by Email</Divider>
                <FilterByEmail setData={setData} />
                <Divider>Filter by Date Range</Divider>
                <FilterByDateRange setData={setData} />
              </Dropdown>
            </Sidenav.Body>
          </div>
        </Sidenav>
      </Sidebar>
    </FlexboxGrid.Item>
  );
};

export default MainSidebar;
