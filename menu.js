const menuData = {
    veg: {
        "Rice Items": ["White Rice", "Bhagara Rice", "Kothimeera Rice", "Pudina Rice", "Jeera Rice", "Lemon Rice", "Pulihora Rice (Chintapondu)", "Gongura Rice", "Tomato Rice", "Curd Rice", "Veg Biryani", "Veg Dum Biryani", "Paneer Biryani", "Mushroom Biryani", "Kaju Biryani", "Panaskaya Biryani"],
        "Roti Items": ["Chapathi", "Pulka", "Poori", "Rumal Roti"],
        "Gravy Curry": ["Paneer Curry", "Mixed Veg Curry", "Chenna Masala Curry", "Pool Makani", "Baby Corn Curry", "Kaju Curry"],
        "Curry Items": ["Allam Mirchi Vankai", "Guthi Vankai", "Kaju Mulakada", "Sanagapappu Birakai", "Aloo Tomato", "Aloo Capsicum", "Chikudikaya Tomato"],
        "Fry Items": ["Baby Corn 65", "Cabbage 65", "Dondakai 65", "Aloo 65", "Gobi 65", "Dondakai Oil Fry", "Bendakai Oil Fry", "Aloo Fry", "Aratikai Kobbari", "Vankai Fry", "Cabbage Fry", "Aloo Menthikura"],
        "Dal Items": ["Mamidikai Pappu", "Menthikura Pappu", "Paalakura Pappu", "ThotaKura Pappu", "Tomato Pappu", "Gongura Pappu", "Mulakkada Pappu"],
        "Sambar Items": ["Majjiga Charu", "Majjiga Pulusu", "Rasam", "Sambar", "Oolva Charu", "Pachi Pulusu"],
        "Curd Items": ["Curd", "Raita"],
        "Roti Chutney": ["Beerakai", "Gongura", "Dondakai", "Kothimeera", "Mullangi", "Sorakai", "Vankai", "Tomato", "Dosakaya"],
        "Sweets Items": ["Badusha", "Bobbatlu", "Pornam", "Boondi Laddu", "Carrot Halwa", "Sorakaya Halwa", "Cheekara Pongal", "Double Ka Meeta", "Kala Jaamun", "Gulab Jaamun", "Rava Kesari", "Sagubiyyam Payasam (Sugar)", "Sagubiyyam Payasam (Bellam)"],
        "Hot Items": ["Aloo Samosa", "Aratikai Bajji", "Mirchi Bajji", "Thamalapak Bajji", "Thamalapak Vada", "Masala Vada", "Gaari", "Sweet Corn Samosa"],
        "Chips Items": ["Chips", "Dahi Mirchi", "Papad", "Minapa Vadiyalu", "Podi", "Ghee"],
        "Pickles Items": ["Aavakai", "Lemon", "Tomato"]
    },
    'non-veg': {
        "Starters - Non Veg": ["Chicken 65", "Chilli Chicken", "Chicken Majestic", "Fish Fry", "Apollo Fish", "Mutton Keema Balls"],
        "Main Course - Non Veg": ["Mutton Curry", "Chicken Curry", "Butter Chicken", "Fish Curry", "Prawns Masala", "Chicken Masala"],
        "Biryani & Rice": ["Chicken Biryani", "Mutton Biryani", "Prawns Biryani", "Egg Biryani", "White Rice"]
    },
    others: {
        "Welcome Drinks": ["Fruit Punch", "Mint Mojito", "Sweet Lassi", "Badam Milk", "Soft Drinks", "Ice Cream Shake"],
        "Sweets & Desserts": ["Gulab Jamun", "Double Ka Meetha", "Qubani Ka Meetha", "Ice Cream", "Fruit Salad", "Apricot Delight", "Kaddu Ka Dalcha"],
        "Breads": ["Rumali Roti", "Butter Naan", "Tandoori Roti", "Pulka"],
        "Sides": ["Raita", "Green Salad", "Pickle", "Papad / Chips", "Curd", "Avakai"],
        "Extra Service": ["Boys (Serving Staff)", "Water Cans", "Water Bottles"]
    }
};

