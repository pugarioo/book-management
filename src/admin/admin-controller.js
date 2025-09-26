const addOpenBtn = document.getElementById("add-btn")
const addCloseBtn = document.getElementById("add-close-btn")
const addContainer = document.querySelector(".add-cont")
const editCloseBtn = document.getElementById("edit-close-btn")
const editContainer = document.querySelector(".edit-cont")

addOpenBtn.addEventListener("click", () => {
    console.log("clicked")
    addContainer.classList.add("open")
})

addCloseBtn.addEventListener("click", () => {
    addContainer.classList.remove("open")
})

editCloseBtn.addEventListener("click", () => {
    editContainer.classList.remove("open")
})

function showEdit(btn) {
    const row = btn.closest("tr")
    const cells = row.querySelectorAll("td")

    const title = cells[1].textContent;
    const author = cells[2].textContent;
    const year = cells[3].textContent;
    const category = cells[4].textContent;
    const status = cells[5].querySelector("select").value;

    document.getElementById("book-title-edit").value = title;
    document.getElementById("book-author-edit").value = author;
    document.getElementById("book-year-edit").value = year;
    document.getElementById("book-category-edit").value = category;
    document.getElementById("update-status-dropdown").value = status;

    editContainer.classList.add("open")
}


function addBook() {
    const form = document.getElementById("add-form")
    const formData = new FormData(form)

    fetch("api/add_book.php", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        // Logic for notification
        if (data.status === "success") {
            // TODO
        }
    })
    .catch(err => console.error("Error: ", err))
}

function getBooks() {
    fetch("api/browse.php" , {
        method: "GET"
    })
    .then(res => res.json())
    .then(data => renderBooks(data))
    .catch(err => console.error("Error: ", err))
}

function searchBook() {
    const keyword = (document.getElementById("admin-search-bar").value).trim()


    fetch("api/search_book.php?keyword=" + encodeURIComponent(keyword), {
        method: "GET"
    })
    .then(res => res.json())
    .then(data => renderBooks(data))
    .catch(err => console.error("Error: ", err))
}

function renderBooks(data) {
    const table = document.querySelector("#book-table tbody")
    table.innerHTML = "";

    data.forEach(row => {
        const tableRow = document.createElement("tr")

        const editBtn = document.createElement("button")
        editBtn.className = "edit-del-btn"
        editBtn.setAttribute("onclick", "showEdit(this)")
        editBtn.textContent = "Edit";

        const delBtn = document.createElement("button")
        delBtn.className = "edit-del-btn"
        delBtn.setAttribute("onclick", "")
        delBtn.textContent = "Delete";

        tableRow.appendChild(createCell(row.id))
        tableRow.appendChild(createCell(row.title))
        tableRow.appendChild(createCell(row.author))
        tableRow.appendChild(createCell(row.year))
        tableRow.appendChild(createCell(row.category))
        tableRow.appendChild(createCell(row.status))
        tableRow.appendChild(editBtn)
        tableRow.appendChild(delBtn)

        table.appendChild(tableRow)
        })
}

function createCell(value) {
    const cell = document.createElement("td")
    cell.textContent = value

    return cell
}

function deleteBook(btn) {
    const row = btn.closest("tr")
    const cells = row.querySelectorAll("td")
    const id = cells[0].textContent
    
    fetch("api/delete.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `id=${id}`
    })
    .then(res => res.json())
    .then(data => {
        // Logic to notify deletion
        if (data.status === "success") {
            row.remove
        }
        else {
            
        }
    })
    .catch(err => console.error("Error: ", err))
}