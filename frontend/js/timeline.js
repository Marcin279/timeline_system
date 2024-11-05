document.addEventListener("DOMContentLoaded", () => {
    // Przykładowe dane wydarzeń
    const events = [
        {
            name: "Rozpoczęcie projektu",
            startDate: "2023-01-10",
            endDate: "2023-01-12",
            description: "Początek pracy nad projektem.",
            category: "Projekt"
        },
        {
            name: "Spotkanie z zespołem",
            startDate: "2023-02-15",
            endDate: "2023-02-15",
            description: "Pierwsze spotkanie zespołu projektowego.",
            category: "Spotkanie"
        },
        {
            name: "Prezentacja prototypu",
            startDate: "2023-03-22",
            endDate: "2023-03-22",
            description: "Przedstawienie prototypu klientowi.",
            category: "Prezentacja"
        }
    ];

    const timeline = document.getElementById('timeline');

    events.forEach(event => {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('timeline-event');

        const nameElement = document.createElement('h3');
        nameElement.textContent = event.name;

        const dateElement = document.createElement('p');
        dateElement.classList.add('timeline-date');
        dateElement.textContent = `${event.startDate} - ${event.endDate}`;

        const categoryElement = document.createElement('p');
        categoryElement.classList.add('timeline-category');
        categoryElement.textContent = `Kategoria: ${event.category}`;

        const descriptionElement = document.createElement('p');
        descriptionElement.classList.add('timeline-description');
        descriptionElement.textContent = event.description;

        eventDiv.appendChild(nameElement);
        eventDiv.appendChild(dateElement);
        eventDiv.appendChild(categoryElement);
        eventDiv.appendChild(descriptionElement);

        timeline.appendChild(eventDiv);
    });
});