let currentTab = 'veg';
let selectedItems = new Set();

document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
});

function renderMenu() {
    const grid = document.getElementById('menu-grid');
    grid.innerHTML = '';
    
    const categories = menuData[currentTab];
    for (const [category, items] of Object.entries(categories)) {
        const card = document.createElement('div');
        card.className = 'category-card glass';
        
        let itemsHtml = `<div class="item-list">`;
        items.forEach(item => {
            const isChecked = selectedItems.has(item) ? 'checked' : '';
            itemsHtml += `
                <label class="item-checkbox">
                    <input type="checkbox" value="${item}" onchange="toggleItem(this)" ${isChecked}>
                    <span>${item}</span>
                </label>
            `;
        });
        itemsHtml += `</div>`;
        
        card.innerHTML = `<h3>${category}</h3>${itemsHtml}`;
        grid.appendChild(card);
    }
}

function switchTab(tabId) {
    currentTab = tabId;
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.innerText.toLowerCase().includes(tabId.replace('-', '')));
    });
    // Manually handle tab button active states if the includes logic is too simple
    const btns = document.querySelectorAll('.tab-btn');
    btns[0].classList.toggle('active', tabId === 'veg');
    btns[1].classList.toggle('active', tabId === 'non-veg');
    btns[2].classList.toggle('active', tabId === 'others');
    
    renderMenu();
}

function toggleItem(checkbox) {
    if (checkbox.checked) {
        selectedItems.add(checkbox.value);
    } else {
        selectedItems.delete(checkbox.value);
    }
    updatePreview();
}

function removeItem(item) {
    selectedItems.delete(item);
    // Uncheck in grid if currently visible
    const checkboxes = document.querySelectorAll(`input[value="${item}"]`);
    checkboxes.forEach(cb => cb.checked = false);
    updatePreview();
}

function clearSelection() {
    selectedItems.clear();
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    updatePreview();
}

function updatePreview() {
    const list = document.getElementById('selected-list');
    const count = document.getElementById('items-count');
    const btn = document.getElementById('whatsapp-btn');
    const badge = document.getElementById('cart-badge');
    
    count.innerText = selectedItems.size;
    badge.innerText = selectedItems.size;
    btn.disabled = selectedItems.size === 0;

    // Add pop animation to badge
    badge.classList.remove('pop');
    void badge.offsetWidth; // trigger reflow
    badge.classList.add('pop');

    if (selectedItems.size === 0) {
        list.innerHTML = '<p class="empty-msg">No items selected yet</p>';
        return;
    }

    list.innerHTML = '';
    selectedItems.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'selected-item';
        itemEl.innerHTML = `
            <span>${item}</span>
            <button class="remove-item" onclick="removeItem('${item}')">
                <i data-lucide="x"></i>
            </button>
        `;
        list.appendChild(itemEl);
    });
    
    lucide.createIcons();
}

function sendToWhatsApp() {
    const members = document.getElementById('members').value;
    const date = document.getElementById('functionDate').value;
    const time = document.getElementById('functionTime').value;
    const type = document.getElementById('functionType').value;
    
    let message = `*SRI SAI CATERS - CUSTOM MENU*%0A%0A`;
    message += `*Details:*%0A`;
    message += `- Function: ${type || 'Not specified'}%0A`;
    message += `- Members: ${members || 'Not specified'}%0A`;
    message += `- Date: ${date || 'Not specified'}%0A`;
    message += `- Time: ${time || 'Not specified'}%0A%0A`;
    message += `*Selected Items:*%0A`;
    
    Array.from(selectedItems).forEach((item, index) => {
        message += `${index + 1}. ${item}%0A`;
    });

    message += `%0A*Please provide a quote for this menu.*`;

    const whatsappUrl = `https://wa.me/919642182223?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

function toggleCart() {
    const sidebar = document.getElementById('preview-sidebar');
    const overlay = document.getElementById('cart-overlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
}
