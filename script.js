const chatBox = document.getElementById("chatBox");

let total = 0;
let currentCategory = "";

const menu = {
    veg: {
        "veg biryani": 180,
        "veg meals": 150
    },
    nonveg: {
        "chicken biryani": 220,
        "mutton biryani": 280
    },
    drinks: {
        "water": 20,
        "coke": 50
    },
    chaat: {
        "samosa chat": 60,
        "pani puri": 50
    },
    desserts: {
        "ice cream": 70,
        "gulab jamun": 60
    }
};

botMessage("Welcome to Food Order Bot 🍽️");
botMessage("Choose a category:");
botMessage("Veg | NonVeg | Drinks | Chaat | Desserts");
botMessage("Type category name to continue");

function sendMessage() {
    const input = document.getElementById("userInput");
    const text = input.value.trim().toLowerCase();

    if (text === "") return;
    userMessage(text);

    // Show total
    if (text === "total") {
        botMessage("Current total bill: ₹" + total);
    }

    // Finish order
    else if (text === "done") {
        botMessage("🧾 Final Bill: ₹" + total);
        botMessage("Thank you for ordering 😊");
        total = 0;
        currentCategory = "";
    }

    // Category selection
    else if (menu[text]) {
        currentCategory = text;
        let items = Object.keys(menu[text]).join(", ");
        botMessage("Available items in " + text.toUpperCase() + ":");
        botMessage(items);
        botMessage("Please type your choice");
    }

    // Item selection
    else if (currentCategory && menu[currentCategory][text]) {
        total += menu[currentCategory][text];
        botMessage(text + " added ✅ Price ₹" + menu[currentCategory][text]);
        botMessage("Choose another category or type 'done'");
        currentCategory = "";
    }

    else {
        botMessage("Invalid choice ❌ Please select a valid category or item");
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
