
const addToDoButton = document.querySelector("#addToDo");
const todoTable = document.querySelector("#todoTable");
const todoInput = document.querySelector("#inputText");
const clearToDo = document.querySelector("#clearToDo");
const notify = document.querySelector(".notify");
const notifySuccess = document.querySelector(".notifySuccess");

let todos = [];

// Tamamlanan göreve çizgi eklemeyi-silmeyi sağlayan fonksiyon
const toggleTodoLineThrough = (todoCell) => {
  todoCell.classList.toggle('line-through');
  updateLocalStorage();
};

// Yeni görev ekle
const addTodo = () => {
  const trimValue = todoInput.value.trim();
  const trimDateValue = inputDate.value.trim();

  // Eğer görev veya bitiş tarihi boşsa bildirim göster ve işlem yapma
  if (trimValue === "" || trimDateValue === "") {
    showNotify(notify);
  } else {
    // Yeni görev eklendiğinde başarılı bildirimi göster
    showNotify(notifySuccess);

    // Yeni görev için bir tablo oluştur
    const row = document.createElement("tr");
    const todoCell = document.createElement("td");
    todoCell.className = "p-styling";
    todoCell.innerText = "- " + trimValue + " - Bitiş Tarihi: " + trimDateValue;
    todoInput.value = "";
    inputDate.value = "";
    row.appendChild(todoCell);

    todoTable.querySelector("tbody").appendChild(row);

    todos.push(trimValue);
    window.localStorage.setItem("todos", JSON.stringify(todos));

    todoCell.addEventListener('click', () => {
      toggleTodoLineThrough(todoCell);
    });

    todoCell.addEventListener('dblclick', () => {
      // Çift tıklanması durumunda görevi sil
      todoTable.querySelector("tbody").removeChild(row);
      updateLocalStorage();
    });
  }
};

// Local storage'daki görevleri güncelle
const updateLocalStorage = () => {
  todos = Array.from(todoTable.querySelectorAll("td.p-styling")).map(td => td.innerText.split(" - ")[1]);
  window.localStorage.setItem("todos", JSON.stringify(todos));
};

// Görevleri tablodan ve local storage'dan temizle
const clearTodo = () => {
  todoTable.querySelector("tbody").innerHTML = "";
  todos = [];
  window.localStorage.removeItem("todos");
};

// Local storage'dan alınan görevleri tabloya ekle
const getTodoListFromLS = () => {
  if (window.localStorage.getItem("todos") != null) {
    todos = JSON.parse(window.localStorage.getItem("todos"));

    todos.forEach((element) => {
      const row = document.createElement("tr");
      const todoCell = document.createElement("td");

      todoCell.className = "p-styling";
      todoCell.innerText = "- " + element + " - Bitiş Tarihi: " + "x";
      row.appendChild(todoCell);

      todoTable.querySelector("tbody").appendChild(row);
    });
  }
};

// Bildirim fonksiyonu
const showNotify = (notifyElement) => {
  notifyElement.style.display = "block";
  setTimeout(() => {
    notifyElement.style.display = "none";
  }, 3000);
};

// Sayfa yüklendiğinde çalışacak fonksiyonlar
const mountEventlistener = () => {
  document.addEventListener("DOMContentLoaded", getTodoListFromLS);
  addToDoButton.addEventListener("click", addTodo);
  clearToDo.addEventListener("click", clearTodo);
};

mountEventlistener();