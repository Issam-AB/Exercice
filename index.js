import { users } from "./data.js";

//selectors
var table = document.getElementById("myTable");
var form = document.getElementById("modal");
const tableEl = document.querySelector("table");

//modal selectors
const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

function buildTables(data) {
  for (var i = 0; i < data.length; i++) {
    var row = `<tr>
      <td>${data[i].id}</td>
      <td>${data[i].createdDate.slice(0, 10)}</td>
      <td ><p>${data[i].status}</p></td>
      <td>${data[i].firstName}</td>
      <td>${data[i].lastName}</td>
      <td>${data[i].userName}</td>
      <td>${data[i].registrationNumber}</td>
      <td><button class="deleteBtn"><i class="fas fa-trash"></i></button></td>
      </tr>`;
    table.innerHTML += row;

    if (data[i].status === "En validation") {
      table.lastElementChild.setAttribute("class", "on-validation");
    } else if (data[i].status === "Validé") {
      table.lastElementChild.setAttribute("class", "valid");
    } else if (data[i].status === "Rejeté") {
      table.lastElementChild.setAttribute("class", "rejected");
    }
  }
}
buildTables(users);

function deleteRow() {
  var index;
  for (let i = 0; i < tableEl.rows.length; i++) {
    tableEl.rows[i].cells[7].onclick = function () {
      index = this.parentElement.rowIndex;
      tableEl.deleteRow(index);
      console.log(index);
    };
  }
}
tableEl.addEventListener("click", deleteRow);

function addRow(e) {
  e.preventDefault();
  const nom = document.getElementById("nom").value;
  const prenom = document.getElementById("prenom").value;
  const status = document.getElementById("status").value;
  const nomUtilisateur = document.getElementById("nomUser").value;
  const dateCreation = document.getElementById("dateCreation").value;
  const matricule = document.getElementById("matricule").value;

  table.innerHTML += `
     <tr>
       <td>${Math.floor(Math.random() * 1000000000)}</td>
       <td>${dateCreation}</td>
       <td><p>${status}</p></td>
       <td>${nom}</td>
       <td>${prenom}</td>
       <td>${nomUtilisateur}</td>
       <td>${matricule}</td>
       <td><button class="deleteBtn"><i class="fas fa-trash"></i></button></td>
     </tr>
    `;
  if (status === "En validation") {
    table.lastElementChild.setAttribute("class", "on-validation");
  } else if (status === "Validé") {
    table.lastElementChild.setAttribute("class", "valid");
  } else if (status === "Rejeté") {
    table.lastElementChild.setAttribute("class", "rejected");
  } else table.lastElementChild.setAttribute("class", "NoValid");
  closeModal(modal);
}
form.addEventListener("submit", addRow);

openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}
