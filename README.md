# Aplikacja zarządzania projektami

Ta aplikacja pozwala na zarządzanie projektami, szkoleniami oraz egzaminami w firmie. Pozwala na dodawanie, edycję i usuwanie projektów, szkoleń oraz egzaminów, a także przeglądanie ich terminów i kosztów.

## Technologie użyte w aplikacji

Aplikacja została napisana z użyciem następujących technologii:

- **React.js** - biblioteka JavaScript do tworzenia interfejsów użytkownika.
- **Node.js** - środowisko uruchomieniowe JavaScript, które pozwala na uruchamianie kodu po stronie serwera.
- **Express.js** - minimalistyczny framework dla Node.js, służący do tworzenia aplikacji internetowych.
- **MySQL** - system zarządzania relacyjnymi bazami danych.

Do tworzenia wykresów użyliśmy biblioteki **Recharts**.

Do stylizacji interfejsu użytkownika wykorzystaliśmy **Material-UI**.

## Wymagania

Aby uruchomić aplikację, wymagane są:

- **Node.js** - wersja 14.x lub nowsza
- **MySQL** - wersja 5.7 lub nowsza

## Konfiguracja aplikacji

1. Sklonuj repozytorium:

```
git clone https://github.com/Kuri01/ProjectManager.git
```

2. Przejdź do katalogu z aplikacją:

```
cd ProjectManager
```

3. Zainstaluj zależności dla klienta:

```
cd client
npm install
```

4. Przejdź z powrotem do katalogu głównego aplikacji i zainstaluj zależności dla serwera:

```
cd ../server
npm install
```

5. Skonfiguruj bazę danych MySQL:

- Otwórz plik `config/db.config.js` i wprowadź odpowiednie dane dostępowe do swojej bazy danych.

6. Uruchom serwer:

```
nodemon app.js
```

6. Uruchom aplikację (w nowym shellu):

```
yarn start
```


8. W przeglądarce internetowej wejdź pod adres `http://localhost:3000` aby uruchomić aplikację.

