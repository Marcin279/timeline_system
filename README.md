# timeline_system

1. Struktura bazy danych
Proponuję zaprojektować trzy główne tabele: events, categories, i users.

Tabela events:
id – klucz główny
name – nazwa wydarzenia
start_date – data rozpoczęcia
end_date – data zakończenia
description – opis tekstowy
image – ścieżka do pliku graficznego (lub BLOB)
category_id – klucz obcy do tabeli categories
created_at, updated_at – timestampy
Tabela categories:
id – klucz główny
name – nazwa kategorii
color – kolor dla kategorii (do wizualnego odróżnienia na osi czasu)
icon – ikona reprezentująca kategorię (opcjonalnie)
Tabela users:
id – klucz główny
username – nazwa użytkownika
password_hash – zaszyfrowane hasło
role – rola użytkownika (admin, reader)
2. Backend (PHP + MySQL)
Główne operacje CRUD:
Tworzenie wydarzenia: Administratorzy mogą dodać nowe wydarzenie poprzez formularz. Przesyłane dane powinny być walidowane, a obraz może być przesyłany jako plik i przechowywany na serwerze.
Odczyt wydarzeń: Użytkownicy (nawet niezalogowani) mogą przeglądać wydarzenia. Dane powinny być odpowiednio wyświetlane w zależności od wybranej kategorii.
Edycja wydarzeń: Administrator może edytować dane wydarzenia, w tym zmieniać nazwę, opis, daty i kategorię.
Usunięcie wydarzenia: Administratorzy mogą usuwać wydarzenia.
Mechanizm uwierzytelniania:
Logowanie użytkownika z walidacją nazwy użytkownika i hasła.
Hasła przechowywane w formie haszy (np. użycie password_hash() w PHP).
Możliwość zmiany hasła przez zalogowanego administratora.
3. Frontend (HTML + CSS + JavaScript)
Oś czasu:
Prezentacja osi czasu: Skorzystaj z dostępnych bibliotek JS (np. jQuery Timeline lub KnightLab Timeline) lub samodzielnie zaimplementuj oś czasu za pomocą CSS (Flexbox lub Grid).
Filtry: Użytkownicy mogą filtrować wydarzenia według kategorii. Można również zastosować kolorowanie i ikony kategorii dla lepszej wizualizacji.
Widok szczegółów: Kliknięcie na wydarzenie na osi czasu otwiera okno modalne z pełnymi szczegółami (nazwa, opis, obraz, daty).
Drukowanie:
Wersja do druku powinna być pozbawiona interfejsu użytkownika (formularze, przyciski itp.), a jedynie wyświetlać uporządkowaną oś czasu i pełne informacje o wydarzeniach.
4. Bezpieczeństwo
SQL Injection: Zastosowanie przygotowanych zapytań (prepared statements) w PHP do zabezpieczenia przed SQL Injection.
Hashowanie haseł: Hasła muszą być hashowane i bezpiecznie przechowywane (np. password_hash() oraz password_verify()).
Dodatkowe zabezpieczenia: Należy zadbać o walidację danych wejściowych, ograniczenie dostępu do edycji wyłącznie dla administratorów oraz stosowanie HTTPS do bezpiecznej transmisji danych.
5. Technologie
Backend: PHP z MySQL/MariaDB.
Frontend: HTML5, CSS3, JavaScript (można użyć jQuery lub czystego JS).
Framework: Jeśli zdecydujesz się użyć frameworka, Laravel może być dobrym wyborem ze względu na wbudowane funkcje zabezpieczeń i CRUD, które przyspieszą pracę.
Czy chcesz rozpocząć od konkretnego etapu, np. projektu bazy danych, czy wolisz najpierw zająć się frontendem?
