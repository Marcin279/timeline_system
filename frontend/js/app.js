document.addEventListener("DOMContentLoaded", () => {
  console.log("Frontend loaded!");
  // Add your JavaScript logic here

  fetch('http://localhost:8081/api/categories').then(response => {
    if (!response.ok) {
      throw new Error("Http error! Status: ${response.status}");
    }
    return response.json();
  }).then(data => {
    console.log("Data received from API:", data);
    const categoryList = document.getElementById('category-list');
    data.forEach(category => {
      const listItem = document.createElement('li');
      listItem.textContent = category.name;
      categoryList.appendChild(listItem);
    });
  }).catch(error => {
    console.error("Error fetching categories:", error);
  });
});
