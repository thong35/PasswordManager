// Load passwords from localStorage
function loadPasswords() {
  const list = document.getElementById("passwords");
  list.innerHTML = "";
  const passwords = JSON.parse(localStorage.getItem("passwords")) || [];

  passwords.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "password-item";
    div.innerHTML = `
      <strong>${item.account}</strong> [${item.tag}] 
      <input type="password" value="${item.password}" readonly>
      <button onclick="toggleReveal(this)">Reveal</button>
      <button onclick="deletePassword(${index})">Delete</button>
    `;
    list.appendChild(div);
  });
}

// Save new password (manual or pasted from generator)
function savePassword() {
  const account = document.getElementById("accountName").value;
  const password = document.getElementById("passwordValue").value;
  const tag = document.getElementById("tag").value;

  if (!account || !password) {
    alert("Please enter both account name and password.");
    return;
  }

  const passwords = JSON.parse(localStorage.getItem("passwords")) || [];
  passwords.push({ account, password, tag });
  localStorage.setItem("passwords", JSON.stringify(passwords));

  // Clear inputs
  document.getElementById("accountName").value = "";
  document.getElementById("passwordValue").value = "";
  document.getElementById("tag").value = "";

  loadPasswords();
}

// Reveal / hide password
function toggleReveal(btn) {
  const input = btn.previousElementSibling;
  input.type = input.type === "password" ? "text" : "password";
}

// Delete password
function deletePassword(index) {
  const passwords = JSON.parse(localStorage.getItem("passwords")) || [];
  passwords.splice(index, 1);
  localStorage.setItem("passwords", JSON.stringify(passwords));
  loadPasswords();
}

// Initialize
window.onload = loadPasswords;
