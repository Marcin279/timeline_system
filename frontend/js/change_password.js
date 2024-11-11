document.addEventListener('DOMContentLoaded', function() {
    const userName = localStorage.getItem('userName');
    if (userName) {
        document.getElementById('username').textContent = userName;
    } else {
        alert('Brak danych o użytkowniku. Zaloguj się ponownie.');
        window.location.href = 'login.html';
    }
});

// Obsługa formularza zmiany hasła
document.getElementById('changePasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Zbieranie danych z formularza
    const formData = new FormData(this);

    // Wysłanie danych do backendu
    fetch('http://localhost:8081/api/change-password', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
            if (data.message === 'Hasło zostało zmienione pomyślnie.') {
                window.location.href = 'index.html';
            }
        }
    })
    .catch(error => {
        console.error('Błąd:', error);
        alert('Wystąpił błąd podczas zmiany hasła. Spróbuj ponownie później.');
    });
});
