import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { getDeadlines } from '../api';

const NextDeadlines = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getDeadlines;
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant='h5' component='h2'>
          Najbliższe terminy
        </Typography>
        <BarChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='Nazwa' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='Dni_do_wydarzenia' fill='#8884d8' />
        </BarChart>
      </CardContent>
    </Card>
  );
};

export default NextDeadlines;
