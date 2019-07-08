let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        let pagePluralize = (this.pages > 1 ? "pages" : "page");
        let readStatement = (this.read ? "already read" : "not read yet");
        return `${this.title} by ${this.author}, ${this.pages} ${pagePluralize}, ${readStatement}`;
    }
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function addBookFromForm(title, author, pages, read) {
    bookForm = document.getElementById("newBookForm");
    title = bookForm.title.value;
    author = bookForm.author.value;
    pages = bookForm.pages.value;
    read = bookForm.read.value;
    addBookToLibrary(title, author, pages, read);
    renderLibrary();
}

function renderLibrary() {
    let tableID = "libraryTable";
    let columns = ["title", "author", "pages", "read", "mark as read", "delete"];
    let containerID = "bookList"
    // clear existing content before creating the table
    document.getElementById(containerID).innerHTML = "";
    generateTable(myLibrary, columns, tableID, containerID);
}

function initializePage() {
    const showHideBtn = document.getElementById("addBookBtn");
    showHideBtn.addEventListener('click', showHideBookForm);
    const newBookFormBtn = document.getElementById("submitNewBook");
    newBookFormBtn.addEventListener('click', addBookFromForm);
    renderLibrary();
}

function generateTable(data, columns, tableID, parentID) {
    let parent = document.getElementById(parentID);
    let table = document.createElement("table");
    table.setAttribute("id", tableID);
    
    // create and populate table header
    let tHead = document.createElement("thead");
    let headerRow = document.createElement("tr");
    for (let i = 0; i < columns.length; i++) {
        let th = document.createElement("th");
        let cellText = document.createTextNode(columns[i]);
        th.appendChild(cellText);
        headerRow.appendChild(th);
    }
    tHead.appendChild(headerRow);
    table.appendChild(tHead);
    
    
    // create and populate table body
    let tBody = document.createElement("tbody");
    for (let i = 0; i < data.length; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < columns.length; j++) {
            let cell = document.createElement("td");
            let cellText = "";

            if (columns[j] == "mark as read") {
                cellText = document.createTextNode("Toggle Read/Unread");
                cell.className += 'readToggleBtn';
                cell.id = "readToggleBtn_" + i;
                cell.addEventListener("click", toggleRead);
            } else if (columns[j] == "delete") {
                cellText = document.createTextNode("Delete Book");
                cell.className += 'deleteBtn';
                cell.id = "deleteBtn_" + i;
                cell.addEventListener("click", deleteBook);
            } else {
                cellText = document.createTextNode(data[i][columns[j]]);
            }
            
            cell.appendChild(cellText);
            row.appendChild(cell);
        }

        tBody.appendChild(row);
    }
    table.appendChild(tBody);
    
    // add table to parent div
    parent.appendChild(table);
    
}

// toggle visibility of the new book form
function showHideBookForm() {
    let formDiv = document.getElementById("newBookFormDiv");
    formDiv.style.display = formDiv.style.display == "none" ? "block" : "none";
}

// TODO: update this function to take an ID rather than onclick event
// so that it can be called more generally
function deleteBook(e) {
    const removalIndex = e.srcElement.id.split("_")[1];
    myLibrary.splice(removalIndex,1);
    renderLibrary();
}

// TODO: update this function to take an ID rather than onclick event
// so that it can be called more generally
function toggleRead(e) {
    // switch book to read
    const bookID = e.srcElement.id.split("_")[1];
    myLibrary[bookID].read = !myLibrary[bookID].read
    renderLibrary();
}

// seed library with books
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 218, false);
addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("Fahrenheit 451", "Ray Bradbury", 158, true)
addBookToLibrary("Catch-22", "Joseph Heller", 453, true)

initializePage();