const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const favoritesList = document.getElementById('favorites-list');
const favoritesSection = document.querySelector('.favorites-section');
const booksContainer = document.getElementById('books-container');
const favoritesContainer = document.getElementById('favorites-container');
const favoritesCount = document.getElementById('favorites-count');
const filterSection = document.querySelector('.filter-section')
// Variables for pagination
let currentPage = 1;
const booksPerPage = 3;
// Function to create pagination buttons
function setupPagination(items) {
    const totalPages = Math.ceil(items.length / booksPerPage);
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ''; // Clear previous pagination

    // Create pagination buttons
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.classList.add('page-btn');
        if (i === currentPage) pageButton.classList.add('active');

        pageButton.addEventListener('click', () => {
            currentPage = i;
            displayBooks(books, currentPage);
        });

        paginationContainer.appendChild(pageButton);
    }
}

// Toggle navbar links on burger click
burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Retrieve favorites from local storage or initialize empty array
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Book data
const books = [
    { title: "Book One", author: "author 1", language: "English", genre: "Fiction", price: "100$", image: "1.jpg" },
    { title: "Book Two", author: "author 2", language: "French", genre: "Non-Fiction", price: "200$", image: "2.jpg" },
    { title: "Book Three", author: "author 3", language: "Spanish", genre: "Fiction", price: "100$", image: "3.jpg" },
    { title: "Book Four", author: "author 4", language: "English", genre: "Non-Fiction", price: "100$", image: "4.jpg" },
    { title: "Book Five", author: "author 5", language: "English", genre: "Non-Fiction", price: "100$", image: "5.jpg" },
    { title: "Book Six", author: "author 6", language: "French", genre: "Non-Fiction", price: "100$", image: "6.jpg" },
    { title: "Book Seven", author: "author 7", language: "French", genre: "Fiction", price: "100$", image: "7.jpg" },
    { title: "Book Eight", author: "author 8", language: "English", genre: "Fiction", price: "100$", image: "8.jpg" },
    { title: "Book Nine", author: "author 9", language: "English", genre: "Non-Fiction", price: "300$", image: "9.jpg" },
    { title: "Book Ten", author: "author 10", language: "French", genre: "Fiction", price: "200$", image: "10.jpg" },
    { title: "Book Eleven", author: "author 11", language: "English", genre: "Non-Fiction", price: "200$", image: "11.jpg" },
    { title: "Book Twelve", author: "author 12", language: "English", genre: "Non-Fiction", price: "300$", image: "12.jpg" },
    { title: "Book Thirteen", author: "author 13", language: "English", genre: "Non-Fiction", price: "200$", image: "13.jpg" },
    { title: "Book Fourteen", author: "author 14", language: "English", genre: "Fiction", price: "300$", image: "14.jpg" },
    { title: "Book Fifteen", author: "author 15", language: "Spanish", genre: "Non-Fiction", price: "200$", image: "15.jpg" },
    { title: "Book Sixteen", author: "author 16", language: "English", genre: "Non-Fiction", price: "200$", image: "16.jpg" },
    { title: "Book Seventeen", author: "author 17", language: "English", genre: "Fiction", price: "400$", image: "17.png" },
    { title: "Book Eighteen", author: "author 18", language: "Spanish", genre: "Non-Fiction", price: "400$", image: "18.jpg" }

];

// Display all books on page load
// Initial display of books and favorites
displayBooks(books, currentPage);
updateFavoritesCount(); // Update favorites count on initial load


