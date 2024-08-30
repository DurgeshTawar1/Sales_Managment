import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TrendingUp, TrendingDown, DollarSign, Percent } from 'lucide-react';
import html2canvas from 'html2canvas';

const colors = {
  primary: '#6366F1',
  secondary: '#EC4899',
  tertiary: '#10B981',
  quaternary: '#F59E0B',
  background: '#1E293B',
  cardBg: '#334155',
  text: '#F1F5F9',
  lightText: '#94A3B8',
};

const FullWidthBackground = styled.div`
  background-color: ${colors.background};
  min-height: 100vh;
  width: 100%;
  color: ${colors.text};
`;

const Container = styled.div`
  padding: 2rem;
  margin-left: 300px;
  font-family: 'Inter', sans-serif;
`;

const Header = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: left;
  font-weight: bold;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background-color: ${colors.cardBg};
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const CardTitle = styled.h2`
  color: ${colors.lightText};
  font-size: 0.875rem;
  font-weight: 500;
`;

const KPIValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const TrendIndicator = styled.p`
  font-size: 0.75rem;
  color: ${props => props.trend > 0 ? colors.tertiary : colors.secondary};
  display: flex;
  align-items: center;
`;

const ChartContainer = styled.div`
  height: 600px;
  background-color: ${colors.cardBg};
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const DownloadButton = styled.button`
  background-color: ${colors.primary};
  color: ${colors.text};
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4a4fbc;
  }
`;

const RadialChart = ({ data, totalSales }) => {
  const centerX = 300;
  const centerY = 300;
  const radius = 250;

  const getCoordinatesForPercent = (percent) => {
    const x = centerX + radius * Math.cos(2 * Math.PI * percent);
    const y = centerY + radius * Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  let cumulativePercent = 0;

  return (
    <svg width="100%" height="100%" viewBox="0 0 600 600">
      <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke={colors.lightText} strokeWidth="2" />
      {data.map((slice, index) => {
        const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
        cumulativePercent += slice.percent;
        const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
        const largeArcFlag = slice.percent > 0.5 ? 1 : 0;
        const pathData = [
          `M ${startX} ${startY}`,
          `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
          `L ${centerX} ${centerY}`,
        ].join(' ');

        return (
          <g key={index}>
            <path d={pathData} fill={slice.color} />
            <text
              x={centerX + (radius * 0.7 * Math.cos(2 * Math.PI * (cumulativePercent - slice.percent / 2)))}
              y={centerY + (radius * 0.7 * Math.sin(2 * Math.PI * (cumulativePercent - slice.percent / 2)))}
              textAnchor="middle"
              fill={colors.text}
              fontSize="12"
            >
              {slice.name}
            </text>
          </g>
        );
      })}
      <text x={centerX} y={centerY} textAnchor="middle" fill={colors.text} fontSize="24" fontWeight="bold">
        {totalSales}
      </text>
      <text x={centerX} y={centerY + 30} textAnchor="middle" fill={colors.lightText} fontSize="16">
        Total Sales
      </text>
    </svg>
  );
};

const SalesReport = () => {
  const [kpis, setKpis] = useState({
    totalSales: 0,
    averageDealSize: 0,
    conversionRate: 0,
    revenueGrowth: 0
  });

  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    // Simulate API call to fetch KPI data
    setTimeout(() => {
      setKpis({
        totalSales: 1234567,
        averageDealSize: 5432,
        conversionRate: 27.5,
        revenueGrowth: 15.3
      });

      setSalesData([
        { name: 'Product A', percent: 0.4, color: colors.primary },
        { name: 'Product B', percent: 0.3, color: colors.secondary },
        { name: 'Product C', percent: 0.2, color: colors.tertiary },
        { name: 'Product D', percent: 0.1, color: colors.quaternary },
      ]);
    }, 1000);
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const KPICard = ({ title, value, icon, trend }) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {icon}
      </CardHeader>
      <KPIValue>{value}</KPIValue>
      <TrendIndicator trend={trend}>
        {trend > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        {Math.abs(trend)}% from last month
      </TrendIndicator>
    </Card>
  );

  const handleDownload = () => {
    html2canvas(document.querySelector("#report-container")).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'sales-report.png';
      link.click();
    });
  };

  return (
    <FullWidthBackground>
      <Container id="report-container">
        <Header>Sales of the SalesEstrim</Header>
        
        <DownloadButton onClick={handleDownload}>Download Report</DownloadButton>
        
        <Grid>
          <KPICard 
            title="Total Sales" 
            value={formatCurrency(kpis.totalSales)} 
            icon={<DollarSign color={colors.primary} />} 
            trend={7.2} 
          />
          <KPICard 
            title="Avg. Deal Size" 
            value={formatCurrency(kpis.averageDealSize)} 
            icon={<TrendingUp color={colors.secondary} />} 
            trend={3.1} 
          />
          <KPICard 
            title="Conversion Rate" 
            value={`${kpis.conversionRate}%`} 
            icon={<Percent color={colors.tertiary} />} 
            trend={-2.5} 
          />
          <KPICard 
            title="Revenue Growth" 
            value={`${kpis.revenueGrowth}%`} 
            icon={<TrendingUp color={colors.quaternary} />} 
            trend={5.3} 
          />
        </Grid>

        <ChartContainer>
          <RadialChart data={salesData} totalSales={formatCurrency(kpis.totalSales)} />
        </ChartContainer>
      </Container>
    </FullWidthBackground>
  );
};

export default SalesReport;


