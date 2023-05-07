import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { getFinancialReport } from '../api';

const FinancialReport = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getFinancialReport;
      setData(result.data);
    };
    fetchData();
  }, []);

  const formatXAxis = (tickItem) => {
    const date = new Date(tickItem.Rok, tickItem.Miesiac - 1, 1);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'short' });
    return `${year}-${month}`;
  };

  return (
    <Card>
      <CardContent>
        <Typography variant='h5' component='h2'>
          Wykres raportu finansowego
        </Typography>
        <LineChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey={formatXAxis} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='Przychod' stroke='#8884d8' />
          <Line type='monotone' dataKey='Koszt' stroke='#82ca9d' />
          <Line type='monotone' dataKey='Zysk' stroke='#ffc658' />
        </LineChart>
      </CardContent>
    </Card>
  );
};

export default FinancialReport;
