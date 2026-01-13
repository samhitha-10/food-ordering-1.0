const chat = document.getElementById("chat");

/* 🔹 Categories in exact order */
const categories = [
    { key: "beverages", label: "Beverages" },
    { key: "starters", label: "Starters" },
    { key: "biryani", label: "Biryani" },
    { key: "snacks", label: "Snacks" },
    { key: "desserts", label: "Desserts" },
    { key: "special", label: "Special Thalis" }
];

/* 🔹 Full menu exactly as given */
const menu = {

    beverages: [
        { name: "Tea", price: 30 },
        { name: "Hot Coffee", price: 40 },
        { name: "Cold Coffee", price: 55 },
        { name: "Filter Coffee", price: 45 },
        { name: "Hot Milk", price: 35 },
        { name: "Cold Milk", price: 40 },
        { name: "Chocolate Milkshake", price: 90 },
        { name: "Strawberry Milkshake", price: 90 },
        { name: "Vanilla Milkshake", price: 85 },
        { name: "Orange Juice", price: 70 },
        { name: "Apple Juice", price: 80 },
        { name: "Watermelon Juice", price: 65 },
        { name: "Soft Drink", price: 50 },
        { name: "Mineral Water", price: 20 }
    ],

    starters: [
        { name: "Chicken Soup", price: 120 },
        { name: "Veg Soup", price: 100 },
        { name: "Tomato Soup", price: 95 },
        { name: "Sweet Corn Soup", price: 110 },
        { name: "Chilli Chicken", price: 264 },
        { name: "Pepper Chicken", price: 264 },
        { name: "Paneer 65", price: 196 },
        { name: "Veg Manchurian", price: 189 }
    ],

    biryani: [
        { name: "Chicken Biryani", price: 210 },
        { name: "Mutton Biryani", price: 253 },
        { name: "Fish Biryani", price: 230 },
        { name: "Prawns Biryani", price: 240 },
        { name: "Veg Biryani", price: 154 },
        { name: "Paneer Biryani", price: 180 },
        { name: "Mushroom Biryani", price: 175 },
        { name: "Egg Biryani", price: 154 }
    ],

    snacks: [
        { name: "Veg Sandwich", price: 80 },
        { name: "Paneer Sandwich", price: 110 },
        { name: "Chicken Sandwich", price: 130 },
        { name: "Veg Burger", price: 90 },
        { name: "Chicken Burger", price: 120 },
        { name: "Egg Burger", price: 100 },
        { name: "Hot Dog", price: 120 },
        { name: "French Fries", price: 80 },
        { name: "Paneer Cheese Balls", price: 140 },
        { name: "Veg Cheese Balls", price: 120 },
        { name: "Chicken Cheese Balls", price: 160 }
    ],

    desserts: [
        { name: "Ice Cream", price: 70 },
        { name: "Gulab Jamun", price: 60 },
        { name: "Chocolate Cake", price: 120 },
        { name: "Black Forest Cake", price: 140 },
        { name: "Pineapple Cake", price: 130 },
        { name: "Fruit Salad", price: 80 }
    ],

    special: [
        { name: "Veg Thali (Rice, Dal, 2 Curries, Roti, Curd)", price: 180 },
        { name: "Special Veg Thali (Paneer + Sweet)", price: 220 },
        { name: "Non-Veg Thali (Chicken Curry, Rice, Roti)", price: 260 },
        { name: "Special Non-Veg Thali (Chicken + Egg + Sweet)", price: 300 }
    ]
};

let stage = "category";
let currentCategory = "";
let cart = [];
let total = 0;

/* 🔹 Chat functions */
function bot(msg) {
    chat.innerHTML += `<div class="bot">${msg}</div>`;
    chat.scrollTop = chat.scrollHeight;
}

function user(msg) {
    chat.innerHTML += `<div class="user">${msg}</div>`;
}

/* 🔹 Show categories in order */
function showCategories() {
    let text = "Choose a category:<br>";
    categories.forEach((c, i) => {
        text += `${i + 1}. ${c.label}<br>`;
    });
    text += "Commands: bill | cancel | clear";
    bot(text);
}

showCategories();

/* 🔹 Main send logic */
function send() {
    const input = document.getElementById("input");
    const value = input.value.trim().toLowerCase();
    if (!value) return;
    user(value);
    input.value = "";

    if (value === "cancel") {
        if (cart.length === 0) return bot("No items to cancel ❌");
        const removed = cart.pop();
        total -= removed.price;
        bot(`❌ ${removed.name} removed<br>Total ₹${total}`);
        return;
    }

    if (value === "clear") {
        cart = [];
        total = 0;
        bot("🗑 Order cleared");
        return;
    }

    if (value === "bill") {
        if (cart.length === 0) return bot("No items ordered ❌");
        let bill = "🧾 Order Summary:<br>";
        cart.forEach(i => bill += `${i.name} - ₹${i.price}<br>`);
        bill += `<b>Total = ₹${total}</b><br>Thank you 😊`;
        bot(bill);
        stage = "done";
        return;
    }

    if (stage === "category") {
        const index = value - 1;
        if (categories[index]) {
            currentCategory = categories[index].key;
            stage = "items";
            showItems();
        } else {
            bot("Invalid category ❌");
        }
        return;
    }

    if (stage === "items") {
        if (value === "#") {
            stage = "category";
            showCategories();
            return;
        }
        const item = menu[currentCategory][value - 1];
        if (item) {
            cart.push(item);
            total += item.price;
            bot(`✅ ${item.name} added (₹${item.price})<br>
Add more or # to exit`);
        } else {
            bot("Invalid item ❌");
        }
    }
}

/* 🔹 Show items in order */
function showItems() {
    let text = "Select item (# to exit):<br>";
    menu[currentCategory].forEach((i, idx) => {
        text += `${idx + 1}. ${i.name} - ₹${i.price}<br>`;
    });
    bot(text);
}
