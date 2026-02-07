// 3. Push the contents of that Object into an Array
let sanctuary = [];

const form = document.getElementById('addCreatureForm');
const sanctuaryDisplay = document.getElementById('creatureSanctuary');
const searchBar = document.getElementById('searchBar');

// Handle Form Submission
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // 1. Grab the input a user enters
    const name = document.getElementById('creatureName').value;
    const type = document.getElementById('creatureType').value;
    const url = document.getElementById('creatureUrl').value;
    const notes = document.getElementById('creatureNotes').value;

    // 2. Represent this input as an Object
    const newCreature = {
        id: Date.now(), // Unique ID for finding/removing
        name: name,
        type: type,
        url: url || 'https://via.placeholder.com/150', // Feature: Image display
        notes: notes // Feature: Notes display
    };

    // 3. Push the Object into an Array
    sanctuary.push(newCreature);

    // 4. Reset our form
    form.reset();

    // 5. Display the new creature
    renderSanctuary(sanctuary);
});

// Feature: Remove Creature functionality
function removeCreature(id) {
    sanctuary = sanctuary.filter(beast => beast.id !== id);
    renderSanctuary(sanctuary);
}

// Feature: Search functionality (Find by name or type)
searchBar.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filteredResults = sanctuary.filter(beast => 
        beast.name.toLowerCase().includes(term) || 
        beast.type.toLowerCase().includes(term)
    );
    renderSanctuary(filteredResults);
});

// Helper function to render the array to the page
function renderSanctuary(list) {
    sanctuaryDisplay.innerHTML = ''; // Clear current display

    list.forEach(beast => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-3';
        col.innerHTML = `
            <div class="card h-100">
                <img src="${beast.url}" class="card-img-top" alt="${beast.name}" style="height: 180px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${beast.name}</h5>
                    <p class="card-text text-muted">${beast.type}</p>
                    <p class="card-text"><small>${beast.notes || "No notes provided."}</small></p>
                    <button class="btn btn-danger btn-sm" onclick="removeCreature(${beast.id})">Remove</button>
                </div>
            </div>
        `;
        sanctuaryDisplay.appendChild(col);
    });
}