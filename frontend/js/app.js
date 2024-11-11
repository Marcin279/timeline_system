document.addEventListener("DOMContentLoaded", () => {
  console.log("Frontend loaded!");

  const userStatusElement = document.getElementById('user-status');
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  const userName = localStorage.getItem('userName');

  if (token) {
    userStatusElement.textContent = `Zalogowany jako: ${userName || 'Niezidentyfikowany użytkownik'}`;
    console.log('status: ', userStatusElement.textContent);
  } else {
    userStatusElement.textContent = 'Użytkownik niezalogowany';
  }

  const logoutButton = document.getElementById('logout-button');
  // Sprawdzenie czy przycisk wylogowania istnieje w DOM
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
              localStorage.removeItem('userName');
              window.location.reload();
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
