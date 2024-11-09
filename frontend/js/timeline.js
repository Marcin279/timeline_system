document.addEventListener("DOMContentLoaded", () => {
    loadEvents();
    if (isAdminUser()) {
        showAddEventForm(); 
        setupAddEventForm();
    }
});

function loadEvents() {
    // Sprawdzanie, czy użytkownik jest zalogowany i czy ma rolę admina
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');  // Rola użytkownika z localStorage

    // Jeżeli nie ma tokenu, uznajemy, że użytkownik jest niezalogowany
    const isAdmin = token && userRole === 'admin';  // Tylko jeśli jest admin, wyświetlamy przyciski edycji/usuwania

    console.log('Token:', token);  // Debugging
    console.log('User Role:', userRole);  // Debugging


    fetch('http://localhost:8081/api/events', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`, // Dodaj token, jeśli użytkownik jest zalogowany
            'X-Requested-With': 'XMLHttpRequest', // Dodatkowy nagłówek przydatny w Laravel
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(events => {
        const timeline = document.getElementById('timeline');
        timeline.innerHTML = ''; // Czyszczenie zawartości

        events.forEach((event, index) => {
            const eventBlock = document.createElement('div');
            eventBlock.classList.add('timeline-block');

            const timelineImg = document.createElement('div');
            timelineImg.classList.add('timeline-img');
            eventBlock.appendChild(timelineImg);

            const timelineContent = document.createElement('div');
            timelineContent.classList.add('timeline-content');

            const title = document.createElement('h2');
            title.innerText = event.title;

            const additionalInfo = document.createElement('div');
            additionalInfo.classList.add('additional-info');

            // Formatowanie daty bez godziny
            const startDateFormatted = formatDate(event.start_date);
            const endDateFormatted = formatDate(event.end_date);

            // Domyślny obraz, jeśli brak obrazu
            const imageUrl = event.image || 'https://via.placeholder.com/100';

            additionalInfo.innerHTML = `
                <div class="time-frame">${startDateFormatted} - ${endDateFormatted}</div>
                <div class="category">${event.category.name}</div>
                <img src="${imageUrl}" alt="${event.title}">
                <p>${event.description}</p>
            `;
            additionalInfo.style.display = 'none';

            timelineContent.appendChild(title);
            timelineContent.appendChild(additionalInfo);

            // Dodaj przyciski edycji i usuwania, jeśli użytkownik jest administratorem
            if (isAdmin) {
                const editButton = document.createElement('button');
                editButton.innerText = "Edytuj wydarzenie";
                editButton.classList.add('edit-button');
                editButton.onclick = () => editEvent(index);

                const deleteButton = document.createElement('button');
                deleteButton.innerText = "Usuń wydarzenie";
                deleteButton.classList.add('delete-button');
                deleteButton.onclick = () => deleteEvent(index);

                timelineContent.appendChild(editButton);
                timelineContent.appendChild(deleteButton);
            }

            eventBlock.appendChild(timelineContent);
            timeline.appendChild(eventBlock);

            title.addEventListener('click', () => {
                additionalInfo.style.display = additionalInfo.style.display === 'none' ? 'block' : 'none';
            });
        });
    })
    .catch(error => console.error('Błąd podczas pobierania wydarzeń:', error));
}

// Funkcja do formatowania daty (usunięcie godziny)
function formatDate(dateString) {
    if (!dateString) {
        console.error("Brak daty:", dateString);
        return ''; // Możesz zwrócić pusty ciąg lub dowolną domyślną wartość
    }

    const date = new Date(dateString); // Tworzymy obiekt Date

    if (isNaN(date.getTime())) {
        console.error("Błędna data:", dateString);
        return ''; // Jeśli data jest błędna, zwróć pusty ciąg
    }

    return date.toLocaleDateString('pl-PL'); // Format daty w polskim stylu (DD.MM.YYYY)
}

// Funkcja edycji wydarzenia
function editEvent(index) {
    alert(`Edytowanie wydarzenia o indeksie: ${index}`);
    // Tu można dodać rzeczywistą logikę edycji, np. otwieranie formularza edycji
}

// Funkcja usuwania wydarzenia
function deleteEvent(index) {
    alert(`Usuwanie wydarzenia o indeksie: ${index}`);
    // Tu można dodać rzeczywistą logikę usuwania, np. wywołanie API do usunięcia wydarzenia
}

// Funkcja do sprawdzenia, czy użytkownik jest administratorem
function isAdminUser() {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    return token && userRole === 'admin';
}

// Funkcja do wyświetlania formularza dodawania nowego wydarzenia
function showAddEventForm() {
    const addEventFormHTML = `
        <form id="add-event-form">
            <h3>Dodaj nowe wydarzenie</h3>
            <input type="text" id="title" placeholder="Tytuł" required>
            <input type="date" id="start-date" required>
            <input type="date" id="end-date" required>
            <textarea id="description" placeholder="Opis" required></textarea>
            <input type="url" id="image" placeholder="Link do obrazu">
            <select id="category" required></select>
            <button type="submit">Dodaj wydarzenie</button>
        </form>
    `;
    document.getElementById('timeline').insertAdjacentHTML('beforebegin', addEventFormHTML);
    loadCategories();
}

// Funkcja do wczytywania kategorii
function loadCategories() {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8081/api/categories', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'X-Requested-With': 'XMLHttpRequest',
        }
    })
    .then(response => response.json())
    .then(categories => {
        const categorySelect = document.getElementById('category');
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    })
    .catch(error => console.error('Błąd podczas ładowania kategorii:', error));
}

// Funkcja obsługująca przesyłanie formularza dodawania wydarzeń
function setupAddEventForm() {
    const addEventForm = document.getElementById('add-event-form');
    addEventForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const newEventData = {
            title: document.getElementById('title').value,
            start_date: document.getElementById('start-date').value,
            end_date: document.getElementById('end-date').value,
            description: document.getElementById('description').value,
            image: document.getElementById('image').value,
            category_id: document.getElementById('category').value
        };

        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:8081/api/events', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: JSON.stringify(newEventData)
            });

            if (response.ok) {
                alert('Wydarzenie dodane pomyślnie!');
                loadEvents();
            } else {
                console.error('Błąd dodawania wydarzenia:', response.statusText);
            }
        } catch (error) {
            console.error('Błąd:', error);
        }
    });
}
