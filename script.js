const chatBox = document.getElementById("chatBox");

const menu = {
    // Veg
    "veg biryani": 180,
    "veg meals": 150,
    "paneer curry": 160,
    "samosa chat": 60,

    // Non-Veg
    "chicken biryani": 220,
    "mutton biryani": 280,
    "chicken meals": 200,

    // Drinks & Beverages
    "water": 20,
    "coke": 50,
    "pepsi": 50,
    "tea": 30,
    "coffee": 40,

    // Desserts
    "ice cream": 70,
    "gulab jamun": 60
};

let totalBill = 0;

botMessage("Welcome to Food Order Bot 🍽️");
botMessage("Categories: Veg, Non-Veg, Drinks, Chaat, Meals, Beverages, Desserts");
botMessage("Type food name to order (example: chicken biryani)");
botMessage("Type 'total' to see bill or 'done' to finish");

function sendMessage() {
    const input = document.getElementById("userInput");
    const text = input.value.trim().toLowerCase();

    if (text === "") return;

    userMessage(text);

    if (text === "done") {
        botMessage("🧾 Final Bill: ₹" + totalBill);
        botMessage("Thank you for ordering 😊");
        totalBill = 0;
    }
    else if (text === "total") {
        botMessage("Current total bill is ₹" + totalBill);
    }
    else if (menu[text]) {
        totalBill += menu[text];
        botMessage(text + " added ✅ Price ₹" + menu[text]);
    }
    else {
        botMessage("Item not available ❌");
    }

    input.value = "";
}

function userMessage(msg) {
    const div = document.createElement("div");
    div.className = "message user";
    div.innerText = msg;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function botMessage(msg) {
    const div = document.createElement("div");
    div.className = "message bot";
    div.innerText = msg;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}
