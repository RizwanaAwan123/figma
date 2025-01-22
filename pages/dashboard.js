import AnalyticsDashboard from '../../components/Dashboard/AnalyticsDashboard';

const DashboardPage = () => {
  const data = { sales: 12000, traffic: 5000 };

  return <AnalyticsDashboard data={data} />;
};

export default DashboardPage;
