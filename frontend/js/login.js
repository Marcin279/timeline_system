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
            console.log('Wysyłam zapytanie do API...');
            const response = await fetch('http://localhost:8081/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            console.log(response.status);
            // Sprawdź odpowiedź
            if (response.ok) {
                const result = await response.json();
                document.getElementById('message').innerText = result.message;
                console.log('Odpowiedź z API:', result);

                // Zapisz token i dane użytkownika w localStorage
                localStorage.setItem('token', result.token);
                localStorage.setItem('userRole', result.user.role);  // Zapisz rolę użytkownika

                // Sprawdzamy, czy użytkownik jest administratorem
                const isAdmin = result.user.role === 'admin';
                console.log('Czy użytkownik jest administratorem:', isAdmin); // Sprawdzenie w konsoli

                // Możesz przekierować użytkownika lub wykonać inne akcje
                console.log('Rola użytkownika:', localStorage.getItem('userRole'));

                // Przekieruj użytkownika na stronę główną
                setTimeout(() => {
                    console.log('Role before redirect:', localStorage.getItem('userRole'));
                    window.location.href = 'index.html';
                }, 10000);
                
            } else {
                const error = await response.json();
                console.log('Błąd odpowiedzi:', error); // Dodatkowe logowanie błędów
                document.getElementById('message').innerText = error.message;
            }
        } catch (error) {
            console.error('Błąd:', error);
            document.getElementById('message').innerText = 'Wystąpił błąd. Spróbuj ponownie później.';
        }
    });
});
