const chatBox = document.getElementById("chatBox");

let total = 0;
let currentCategory = "";
let currentItems = [];

const menu = {
    biryani: [
        { name: "Chicken Biryani", price: 210 },
        { name: "Mutton Biryani", price: 253 },
        { name: "Veg Biryani", price: 154 },
        { name: "Egg Biryani", price: 154 }
    ],
    starters: [
        { name: "Chilli Chicken", price: 264 },
        { name: "Pepper Chicken", price: 264 },
        { name: "Paneer 65", price: 196 },
        { name: "Veg Manchurian", price: 189 }
    ],
    southindian: [
        { name: "Plain Dosa", price: 120 },
        { name: "Masala Dosa", price: 145 },
        { name: "Idli (3 pcs)", price: 110 },
        { name: "Vada (3 pcs)", price: 120 }
    ],
    desserts: [
        { name: "Ice Cream", price: 70 },
        { name: "Gulab Jamun", price: 60 },
        { name: "Fruit Salad", price: 80 }
    ],
    beverages: [
        { name: "Tea", price: 30 },
        { name: "Coffee", price: 40 },
        { name: "Soft Drink", price: 50 },
        { name: "Mineral Water", price: 20 }
    ]
};

botMessage("🍽️ Welcome to Food Order Bot");
botMessage("Choose a category:");
botMessage("Biryani | Starters | SouthIndian | Desserts | Beverages");
botMessage("Type category name to continue");

function sendMessage() {
    const input = document.getElementById("userInput");
    const text = input.value.trim().toLowerCase();

    if (!text) return;
    userMessage(text);

    // Show total
    if (text === "total") {
        botMessage("🧾 Current Bill: ₹" + total);
    }

    // Finish
    else if (text === "done") {
        botMessage("✅ Final Bill: ₹" + total);
        botMessage("Thank you! Visit again 😊");
        total = 0;
        currentCategory = "";
    }

    // Category selected
    else if (menu[text]) {
        currentCategory = text;
        currentItems = menu[text];

        let msg = `📋 ${text.toUpperCase()} MENU:\n`;
        currentItems.forEach((item, index) => {
            msg += `${index + 1}. ${item.name} – ₹${item.price}\n`;
        });

        botMessage(msg);
        botMessage("👉 Enter item number to order");
    }

    // Item selected by number
    else if (currentCategory && !isNaN(text)) {
        let index = parseInt(text) - 1;

        if (currentItems[index]) {
            total += currentItems[index].price;
            botMessage(`✅ ${currentItems[index].name} added – ₹${currentItems[index].price}`);
            botMessage("Choose another category or type 'done'");
            currentCategory = "";
        } else {
            botMessage("❌ Invalid item number");
        }
    }

    else {
        botMessage("❌ Invalid input. Try again");
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
