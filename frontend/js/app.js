document.addEventListener("DOMContentLoaded", () => {
  console.log("Frontend loaded!");

  // Funkcja do pobierania kategorii
  function loadCategories() {
    fetch('http://localhost:8081/api/categories')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Data received from API:", data);
        
        // Pobranie listy kategorii z DOM
        const categoryList = document.getElementById('category-list');
        categoryList.innerHTML = ''; // Wyczyszczenie poprzednich elementów

        // Wyświetlanie każdej kategorii jako elementu listy
        data.forEach(category => {
          const listItem = document.createElement('li');
          listItem.textContent = category.name;
          categoryList.appendChild(listItem);
        });
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
  }

  // Wywołanie funkcji do załadowania kategorii
  loadCategories();
});
