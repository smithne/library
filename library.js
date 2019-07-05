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

function renderLibrary() {
    let tableID = "libraryTable";
    let columns = ["title", "author", "pages", "read"];
    let containerID = "bookList"
    generateTable(myLibrary, columns, tableID, containerID);
    
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
            let cellText = document.createTextNode(data[i][columns[j]]);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        
        tBody.appendChild(row);
    }
    table.appendChild(tBody);
    
    // add table to parent div
    parent.appendChild(table);
    
}

function generateTHead(tableID, columns) {
    
}

console.log(myLibrary);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 218, true);
console.log(myLibrary);
renderLibrary();