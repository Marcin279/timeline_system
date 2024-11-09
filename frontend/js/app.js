document.addEventListener("DOMContentLoaded", () => {
  console.log("Frontend loaded!");

  // Funkcja do pobierania kategorii
  function loadCategories() {
    fetch('http://localhost:8081/api/categories')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Data received from API:", data);
        
        // Pobranie listy kategorii z DOM
        // const categoryList = document.getElementById('category-list');
        // categoryList.innerHTML = ''; // Wyczyszczenie poprzednich elementów

        // // Wyświetlanie każdej kategorii jako elementu listy
        // data.forEach(category => {
        //   const listItem = document.createElement('li');
        //   listItem.textContent = category.name;
        //   categoryList.appendChild(listItem);
        // });
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
  }

  // Wywołanie funkcji do załadowania kategorii
  loadCategories();
  const logoutButton = document.getElementById('logout-button');
  // Sprawdzenie czy przycisk wylogowania istnieje w DOM
  // const logoutButton = document.getElementById('logout-button');
  if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
      const token = localStorage.getItem('token');
      if (!token) {
          console.log('Nie znaleziono tokena – użytkownik już wylogowany.');
          alert('Nie jesteś zalogowany!');
          return;
      }

      try {
          const response = await fetch('http://localhost:8081/api/logout', {
              method: 'POST',
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
              }
          });

          if (response.ok) {
              console.log('Wylogowano pomyślnie');
              // Usuń token i rolę z localStorage
              localStorage.removeItem('token');
              localStorage.removeItem('userRole');
              // Opcjonalnie: odśwież stronę lub przekieruj użytkownika
              window.location.reload(); // Jeśli chcesz odświeżyć stronę po wylogowaniu
          } else {
              console.error('Błąd podczas wylogowywania:', response.statusText);
          }
      } catch (error) {
          console.error('Błąd:', error);
      }
    });
  } else {
    console.error('Nie znaleziono przycisku wylogowania w DOM!');
  }
});