// Function to display books with pagination
function displayBooks(filteredBooks, page = 1) {
    booksContainer.innerHTML = ''; // Clear previous books
    const startIndex = (page - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

    paginatedBooks.forEach(book => {
        const bookCard = `
            <div class="book-card">
                <img src="./assets/images/${book.image}" alt="${book.title}">
                <div class="overlay">
                    <div class="book-title">${book.title}</div>
                    <div class="book-author">Author: ${book.author}</div>
                    <div class="book-genre">Genre: ${book.genre}</div>
                    <div class="book-language">Language: ${book.language}</div>
                    <div class="book-price">Price: ${book.price}</div>
                    <button class="add-to-favorites" data-title="${book.title}">Add to Favorites</button>
                </div>
            </div>
        `;
        booksContainer.innerHTML += bookCard;
    });

    // Add event listeners to "Add to Favorites" buttons
    document.querySelectorAll('.add-to-favorites').forEach(button => {
        button.addEventListener('click', addToFavorites);
    });
    //show pagination when displaying all books
    document.getElementById('pagination').style.display = 'block';
    setupPagination(filteredBooks);
}


// Function to add book to favorites
function addToFavorites(event) {
    const bookTitle = event.target.getAttribute('data-title');
    const selectedBook = books.find(book => book.title === bookTitle);

    if (!favorites.some(book => book.title === bookTitle)) {
        favorites.push(selectedBook);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`${bookTitle} has been added to your favorites!`);
    } else {
        alert(`${bookTitle} is already in your favorites!`);
    }
    displayBooks(books, currentPage); // Refresh the favorites display
    updateFavoritesCount();
}


// Toggle favorites section on "Favorites" link click
document.getElementById('view-favorites').addEventListener('click', () => {
    booksContainer.parentElement.style.display = 'none'; // Hide books section
    filterSection.style.display = 'none'; //hide filter section
    favoritesSection.style.display = 'block'; // Show favorites section
    displayFavorites();

});

// Function to remove book from favorites
function removeFromFavorites(event) {
    const bookTitle = event.target.getAttribute('data-title');
    favorites = favorites.filter(book => book.title !== bookTitle);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoritesCount(); // Update count when a book is removed
    alert(`${bookTitle} has been removed from your favorites!`);

    displayFavorites(); // Refresh the favorites display
}

// Function to display favorites
function displayFavorites() {
    favoritesContainer.innerHTML = ''; // Clear previous content
    if (favorites.length === 0) {
        favoritesContainer.innerHTML = '<p>No favourite books is yet selected.</p>';
    } else {
        favorites.forEach(book => {
            const bookCard = `
                <div class="book-card">
                    <img src="./assets/images/${book.image}" alt="${book.title}">
                    <div class="overlay">
                        <div class="book-title">${book.title}</div>
                        <div class="book-author">Author: ${book.author}</div>
                        <div class="book-genre">Genre: ${book.genre}</div>
                        <div class="book-language">Language: ${book.language}</div>
                        <div class="book-price">Price: ${book.price}</div>
                        <button class="remove-from-favorites" data-title="${book.title}">Remove from Favorites</button>
                    </div>
                </div>
            `;
            favoritesContainer.innerHTML += bookCard;
        });

        // Add event listeners to "Remove from Favorites" buttons
        document.querySelectorAll('.remove-from-favorites').forEach(button => {
            button.addEventListener('click', removeFromFavorites);
        });
    }
    //hide pagination when displaying favourites
    document.getElementById('pagination').style.display = 'none';
}

// Function to update the count of favorites in the navbar
function updateFavoritesCount() {
    favoritesCount.textContent = favorites.length;


}


// Function to filter books
function filterBooks() {
    const authorFilter = document.getElementById('author').value;
    const genreFilter = document.getElementById('genre').value;
    const languageFilter = document.getElementById('language').value;
    const priceFilter = document.getElementById('price').value;

    const filteredBooks = books.filter(book => {
        return (
            (authorFilter === '' || book.author === authorFilter) &&
            (genreFilter === '' || book.genre === genreFilter) &&
            (languageFilter === '' || book.language === languageFilter) &&
            (priceFilter === '' || book.price === priceFilter)
        );
    });

    displayBooks(filteredBooks);
}

// Event listener for filter button
document.getElementById('filter-btn').addEventListener('click', filterBooks);

// Display all books on page load
displayBooks(books);


/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)
