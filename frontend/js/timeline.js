document.addEventListener("DOMContentLoaded", () => {
    loadEvents();

    if (isAdminUser()) {
        // Pokaż przycisk tylko dla administratorów
        document.getElementById('show-add-event').style.display = 'block';
        document.getElementById('show-add-category').style.display = 'block';
    }
    
    // Pokazanie formularza po kliknięciu
    document.getElementById('show-add-event').addEventListener('click', () => {
        showAddEventForm();
    });

    // Dodaj nasłuchiwanie na przycisk "Dodaj kategorię"
    document.getElementById('show-add-category').addEventListener('click', () => {
        showAddCategoryForm();
    });

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
    
        events.forEach((event) => {
            const eventBlock = document.createElement('div');
            eventBlock.classList.add('timeline-block');
            eventBlock.id = `event-${event.id}`; // Dodajemy ID wydarzenia do DOM, aby móc je łatwo usunąć
    
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
    
            // Ustaw kolor tła na podstawie koloru kategorii
            const categoryColor = event.category ? event.category.color : '#ffffff'; // Kolor domyślny, jeśli kategoria nie ma koloru
            timelineContent.style.backgroundColor = categoryColor;
    
            // Obliczanie jasności tła
            const brightness = getBrightness(categoryColor);
    
            // Jeżeli jasność jest mniejsza niż 128, ustawiamy tekst na biały
            if (brightness < 128) {
                timelineContent.style.color = '#ffffff'; // Ustawienie koloru tekstu na biały
                title.style.color = '#ffffff';
            } else {
                timelineContent.style.color = '#000000'; // Ustawienie koloru tekstu na czarny
                title.style.color = '#000000';
            }
    
            // Dodaj przyciski edycji i usuwania, jeśli użytkownik jest administratorem
            if (isAdmin) {
                const editButton = document.createElement('button');
                editButton.innerText = "Edytuj wydarzenie";
                editButton.classList.add('edit-button');
                editButton.onclick = () => editEvent(event.id);
    
                const deleteButton = document.createElement('button');
                deleteButton.innerText = "Usuń wydarzenie";
                deleteButton.classList.add('delete-button');
                deleteButton.onclick = () => deleteEvent(event.id); // Przekazanie id do deleteEvent
    
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
    const addEventContainer = document.getElementById('add-event-container');
    const addEventButton = document.getElementById('show-add-event');

    // Upewnij się, że formularz jest widoczny po kliknięciu przycisku
    addEventContainer.style.display = 'block';  // Pokazujemy formularz
    addEventButton.style.display = 'none';  // Ukrywamy przycisk

    loadCategories();  // Ładujemy kategorie, żeby formularz był gotowy do użycia
    setupAddEventForm();  // Inicjalizujemy obsługę formularza
}

function hideAddEventForm() {
    const addEventContainer = document.getElementById('add-event-container');
    const addEventButton = document.getElementById('show-add-event');

    // Ukrywamy formularz i pokazujemy przycisk "Dodaj nowe wydarzenie"
    addEventContainer.style.display = 'none';
    addEventButton.style.display = 'block';
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
    const submitButton = addEventForm.querySelector('button'); // Przyciski formularza
    let isSubmitting = false; // Flaga sprawdzająca, czy formularz jest już wysyłany

    addEventForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (isSubmitting) return; // Jeśli formularz już jest wysyłany, zapobiegamy ponownemu wysłaniu

        isSubmitting = true; // Ustawiamy flagę, że formularz jest wysyłany
        submitButton.disabled = true; // Wyłączamy przycisk formularza

        const newEventData = {
            title: document.getElementById('title').value,
            start_date: document.getElementById('start-date').value,
            end_date: document.getElementById('end-date').value,
            description: document.getElementById('description').value,
            image: document.getElementById('image').value,
            category_id: document.getElementById('category').value
        };

        // Walidacja pól formularza
        if (!newEventData.title || !newEventData.start_date || !newEventData.end_date || !newEventData.description || !newEventData.category_id) {
            alert('Proszę uzupełnić wszystkie wymagane pola.');
            isSubmitting = false; // Resetujemy flagę
            submitButton.disabled = false; // Ponownie włączamy przycisk
            return;
        }

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
                loadEvents(); // Funkcja ładowania wydarzeń po dodaniu nowego
                clearForm(); // Czyścimy formularz po dodaniu
                hideAddEventForm(); // Ukrywamy formularz po dodaniu wydarzenia
            } else {
                const errorData = await response.json();
                alert(`Błąd: ${errorData.message || response.statusText}`);
            }
        } catch (error) {
            console.error('Błąd:', error);
            alert('Wystąpił problem z dodawaniem wydarzenia. Spróbuj ponownie później.');
        }

        isSubmitting = false; // Resetujemy flagę
        submitButton.disabled = false; // Ponownie włączamy przycisk
    });
}

