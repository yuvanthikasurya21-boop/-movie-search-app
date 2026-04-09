// Placeholder image to avoid broken links
const placeholderImg = "https://via.placeholder.com/180x270?text=Movie";

// Favorites from localStorage
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// DOM elements
const movieContainer = document.getElementById("movieContainer");
const favoritesContainer = document.getElementById("favoritesContainer");
const randomMovieBtn = document.getElementById("randomMovieBtn");
const sortBtn = document.getElementById("sortBtn");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const languageSelect = document.getElementById("languageSelect");
const themeToggle = document.getElementById("themeToggle");
const modal = document.getElementById("movieModal");
const modalDetails = document.getElementById("modalDetails");
const closeBtn = document.querySelector(".closeBtn");
const genreButtons = document.querySelectorAll(".genre-btn");

// ===== Dark/Light Mode =====
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeToggle.textContent = "🌞 Light Mode";
}
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "🌞 Light Mode";
  } else {
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "🌙 Dark Mode";
  }
});

// ===== Movie Collection =====
let movies = [
  { Title: "Avengers: Endgame", Year: "2019", Genre: "Action, Sci-Fi", Language: "English", imdbRating: "8.4", Poster: placeholderImg },
  { Title: "Inception", Year: "2010", Genre: "Action, Sci-Fi", Language: "English", imdbRating: "8.8", Poster: placeholderImg },
  { Title: "Vikram", Year: "2022", Genre: "Action, Thriller", Language: "Tamil", imdbRating: "8.5", Poster: placeholderImg },
  { Title: "3 Idiots", Year: "2009", Genre: "Comedy, Drama", Language: "Hindi", imdbRating: "8.4", Poster: placeholderImg },
  { Title: "RRR", Year: "2022", Genre: "Action, Drama", Language: "Telugu", imdbRating: "8.1", Poster: placeholderImg },
  { Title: "Soorarai Pottru", Year: "2020", Genre: "Drama", Language: "Tamil", imdbRating: "8.7", Poster: placeholderImg },
  { Title: "Parasite", Year: "2019", Genre: "Thriller, Drama", Language: "English", imdbRating: "8.6", Poster: placeholderImg }
];

// ===== Display Movies =====
function displayMovies(movieList) {
  movieContainer.innerHTML = "";
  movieList.forEach(movie => {
    const div = document.createElement("div");
    div.classList.add("movieCard");
    div.innerHTML = `
      <img src="${movie.Poster}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <p><strong>Year:</strong> ${movie.Year}</p>
      <p><strong>Genre:</strong> ${movie.Genre}</p>
      <p><strong>Language:</strong> ${movie.Language}</p>
      <p><strong>Rating:</strong> ${movie.imdbRating}</p>
      <button class="fav-btn">❤️ Favorite</button>
      <button class="details-btn">ℹ️ Details</button>
    `;
    movieContainer.appendChild(div);

    // Favorite Button
    div.querySelector(".fav-btn").addEventListener("click", () => addFavorite(movie));

    // Details Button (Modal)
    div.querySelector(".details-btn").addEventListener("click", () => showDetails(movie));
  });
}

// ===== Display Favorites =====
function displayFavorites() {
  favoritesContainer.innerHTML = "";
  favorites.forEach(movie => {
    const div = document.createElement("div");
    div.classList.add("movieCard");
    div.innerHTML = `
      <img src="${movie.Poster}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <p><strong>Rating:</strong> ${movie.imdbRating}</p>
      <button class="remove-btn">❌ Remove</button>
    `;
    favoritesContainer.appendChild(div);

    // Remove Button
    div.querySelector(".remove-btn").addEventListener("click", () => removeFavorite(movie));
  });
}

// ===== Add/Remove Favorites =====
function addFavorite(movie) {
  if (!favorites.some(fav => fav.Title === movie.Title)) {
    favorites.push(movie);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    displayFavorites();
  } else {
    alert("Already in favorites!");
  }
}

function removeFavorite(movie) {
  favorites = favorites.filter(fav => fav.Title !== movie.Title);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  displayFavorites();
}

// ===== Random Movie =====
randomMovieBtn.addEventListener("click", () => {
  const random = movies[Math.floor(Math.random() * movies.length)];
  displayMovies([random]);
});

// ===== Sort by Rating =====
sortBtn.addEventListener("click", () => {
  const sorted = [...movies].sort((a, b) => b.imdbRating - a.imdbRating);
  displayMovies(sorted);
});

// ===== Search =====
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.toLowerCase().trim();
  if (!query) return;
  const result = movies.filter(movie => movie.Title.toLowerCase().includes(query));
  displayMovies(result);
  searchInput.value = ""; // clear after search
});

// ===== Filter by Language =====
languageSelect.addEventListener("change", () => {
  const lang = languageSelect.value;
  if (lang === "all") displayMovies(movies);
  else displayMovies(movies.filter(m => m.Language === lang));
});

// ===== Filter by Genre =====
genreButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const genre = btn.dataset.genre;
    displayMovies(movies.filter(m => m.Genre.includes(genre)));
  });
});

// ===== Modal Functions =====
function showDetails(movie) {
  modalDetails.innerHTML = `
    <h2>${movie.Title}</h2>
    <img src="${movie.Poster}" alt="${movie.Title}">
    <p><strong>Year:</strong> ${movie.Year}</p>
    <p><strong>Genre:</strong> ${movie.Genre}</p>
    <p><strong>Language:</strong> ${movie.Language}</p>
    <p><strong>Rating:</strong> ${movie.imdbRating}</p>
  `;
  modal.style.display = "flex";
}

closeBtn.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", e => { if (e.target === modal) modal.style.display = "none"; });

// ===== Initial Display =====
displayMovies(movies);
displayFavorites();
