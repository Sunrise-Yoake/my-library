import { useState, useEffect } from "react";
import BookForm from "./components/BookForm";
import BookCard from "./components/BookCard";
import "./App.css";

function App() {
  const [library, setLibrary] = useState(() => {
    const saved = localStorage.getItem("myLibrary");
    return saved ? JSON.parse(saved) : [
      { id: crypto.randomUUID(), title: "1984", author: "Джордж Оруэлл", pages: 328, year: 1949, read: true },
      { id: crypto.randomUUID(), title: "Мастер и Маргарита", author: "Михаил Булгаков", pages: 470, year: 1967, read: false }
    ];
  });

  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("title"); // new

  useEffect(() => {
    localStorage.setItem("myLibrary", JSON.stringify(library));
  }, [library]);

  const addBook = (book) => {
    setLibrary([...library, { ...book, id: crypto.randomUUID() }]);
  };

  const removeBook = (id) => {
    setLibrary(library.filter(book => book.id !== id));
  };

  const toggleRead = (id) => {
    setLibrary(library.map(book =>
      book.id === id ? { ...book, read: !book.read } : book
    ));
  };

  // Фильтрация + поиск
  let filteredBooks = library.filter(book => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "read" && book.read) ||
      (filter === "unread" && !book.read);
    return matchesSearch && matchesFilter;
  });

  // 🔹 Сортировка
  filteredBooks.sort((a, b) => {
    if (sortBy === "title") return a.title.localeCompare(b.title);
    if (sortBy === "author") return a.author.localeCompare(b.author);
    if (sortBy === "year") return (a.year || 0) - (b.year || 0);
    if (sortBy === "pages") return (a.pages || 0) - (b.pages || 0);
    return 0;
  });

  const totalBooks = library.length;
  const readBooks = library.filter(book => book.read).length;
  const progress = totalBooks > 0 ? Math.round((readBooks / totalBooks) * 100) : 0;

  return (
    <div className="container">
      <h1>Моя Библиотека</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Поиск по названию или автору..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-input"
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="form-input">
          <option value="all">Все книги</option>
          <option value="read">Прочитанные</option>
          <option value="unread">Непрочитанные</option>
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="form-input">
          <option value="title">Сортировать по названию</option>
          <option value="author">Сортировать по автору</option>
          <option value="year">Сортировать по году выхода</option>
          <option value="pages">Сортировать по страницам</option>
        </select>
      </div>

      <p><strong>Прогресс:</strong> {readBooks}/{totalBooks} книг ({progress}%)</p>

      <button id="new-book-btn" onClick={() => setShowForm(!showForm)}>
        Новая книга
      </button>

      {showForm && <BookForm addBook={addBook} closeForm={() => setShowForm(false)} />}

      <div className="books-grid">
        {filteredBooks.map(book => (
          <BookCard
            key={book.id}
            book={book}
            removeBook={removeBook}
            toggleRead={toggleRead}
          />
        ))}
        {filteredBooks.length === 0 && <p>Нет книг по запросу</p>}
      </div>
    </div>
  );
}

export default App;
