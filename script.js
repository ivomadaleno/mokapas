
const sheetID = "1qx-Fots7e-50dDnsKbMDjv-a4bS62D-sqawVLDhZUfU";
const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;
const sheetName = 'Base';
const query = encodeURIComponent('Select *');
const url = `${base}&sheet=${sheetName}&tq=${query}`;
const cardsContainer = document.getElementById("cards-container");
const searchInput = document.getElementById("search");

fetch(url)
  .then(res => res.text())
  .then(rep => {
    const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
    const data = jsonData.table.rows.map(row => row.c.map(cell => cell?.v || ""));
    displayCards(data);
    searchInput.addEventListener("input", () => {
      const term = searchInput.value.toLowerCase();
      const filtered = data.filter(row => row.some(col => col.toLowerCase().includes(term)));
      displayCards(filtered);
    });
  });

function displayCards(data) {
  cardsContainer.innerHTML = "";
  data.forEach(([nome, descrição, contacto, link]) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h2>${nome}</h2>
      <p>${descrição}</p>
      <p><strong>Contacto:</strong> ${contacto}</p>
      <a href="${link}" target="_blank">Ver Perfil</a>
    `;
    cardsContainer.appendChild(card);
  });
}
