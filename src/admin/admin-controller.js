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
    console.log("edit opened")

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