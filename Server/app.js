const express = require('express');
const app = express();
const port = 3001;

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'ProjectManager',
});

app.get('/szkolenia', (req, res) => {
  const sql = `SELECT f.Nazwa AS Firma, SUM(s.Koszt_szkolenia) AS Koszt_wszystkich_szkolen
               FROM Firmy f
               JOIN Projekty p ON f.ID_firmy = p.ID_firmy
               JOIN Szkolenia s ON p.ID_projektu = s.ID_projektu
               GROUP BY f.Nazwa`;

  connection.query(sql, (error, results, fields) => {
    if (error) {
      res.status(500).send('Error retrieving data from database.');
      return;
    }

    res.json(results);
  });
});

app.get('/raport_finansowy', (req, res) => {
  const sql = `SELECT Rok, Miesiac, SUM(Przychod) AS Przychod, SUM(Koszt) AS Koszt, (SUM(Przychod) - SUM(Koszt)) AS Zysk
  FROM (
    SELECT YEAR(Data_zakonczenia) AS Rok, MONTH(Data_zakonczenia) AS Miesiac, SUM(Koszt_szkolenia) AS Koszt, 0 AS Przychod
    FROM Szkolenia
    GROUP BY YEAR(Data_zakonczenia), MONTH(Data_zakonczenia)
    UNION ALL
    SELECT YEAR(Data_zakonczenia) AS Rok, MONTH(Data_zakonczenia) AS Miesiac, 0 AS Koszt, SUM(Wycena_projektu) AS Przychod
    FROM Projekty
    WHERE Status_projektu = 'zakończony'
    GROUP BY YEAR(Data_zakonczenia), MONTH(Data_zakonczenia)
  ) AS temp
  GROUP BY Rok, Miesiac
  ORDER BY Rok, Miesiac
`;

  connection.query(sql, (error, results, fields) => {
    console.log(error);

    if (error) {
      res.status(500).send('Error retrieving data from database.');
      return;
    }

    res.json(results);
  });
});

app.get('/najblizsze_terminy', (req, res) => {
  const sql = `SELECT 'Egzamin' AS Typ, e.ID_ucznia AS ID, e.Data_egzaminu AS Data, s.Nazwa_szkolenia AS Nazwa, DATEDIFF(e.Data_egzaminu, CURDATE()) AS Dni_do_wydarzenia
  FROM Egzaminy e
  JOIN Szkolenia s ON e.ID_szkolenia = s.ID_szkolenia
  WHERE DATE(e.Data_egzaminu) >= CURDATE()
  UNION ALL
  SELECT 'Szkolenie' AS Typ, s.ID_szkolenia AS ID, s.Data_zakonczenia AS Data, s.Nazwa_szkolenia AS Nazwa, DATEDIFF(s.Data_zakonczenia, CURDATE()) AS Dni_do_wydarzenia
  FROM Szkolenia s
  WHERE DATE(s.Data_zakonczenia) >= CURDATE()
  UNION ALL
  SELECT 'Projekt' AS Typ, p.ID_projektu AS ID, p.Data_zakonczenia AS Data, p.Nazwa_projektu AS Nazwa, DATEDIFF(p.Data_zakonczenia, CURDATE()) AS Dni_do_wydarzenia
  FROM Projekty p
  WHERE DATE(p.Data_zakonczenia) >= CURDATE()
  ORDER BY Data;`;

  connection.query(sql, (error, results, fields) => {
    console.log(error);

    if (error) {
      res.status(500).send('Error retrieving data from database.');
      return;
    }

    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
