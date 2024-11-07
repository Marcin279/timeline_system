document.addEventListener("DOMContentLoaded", () => {
    const events = [
        {
            title: "Start projektu",
            startDate: "2024-01-01",
            endDate: "2024-01-15",
            description: "Projekt rozpoczęty z celem rozwoju nowej aplikacji.",
            image: "https://via.placeholder.com/100",
            category: "Projekt",
        },
        {
            title: "Pierwsza prezentacja",
            startDate: "2024-02-01",
            endDate: "2024-02-03",
            description: "Prezentacja wstępnych wyników projektu.",
            image: "https://via.placeholder.com/100",
            category: "Prezentacja",
        },
        {
            title: "Zakończenie etapu 1",
            startDate: "2024-03-01",
            endDate: "2024-03-10",
            description: "Zakończenie pierwszego etapu prac nad projektem.",
            image: "https://via.placeholder.com/100",
            category: "Etap",
        },
        {
            title: "Zakończenie etapu 2",
            startDate: "2024-04-01",
            endDate: "2024-06-10",
            description: "Zakończenie pierwszego etapu 2 prac nad projektem.",
            image: "https://via.placeholder.com/100",
            category: "Etap",
        },
        {
            title: "Zakończenie etapu 3",
            startDate: "2024-04-01",
            endDate: "2024-06-10",
            description: "Zakończenie pierwszego etapu 3 prac nad projektem.",
            image: "https://via.placeholder.com/100",
            category: "Etap",
        }
    ];

    const timeline = document.querySelector('#timeline');

    events.forEach((event, index) => {
        // Tworzymy blok wydarzenia
        const eventBlock = document.createElement('div');
        eventBlock.classList.add('timeline-block');

        // Dodajemy okrąg oznaczający wydarzenie
        const timelineImg = document.createElement('div');
        timelineImg.classList.add('timeline-img');
        eventBlock.appendChild(timelineImg);

        // Tworzymy zawartość wydarzenia
        const timelineContent = document.createElement('div');
        timelineContent.classList.add('timeline-content');

        const title = document.createElement('h2');
        title.innerText = event.title;
        const description = document.createElement('p');
        description.innerText = event.description;

        const additionalInfo = document.createElement('div');
        additionalInfo.classList.add('additional-info');
        additionalInfo.innerHTML = `
            <div class="time-frame">${event.startDate} - ${event.endDate}</div>
            <div class="category">${event.category}</div>
            <img src="${event.image}" alt="${event.title}">
        `;
        additionalInfo.style.display = 'none'; // Ukrywamy dodatkowe informacje początkowo

        // Dodajemy elementy do zawartości
        timelineContent.appendChild(title);
        timelineContent.appendChild(description);
        timelineContent.appendChild(additionalInfo);
        
        // Dodajemy zawartość do bloku wydarzenia
        eventBlock.appendChild(timelineContent);

        // Dodajemy blok wydarzenia do sekcji timeline
        timeline.appendChild(eventBlock);

        // Funkcjonalność pokazywania szczegółów po najechaniu
        title.addEventListener('mouseover', () => {
            additionalInfo.style.display = 'block'; // Pokazujemy szczegóły
        });

        title.addEventListener('mouseout', () => {
            additionalInfo.style.display = 'none'; // Ukrywamy szczegóły
        });
    });
});
