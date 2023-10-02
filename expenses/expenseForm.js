const showForm = document.getElementById("showForm");
const expenseForm = document.querySelector(".expense-form");
const inputExp = document.querySelector("#expense");
const inputDes = document.querySelector("#description");
const inputCat = document.querySelector("#category");

showForm.addEventListener("click", () => {
  expenseForm.classList.toggle("active");
});

let currentDate = new Date();
let currentMonthIndex = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

function updateMonth() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  document.getElementById("currentMonth").textContent =
    months[currentMonthIndex] + " " + currentYear;
}

function nextMonth() {
  currentMonthIndex = (currentMonthIndex + 1) % 12;
  if (currentMonthIndex === 0) {
    currentYear++;
  }
  updateMonth();
}

function previousMonth() {
  if (currentMonthIndex === 0) {
    currentYear--;
    currentMonthIndex = 11;
  } else {
    currentMonthIndex--;
  }
  updateMonth();
}
// Initially current date show krne k lie
updateMonth();

//-------------------------------------------------------------

expenseForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let obj = {
    expense: inputExp.value,
    description: inputDes.value,
    category: inputCat.value,
  };

  await axios
    .post("http://localhost:3000/expense-table/insert", obj)
    .then((response) => {
      console.log(response.status);
      showUserOnScreen(response.data.newExpenseDetail);
    })
    .catch((err) => {
      document.body.innerHTML =
        document.body.innerHTML + "<h4>Something is Wrong!!</h4>";
      console.log(err);
    });
});

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/expense-table/all")
    .then((response) => {
      console.log(response.data.allExpense);
      for (let i = 0; i < response.data.allExpense.length; i++) {
        showUserOnScreen(response.data.allExpense[i]);
      }
    })
    .catch((err) => {
      console.error("Error:", err.response);
    });
});

function showUserOnScreen(user) {
  document.getElementById("expense").value = "";
  document.getElementById("description").value = "";
  document.getElementById("category").value = "";

  const parentNode = document.getElementById("output");
  const childHTML = `<li id=${user.id}>
  <div class="expense-info">${user.expense}</div>
  <div class="description-info">${user.description}</div>
  <div class="category-info">${user.category}</div>
  <div class="action-info">
    <button onclick=deleteExpense('${user.id}')>🗑</button>
    <button onclick=EditExpense('${user.id}','${user.expense}','${user.description}','${user.category}')>✐</button>
  </div>
</li>`;
  parentNode.innerHTML += childHTML;
}

function deleteExpense(userId) {
  axios
    .delete(`http://localhost:3000/expense-table/all/${userId}`)
    .then((response) => {
      removeUserFromScreen(userId);
    })
    .catch((err) => {
      console.log(err);
    });
}

function EditExpense(userId, expensee, descriptionn, categoryy) {
  console.log(userId, expensee, descriptionn, categoryy);
  document.getElementById("expense").value = expensee;
  document.getElementById("description").value = descriptionn;
  document.getElementById("category").value = categoryy;
  deleteExpense(userId);
}

function removeUserFromScreen(userId) {
  const parentNode = document.getElementById("output");
  const childNodeToBeDel = document.getElementById(userId);
  if (childNodeToBeDel) {
    parentNode.removeChild(childNodeToBeDel);
  }
}
