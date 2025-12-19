const API_URL = 'http://localhost:3000/aliens';

const form = document.getElementById('alienForm');
const list = document.getElementById('alienList');

// get
async function cargarAliens() {
  const res = await fetch(API_URL);
  const data = await res.json();
  renderAliens(data);
}

function renderAliens(aliens) {
  list.innerHTML = '';

  if (aliens.length === 0) {
    const aviso = document.createElement('div');
    aviso.className = 'card aviso';
    aviso.textContent = 'No hay aliens registrados';
    list.appendChild(aviso);
    return;
  }

  aliens.forEach(alien => {
    const card = document.createElement('div');
    card.className = `card ${alien.peligrosidad.toLowerCase()}`;

    card.innerHTML = `
  <h3 class="alien-nombre">${alien.nombre.toUpperCase()}</h3>
  <div class="alien-info">
    <span class="planeta">Planeta: ${alien.planeta.toUpperCase()}</span>
    <span class="imagen"></span>
    <span class="peligrosidad">Peligrosidad: ${alien.peligrosidad.toUpperCase()}</span>
  </div>
  <div class="alien-actions">
    <button class="btn-eliminar" onclick="eliminarAlien(${alien.id})">Eliminar</button>
  </div>
`;


    list.appendChild(card);
  });
}



async function getNextId() {
  const res = await fetch(API_URL);
  const aliens = await res.json();
  const maxId = aliens.length > 0 ? Math.max(...aliens.map(a => a.id)) : 0;
  return maxId + 1;
}

// post
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nuevoId = await getNextId();


  const nuevoAlien = {
    id: nuevoId,
    nombre: nombre.value,
    planeta: planeta.value,
    peligrosidad: peligrosidad.value
  };

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nuevoAlien)
  });

  form.reset();
  cargarAliens();
});

// delete
async function eliminarAlien(id) {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });

  cargarAliens();
}


cargarAliens();
