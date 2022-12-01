import React from 'react';
import Datatable from './Datatable';
import {db} from '../../firebase';
import {
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
} from 'firebase/firestore';
import TransitionsModal from './TransitionModal';

const TabPanel = props => {
  const {children, value, index} = props;
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    const q = query(
      collection(db, 'Users'),
      where('role', '==', value === 0 ? 'girl' : 'shop'),
    );
    onSnapshot(q, querySnapshot => {
      setUsers(
        querySnapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        })),
      );
    });
  }, [value]);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === 1 && <TransitionsModal />}
      {value === index && <Datatable users={users} />}
    </div>
  );
};

export default TabPanel;
