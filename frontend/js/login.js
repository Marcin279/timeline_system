document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('login-form').addEventListener('submit', async function (event) {
        event.preventDefault();
        console.log('Formularz wysłany'); // Dodaj to, aby sprawdzić, czy zdarzenie submit działa
        // Pobierz dane z formularza
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Utwórz obiekt danych
        const data = {
            email: email,
            password: password
        };

        try {
            // Wyślij zapytanie do backendu
            const response = await fetch('http://localhost:8081/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            // Sprawdź odpowiedź
            if (response.ok) {
                const result = await response.json();
                document.getElementById('message').innerText = result.message;

                // Zapisz token w lokalnej pamięci (opcjonalne)
                localStorage.setItem('token', result.token);

                // Możesz przekierować użytkownika lub wykonać inne akcje
                console.log('Zalogowano jako:', result.user);

                // Przekieruj użytkownika na stronę główną
                window.location.href = 'index.html';
            } else {
                const error = await response.json();
                document.getElementById('message').innerText = error.message;
            }
        } catch (error) {
            console.error('Błąd:', error);
            document.getElementById('message').innerText = 'Wystąpił błąd. Spróbuj ponownie później.';
        }
    });
});
