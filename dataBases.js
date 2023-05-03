let db = [];

let allPhones = ["iPhone 8","iPhone 14","iPhone 12"];
let allProviders = ["Mts","Vip","Telenor"];

if (localStorage.db) {
    db = JSON.parse(localStorage.db)
}