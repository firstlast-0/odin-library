const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
      return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
    };
}

let book1 = new Book('book1', 'auth1', 1, 'read');
let book2 = new Book('book2', 'auth2', 2, 'not yet read');
addBookToLibrary(book1);
addBookToLibrary(book2);

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayLibrary(library) {
    let table = document.querySelector('table');
    for (let i = 0; i < library.length; i++) {        
        let book = document.createElement('tr');
        for (let key in library[i]) {
            if (typeof library[i][key] == 'function') continue;
            let entry = document.createElement('td');
            entry.textContent = library[i][key];
            book.appendChild(entry);
        }
        table.appendChild(book);
    }    
}
displayLibrary(myLibrary);