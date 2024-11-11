
# TimeLine System

## Opis
Ten projekt zawiera frontend oparty na Nginx, backend oparty na Laravel oraz bazę danych MySQL. Wszystkie usługi są uruchamiane za pomocą Docker Compose, co pozwala na łatwe uruchamianie i zarządzanie środowiskiem deweloperskim.

## Struktura Katalogów
```
/
├── backend/                # Katalog dla backendu (Laravel)
│   ├── db/                 # Katalog na dane MySQL
│   └── ...                 # Inne pliki backendu
├── frontend/               # Katalog dla frontendu (HTML, CSS, JS)
│   ├── nginx/              # Pliki konfiguracyjne Nginx
│   └── ...                 # Inne pliki frontendowe
├── docker-compose.yml      # Plik Docker Compose
└── README.md               # Dokumentacja projektu
```

## Wymagania
Aby uruchomić projekt, musisz mieć zainstalowane:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Instrukcje Uruchomienia

### 1. Klonowanie repozytorium
Najpierw sklonuj repozytorium na swoje lokalne urządzenie:

```bash
git clone https://github.com/Marcin279/timeline_system.git
cd TwojeRepozytorium
```

### 2. Budowanie i uruchamianie kontenerów
Aby zbudować i uruchomić kontenery, przejdź do katalogu, w którym znajduje się plik `docker-compose.yml` i uruchom poniższe polecenie:

```bash
docker-compose up --build
```

To polecenie zbuduje kontenery na podstawie pliku `docker-compose.yml` i uruchomi je w tle. W przypadku pierwszego uruchomienia może to potrwać chwilę, ponieważ Docker pobierze odpowiednie obrazy.

### 3. Dostęp do aplikacji
Po uruchomieniu kontenerów możesz uzyskać dostęp do aplikacji:

- **Frontend** (Nginx): [http://localhost:8080](http://localhost:8080)
- **Backend** (Laravel): [http://localhost:8081](http://localhost:8081)
- **MySQL**: Dostęp do bazy danych MySQL jest dostępny na porcie 3306: [localhost:3306](localhost:3306).

### 4. Wstrzymanie i usuwanie kontenerów
Aby zatrzymać uruchomione kontenery, użyj poniższego polecenia:

```bash
docker-compose down
```

Jeśli chcesz usunąć również dane z MySQL, możesz dodać flagę `-v`:

```bash
docker-compose down -v
```

### 5. Dodatkowe informacje

- **Backend**: Aplikacja Laravel jest dostępna pod adresem `http://localhost:8081`. Możesz edytować kod backendu w katalogu `./backend`.
  
- **Frontend**: Aplikacja frontendowa jest serwowana przez Nginx pod adresem `http://localhost:8080`. Możesz edytować pliki frontendowe w katalogu `./frontend`.

- **MySQL**: Baza danych MySQL jest dostępna na porcie `3306` i skonfigurowana z użytkownikiem `diaryuser` i hasłem `diarypassword`. Możesz uzyskać dostęp do bazy danych, używając narzędzi takich jak MySQL Workbench lub terminal.

## Problemy i rozwiązania
- **Błąd przy uruchamianiu Docker**: Upewnij się, że Docker jest uruchomiony na Twoim systemie, a także, że masz wystarczającą ilość dostępnych zasobów (RAM, CPU).
- **Brak połączenia z MySQL**: Sprawdź, czy kontener MySQL działa poprawnie. Możesz to zrobić za pomocą komendy `docker ps`.

## Licencja
Projekt jest dostępny na licencji MIT.
