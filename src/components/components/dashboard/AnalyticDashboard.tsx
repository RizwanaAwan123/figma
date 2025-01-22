import React from 'react';

// Define the types for the props
interface AnalyticDashboardProps {
  sales: number;
  traffic: number;
}

const AnalyticDashboard: React.FC<AnalyticDashboardProps> = ({ sales, traffic }) => {
  return (
    <div className="analytic-dashboard">
      <h2>Analytics Dashboard</h2>
      <div className="kpi">
        <h3>Sales</h3>
        <p>${sales.toLocaleString()}</p>
      </div>
      <div className="kpi">
        <h3>Traffic</h3>
        <p>{traffic.toLocaleString()} visits</p>
      </div>
    </div>
  );
};

export default AnalyticDashboard;
