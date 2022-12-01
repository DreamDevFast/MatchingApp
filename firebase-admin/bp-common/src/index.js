import React from 'react';
import ReactDOM from 'react-dom';
import Datatable from './components/atoms/Datatable';
import ChartManagePanel from './components/molecules/ChartManagePanel';
import UserManagePanel from './components/molecules/UserManagePanel';

const App = () => (
  <div>
    <UserManagePanel />
    <ChartManagePanel />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
