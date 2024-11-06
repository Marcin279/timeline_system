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
        }
    ];

    const timeline = document.querySelector('.timeline');

    // Dodajemy linię osi
    const line = document.createElement('div');
    line.classList.add('line');
    timeline.appendChild(line);

    // Dodajemy segmenty linii (odcinki) między wydarzeniami
    events.forEach((event, index) => {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('dot-container');

        const dot = document.createElement('div');
        dot.classList.add('dot');

        const title = document.createElement('div');
        title.classList.add('title');
        title.innerText = event.title;

        const eventInfo = document.createElement('div');
        eventInfo.classList.add('event-info');
        eventInfo.innerHTML = `
            <div class="title">${event.title}</div>
            <div class="time-frame">${event.startDate} - ${event.endDate}</div>
            <div class="description">${event.description}</div>
            <img src="${event.image}" alt="${event.title}">
            <div class="category">${event.category}</div>
        `;

        eventDiv.appendChild(dot);
        eventDiv.appendChild(title);
        eventDiv.appendChild(eventInfo);

        // Pozycja wydarzenia na osi czasu (prosty sposób: 150px między wydarzeniami)
        eventDiv.style.position = 'relative';
        eventDiv.style.marginTop = `${index * 150}px`;

        timeline.appendChild(eventDiv);

        // Długość segmentu linii (wydarzenia)
        const segment = document.createElement('div');
        segment.classList.add('segment');
        segment.style.top = `${index * 150 + 20}px`; // Wysokość kropki + margines
        line.appendChild(segment);
    });
});
