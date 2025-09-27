document.addEventListener("DOMContentLoaded", getBooks);

const addOpenBtn = document.getElementById("add-btn")
const addCloseBtn = document.getElementById("add-close-btn")
const addContainer = document.querySelector(".add-cont")
const editCloseBtn = document.getElementById("edit-close-btn")
const editContainer = document.querySelector(".edit-cont")
const toggleBorrowedBtn = document.querySelector(".trans-btn")
const catalogTable = document.querySelector(".catalog-table")
const transTable = document.querySelector(".trans-table")

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

toggleBorrowedBtn.addEventListener("click", () => {
    if (toggleBorrowedBtn.classList.contains("active")) {
        getBooks()
        toggleBorrowedBtn.classList.remove("active")
        catalogTable.classList.remove("close")
        transTable.classList.remove("open")
    }
    else {
        getTransactions();
        toggleBorrowedBtn.classList.add("active")
        catalogTable.classList.add("close")
        transTable.classList.add("open")
    }
})

function showEdit(btn) {
    const row = btn.closest("tr")
    const cells = row.querySelectorAll("td")


    const id = cells[0].textContent
    const title = cells[1].textContent;
    const author = cells[2].textContent;
    const year = cells[3].textContent;
    const category = cells[4].textContent;

    document.getElementById("book-id-edit").value = id
    document.getElementById("book-title-edit").value = title;
    document.getElementById("book-author-edit").value = author;
    document.getElementById("book-year-edit").value = year;
    document.getElementById("book-category-edit").value = category;

    editContainer.classList.add("open")
}

function addBook() {
    const form = document.getElementById("add-form")
    const formData = new FormData(form)

    console.log(formData)

    fetch("../api/add_book.php", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        // Logic for notification
        if (data.status === "success") {
            document.getElementById("add-form-title").textContent = "Added Succesfully"
            setTimeout(() => {
                addContainer.classList.remove("open")
                document.getElementById("add-form-title").textContent = "Add a book"
            }, 1000)

            getBooks()
            form.reset()
        }
        else {
            document.getElementById("add-form-title").textContent = "Adding Failed"
            setTimeout(() => {
                addContainer.classList.remove("open")
                document.getElementById("add-form-title").textContent = "Add a book"
            }, 1000)

        }
    })
    .catch(err => console.error("Error: ", err))
}

function getBooks() {
    fetch("../api/browse.php" , {
        method: "GET"
    })
    .then(res => res.json())
    .then(data => renderBooks(data))
    .catch(err => console.error("Error: ", err))
}

function searchBook() {
    const keyword = (document.getElementById("admin-search-bar").value).trim()

    if (keyword === "") return

    fetch("../api/search_book.php?keyword=" + encodeURIComponent(keyword), {
        method: "GET"
    })
    .then(res => res.json())
    .then(data => renderBooks(data))
    .catch(err => console.error("Error: ", err))
}

function clearSearch() {
    document.getElementById("admin-search-bar").value = ""
    getBooks()
}

function getTransactions() {
    fetch("../api/get_transactions.php" , {
        method: "GET"
    })
    .then(res => res.json())
    .then(data => renderTransactions(data))
    .catch(err => console.error("Error: ", err))
}

function renderTransactions(data) {
    const table = document.querySelector("#transactions-table tbody")
    table.innerHTML = "";
    
    data.forEach(row => {
        const tableRow = document.createElement("tr")
        
        tableRow.appendChild(createCell(row.transaction_id))
        tableRow.appendChild(createCell(row.book_id))
        tableRow.appendChild(createCell(row.book_title))
        tableRow.appendChild(createCell(row.date_borrowed))
        tableRow.appendChild(createCell(row.date_returned ?? "Not Returned"))
        
        if (row.status === 'pending') {
            tableRow.appendChild(createCell("Pending"))
            tableRow.appendChild(createButtonCell("Set as returned", "return-btn", "completeTransaction(this)"))
        } 
        else {
            tableRow.appendChild(createCell("Completed"))
            tableRow.appendChild(createCell("None"))
        }
        
        table.appendChild(tableRow)
    })
}

function completeTransaction(btn) {
    const row = btn.closest("tr")
    const cells = row.querySelectorAll("td")

    const transaction_id = cells[0].textContent
    const book_id = cells[1].textContent

    fetch("../api/complete_transaction.php", {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: `id=${transaction_id}&book_id=${book_id}`
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if (data.status === "success") {
            cells[6].textContent = "None"
        }
    })
    .catch(err => console.error("Error: ", err))
}

function renderBooks(data) {
    const table = document.querySelector("#book-table tbody")
    table.innerHTML = "";

    data.forEach(row => {
        const tableRow = document.createElement("tr")

        tableRow.appendChild(createCell(row.book_id))
        tableRow.appendChild(createCell(row.title))
        tableRow.appendChild(createCell(row.author))
        tableRow.appendChild(createCell(row.year))
        tableRow.appendChild(createCell(row.category))
        tableRow.appendChild(createCell(row.status === 'available' ? 'Available' : "Borrowed"))
        tableRow.appendChild(createButtonCell("Edit", "edit-del-btn", "showEdit(this)"))
        tableRow.appendChild(createButtonCell("Delete", "edit-del-btn", "deleteBook(this)"))
        
        table.appendChild(tableRow)
    })
}

function createCell(value) {
    const cell = document.createElement("td")
    cell.textContent = value

    return cell
}

function createButtonCell(textContent, classname, functionName) {
    const cell = document.createElement("td")

    const btn = document.createElement("button")
        btn.className = classname
        btn.setAttribute("onclick", functionName)
        btn.textContent = textContent;

    cell.appendChild(btn)

    return cell
}

function deleteBook(btn) {
    const row = btn.closest("tr")
    const cells = row.querySelectorAll("td")
    const id = cells[0].textContent
    
    fetch("../api/delete.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `id=${id}`
    })
    .then(res => res.json())
    .then(data => {
        // Logic to notify deletion
        if (data.status === "success") {
            console.log("removed")
            row.remove()
        }
    })
    .catch(err => console.error("Error: ", err))
}

function updateBook() {
    const form = document.getElementById("edit-form")
    const formData = new FormData(form)

    fetch("../api/edit.php", {
        method: "POST",
        body: formData
    })
    .then((res => res.json()))
    .then(data => {
        if (data.status === "success") {
            document.getElementById("edit-form-title").textContent = "Updated Succesfully"
            setTimeout(() => {
                editContainer.classList.remove("open")
                document.getElementById("edit-form-title").textContent = "Update Book"
            }, 1000)

            getBooks()
        }
        else {
            document.getElementById("edit-form-title").textContent = "Updated Failed"
            setTimeout(() => {
                editContainer.classList.remove("open")
                document.getElementById("edit-form-title").textContent = "Update Book"
            }, 1000)
        }
    })
    .catch(err => console.error("Error: ", err))
}



