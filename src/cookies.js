const date = new Date();
date.setFullYear(2025)
const utc = date.toUTCString();
console.log(utc);

document.cookie = `theme=dark;expires=${utc}`;

console.log(document.cookie);