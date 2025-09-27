document.addEventListener("DOMContentLoaded", getBooks)

const closeConfirmBorrow = document.getElementById("cancel-confirm")
const confirmContainer = document.querySelector(".borrow-confirm-cont")
const successContainer = document.querySelector(".success-cont")

closeConfirmBorrow.addEventListener("click", () => {
    console.log("clicked")
    confirmContainer.classList.remove("open")
})

function searchBooks() {
    const keyword = (document.getElementById("student-search-bar").value).trim()
    
    if (keyword === "") return

    fetch("../api/search_book.php?keyword=" + encodeURIComponent(keyword), {
        method: "GET"
    })
    .then(res => res.json())
    .then(data => renderBooks(data))
    .catch(err => console.error("Error: ", err))
}

function clearSearch() {
    document.getElementById("student-search-bar").value = ""
    getBooks()
}

function getBooks() {
    fetch("../api/browse.php", {
        method: "GET"
    })
    .then(res => res.json())
    .then(data => renderBooks(data))
    .catch(err => console.error("Error: ", err))
}

function renderBooks(data) {
    console.log("rendering..")
    const table = document.querySelector("#book-table tbody")
    table.innerHTML = "";

    data.forEach(row => {
        const tableRow = document.createElement("tr")

        tableRow.appendChild(createCell(row.book_id))
        tableRow.appendChild(createCell(row.title))
        tableRow.appendChild(createCell(row.author))
        tableRow.appendChild(createCell(row.year))
        tableRow.appendChild(createCell(row.category))
        tableRow.appendChild(createCell(row.status == 'available' ? 'Available' : "Borrowed"))
        
        if (row.status === "available") {
            const btn = createButtonCell("Borrow", "borrow-btn", "confirmBorrow(this)")
            tableRow.appendChild(btn) 
        }
        else {
            const btn = createButtonCell("Return", "return-btn", "confirmReturn(this)")
            tableRow.appendChild(btn)
        }

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

function confirmBorrow (btn) {
    const row = btn.closest("tr")
    const id = (row.querySelectorAll("td")[0]).textContent

    confirmContainer.classList.add("open")

    document.getElementById("confirm-borrow").setAttribute("onclick", `borrowBook(${id})`)
}

function borrowBook(id) {
    fetch("../api/borrow.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `id=${id}`
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === "success") {
            confirmContainer.classList.remove("open")
            document.querySelector(".success-card p").textContent = "Borrow Success"   
            successContainer.classList.add("open")
            getBooks()      
            setTimeout(() => {
                successContainer.classList.remove("open")
            }, 1000)   
        }
    })
}

function confirmReturn (btn) {
    const row = btn.closest("tr")
    const id = (row.querySelectorAll("td")[0]).textContent

    confirmContainer.classList.add("open")

    document.getElementById("confirm-borrow").setAttribute("onclick", `returnBook(${id})`)

}

function returnBook(id) {
    fetch("../api/return.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `id=${id}`
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if (data.status === "success") {
            confirmContainer.classList.remove("open")
            document.querySelector(".success-card p").textContent = "Return Success"   
            successContainer.classList.add("open")
            getBooks()
            setTimeout(() => {
                successContainer.classList.remove("open")
            }, 1000)     

        }
    })
}

