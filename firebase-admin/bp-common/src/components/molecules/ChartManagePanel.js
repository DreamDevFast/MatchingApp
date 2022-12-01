import React from 'react';
import Chart from '../atoms/Chart';

const ChartManagePanel = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}
    >
      <Chart />
      <Chart />
    </div>
  );
};

export default ChartManagePanel;
