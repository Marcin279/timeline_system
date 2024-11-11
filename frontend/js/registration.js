document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Zatrzymaj standardowe działanie formularza

    // Zbieranie danych z formularza
    const formData = new FormData(this);

    // Pobranie wartości hasła i potwierdzenia hasła
    const password = formData.get('password');
    const passwordConfirmation = formData.get('confirm_password'); // Upewnij się, że nazwa jest zgodna
    const userName = formData.get('username');

    // Walidacja haseł
    if (password !== passwordConfirmation) {
        alert('Hasła nie są zgodne.');
        return; // Zatrzymaj proces, jeśli hasła się nie zgadzają
    }

    // Wysłanie danych do serwera
    fetch('http://localhost:8081/api/register', {
        method: 'POST',
        body: formData,
        headers: {
            'X-Requested-With': 'XMLHttpRequest', // Przydatne dla Laravel, aby zidentyfikować zapytania AJAX
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            // Jeśli rejestracja powiodła się
            alert(data.message); // Możesz przekierować lub wykonać inną akcję tutaj
            localStorage.setItem('token', data.token);
            localStorage.setItem('userName', userName);
            window.location.href = 'index.html';
        } else {
            // Jeśli wystąpiły błędy
            alert(data.message); // Pokaż komunikat o błędzie
        }
    })
    .catch(error => {
        console.error('Błąd:', error); // Zaloguj wszelkie błędy do debugowania
        alert('Wystąpił błąd. Spróbuj ponownie później.');
    });
});
