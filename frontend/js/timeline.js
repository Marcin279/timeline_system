document.addEventListener("DOMContentLoaded", () => {
    loadEvents();
});

const isAdmin = true; // Zmienna kontrolująca, czy użytkownik jest administratorem

function loadEvents() {
    fetch('http://localhost:8081/api/events')
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
