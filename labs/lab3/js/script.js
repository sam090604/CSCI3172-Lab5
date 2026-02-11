
const musicInventory = new Map();

// Initial Data
musicInventory.set("Fender Strat", { category: "Strings", price: 1200, stock: 3 });
musicInventory.set("Yamaha Drums", { category: "Percussion", price: 850, stock: 10 });

const renderInventory = () => {
    const tbody = document.getElementById('inventoryBody');
    tbody.innerHTML = '';

    musicInventory.forEach((data, name) => {
        const isLow = data.stock < 5;
        const row = document.createElement('tr');
        if (isLow) row.style.backgroundColor = "#fff0f0";

        row.innerHTML = `
            <td>${name}</td>
            <td>${data.category}</td>
            <td>$${data.price}</td>
            <td id="qty-${name}">${data.stock}</td>
            <td style="color: ${isLow ? 'red' : 'green'}">
                ${isLow ? '⚠️ Low Stock' : '✅ Healthy Stock'}
            </td>
            <td>
                <button type="button" onclick="adjustStock('${name}', 1)">+</button>
                <button type="button" onclick="adjustStock('${name}', -1)">-</button>
            </td>
        `;
        tbody.appendChild(row);
    });
    console.log("Current Map State:", Array.from(musicInventory.entries()));
};

window.adjustStock = (name, val) => {
    const item = musicInventory.get(name);
    if (item && (item.stock + val >= 0)) {
        item.stock += val;
        renderInventory();
    }
};

document.getElementById('addBtn').addEventListener('click', () => {
    const name = document.getElementById('itemName').value;
    const cat = document.getElementById('itemCategory').value;
    const prc = parseFloat(document.getElementById('itemPrice').value);
    const stk = parseInt(document.getElementById('itemStock').value);

    if (name && prc && stk) {
        musicInventory.set(name, { category: cat, price: prc, stock: stk });
        renderInventory();
    }
});

renderInventory();