document.addEventListener("DOMContentLoaded", () => {
    const events = [
        {
            title: "Start projektu",
            startDate: "2024-01-01",
            endDate: "2024-01-15",
            description: "Projekt rozpoczęty z celem rozwoju nowej aplikacji.",
        },
        {
            title: "Pierwsza prezentacja",
            startDate: "2024-02-01",
            endDate: "2024-02-03",
            description: "Prezentacja wstępnych wyników projektu.",
        },
        {
            title: "Zakończenie etapu 1",
            startDate: "2024-03-01",
            endDate: "2024-03-10",
            description: "Zakończenie pierwszego etapu prac nad projektem.",
        }
    ];

    const timeline = document.querySelector('.timeline');

    events.forEach((event) => {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('timeline-event');

        eventDiv.innerHTML = `
            <div class="dot"></div>
            <div class="content">
                <div class="date">${event.startDate} - ${event.endDate}</div>
                <div class="title">${event.title}</div>
                <div class="description">${event.description}</div>
            </div>
        `;

        eventDiv.addEventListener('click', () => {
            // Zamknij inne otwarte sekcje
            document.querySelectorAll('.timeline-event').forEach(el => el.classList.remove('active'));
            eventDiv.classList.toggle('active');
        });

        timeline.appendChild(eventDiv);
    });
});
