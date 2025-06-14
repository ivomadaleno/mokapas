const sheetID = "1qx-Fots7e-50dDnsKbMDjv-a4bS62D-sqawVLDhZUfU";
const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;
const sheetName = 'Base';
const query = encodeURIComponent('Select *');
const url = `${base}&sheet=${sheetName}&tq=${query}`;

const cardsContainer = document.getElementById("cards");
const searchInput = document.getElementById("search");

fetch(url)
  .then(res => res.text())
  .then(rep => {
    const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
    const data = jsonData.table.rows.map(row => ({
      nome: row.c[0]?.v || "",
      tema: row.c[1]?.v || "",
      link: row.c[2]?.v || ""
    }));

    function renderCards(filteredData) {
      cardsContainer.innerHTML = "";
      filteredData.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <h2>${item.nome}</h2>
          <p><strong>Tema:</strong> ${item.tema}</p>
          <p><a href="${item.link}" target="_blank">Abrir</a></p>
        `;
        cardsContainer.appendChild(card);
      });
    }

    renderCards(data);

    searchInput.addEventListener("input", e => {
      const value = e.target.value.toLowerCase();
      const filtered = data.filter(d =>
        d.nome.toLowerCase().includes(value) ||
        d.tema.toLowerCase().includes(value)
      );
      renderCards(filtered);
    });
  });