// Funkcja czyszcząca formularz
function clearForm() {
    document.getElementById('add-event-form').reset();
}


// Funkcja wyświetlająca formularz dodawania kategorii
function showAddCategoryForm() {
    const addCategoryContainer = document.getElementById('add-category-container');
    const addCategoryButton = document.getElementById('show-add-category');

    // Upewnij się, że formularz jest widoczny po kliknięciu przycisku
    addCategoryContainer.style.display = 'block';  // Pokazujemy formularz
    addCategoryButton.style.display = 'none';  // Ukrywamy przycisk

    setupAddCategoryForm();
}

// Funkcja ukrywająca formularz dodawania kategorii
function hideAddCategoryForm() {
    document.getElementById('add-category-container').style.display = 'none';
    document.getElementById('show-add-category').style.display = 'block';
}

// Funkcja obsługująca wysyłanie formularza dodawania kategorii
async function setupAddCategoryForm() {
    const addCategoryForm = document.getElementById('add-category-form');
    const submitButton = addCategoryForm.querySelector('button');
    let isSubmitting = false;

    addCategoryForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (isSubmitting) return; // Jeśli formularz jest już wysyłany, zapobiegamy ponownemu wysyłaniu

        isSubmitting = true; // Ustawiamy flagę
        submitButton.disabled = true; // Wyłączamy przycisk

        const newCategoryData = {
            name: document.getElementById('category-name').value,
            color: document.getElementById('category-color').value,
            icon: document.getElementById('category-icon').value
        };

        // Walidacja formularza
        if (!newCategoryData.name) {
            alert('Proszę uzupełnić nazwę kategorii.');
            isSubmitting = false;
            submitButton.disabled = false;
            return;
        }

        const token = localStorage.getItem('token'); // Token użytkownika
        try {
            const response = await fetch('http://localhost:8081/api/categories', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: JSON.stringify(newCategoryData)
            });

            if (response.ok) {
                alert('Kategoria dodana pomyślnie!');
                loadCategories(); // Funkcja ładowania kategorii
                hideAddCategoryForm(); // Ukrywamy formularz
            } else {
                const errorData = await response.json();
                alert(`Błąd: ${errorData.message || response.statusText}`);
            }
        } catch (error) {
            console.error('Błąd:', error);
            alert('Wystąpił problem z dodawaniem kategorii. Spróbuj ponownie później.');
        }

        isSubmitting = false;
        submitButton.disabled = false;
    });
}

function getBrightness(color) {
    // Usuwanie # na początku koloru hex (jeśli jest)
    color = color.replace('#', '');

    // Przekształcanie kolorów hex na RGB
    let r = parseInt(color.substr(0, 2), 16);
    let g = parseInt(color.substr(2, 2), 16);
    let b = parseInt(color.substr(4, 2), 16);

    // Obliczanie jasności na podstawie składowych RGB
    const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    return brightness;
}

// Funkcja do usuwania wydarzenia
async function deleteEvent(eventId) {
    const token = localStorage.getItem('token'); // Token użytkownika
    const url = `http://localhost:8081/api/events/${eventId}`; // URL endpointu do usuwania wydarzenia

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`, // Przekazywanie tokenu w nagłówku
                'X-Requested-With': 'XMLHttpRequest', // Przydatne w Laravel
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Wystąpił błąd podczas usuwania wydarzenia.');
        }

        const data = await response.json();
        alert(data.message); // Powiadomienie o sukcesie

        removeEventFromUI(eventId); // Usuwamy wydarzenie z UI
    } catch (error) {
        console.error('Błąd:', error);
        alert('Błąd podczas usuwania wydarzenia.');
    }
}

// Funkcja usuwająca wydarzenie z DOM
function removeEventFromUI(eventId) {
    const eventElement = document.getElementById(`event-${eventId}`);
    if (eventElement) {
        eventElement.remove(); // Usuwamy wydarzenie z interfejsu
    }
}
