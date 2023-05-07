import axios from 'axios';

export const getDeadlines = axios.get(
  'http://localhost:3001/najblizsze_terminy'
);

export const getFinancialReport = axios.get(
  'http://localhost:3001/raport_finansowy'
);
