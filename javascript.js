const myLibrary = [];
let table = document.querySelector('tbody');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
      return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
    };
}

Book.prototype.toggle = function() {
  this.read = (this.read == 'Read') ? 'Not Yet Read' : 'Read';
  table.replaceChildren();
  displayLibrary(myLibrary);
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayLibrary(library) {
    for (let i = 0; i < library.length; i++) {        
        let book = document.createElement('tr');

        book.setAttribute('data-index', i);
        let del = document.createElement('button');
        del.textContent = 'Delete';
        del.addEventListener('click', () => {
          table.removeChild(book);
          myLibrary.splice(i, 1);
        });

        let tog = document.createElement('button');
        tog.textContent = 'Toggle';
        tog.addEventListener('click', () => {
          library[i].toggle();
        });

        for (let key in library[i]) {
            if (typeof library[i][key] == 'function') continue;
            let entry = document.createElement('td');
            entry.textContent = library[i][key];
            book.appendChild(entry);                    
        }
        book.appendChild(tog);
        book.appendChild(del);
        table.appendChild(book);
    }    
}
displayLibrary(myLibrary);

let dialog = document.querySelector('dialog');
let newBook = document.querySelector('dialog + button');
let submit = document.querySelector('#sub');
let close = document.querySelector('#can');

newBook.addEventListener("click", () => {
  dialog.showModal();
});

close.addEventListener("click", () => {
  dialog.close();
});

submit.addEventListener("click", (event) => {
  event.preventDefault();
  let title = document.querySelector('#title').value;
  let author = document.querySelector('#author').value;
  let pages = document.querySelector("input[type='number']").value;
  let read = (document.querySelector('#read').checked) ? 'Read' : 'Not Yet Read';

  let book = new Book(title, author, pages, read);
  addBookToLibrary(book);
  table.replaceChildren();
  displayLibrary(myLibrary);
  dialog.close();
});