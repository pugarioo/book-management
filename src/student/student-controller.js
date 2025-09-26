function searchBooks() {
    const keyword = (document.getElementById("student-search-bar").value).trim()
    
    fetch("api/search_book.php?keyword=" + encodeURIComponent(keyword), {
        method: "GET"
    })
    .then(res => res.json())
    .then(data => renderBooks(data))
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

function renderBooks(data) {
    const table = document.querySelector("#book-table tbody")
    table.innerHTML = "";

    data.forEach(row => {
        const tableRow = document.createElement("tr")

        tableRow.appendChild(createCell(row.id))
        tableRow.appendChild(createCell(row.title))
        tableRow.appendChild(createCell(row.author))
        tableRow.appendChild(createCell(row.year))
        tableRow.appendChild(createCell(row.category))
        tableRow.appendChild(createCell(row.status))
        
        if (row.status === "available") {
            const borrowBtn = document.createElement("button")
            borrowBtn.className = "borrow-btn"
            borrowBtn.setAttribute("onclick", "borrowBook(this)")
            borrowBtn.textContent = "Borrow";
        }

        table.appendChild(tableRow)
    })
}

function borrowBook(btn) {
    const row = btn.closest("tr")
    const cells = row.querySelectorAll("td")

    const id = cells[0].textContent

    fetch("api/borrow_book.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `id=${id}`
    })
    .then(res => res.json())
    .then(data => {
        // Notif Logic here
    })
}