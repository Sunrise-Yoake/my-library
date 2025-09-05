import { useState } from "react";

function BookForm({ addBook, closeForm }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [year, setYear] = useState("");
  const [read, setRead] = useState(false);
  const [rating, setRating] = useState(0);   // ⭐ рейтинг
  const [notes, setNotes] = useState("");    // ✏️ заметки

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook({
      title,
      author,
      pages: Number(pages),
      year: Number(year),
      read,
      rating,
      notes,
    });
    setTitle("");
    setAuthor("");
    setPages("");
    setYear("");
    setRead(false);
    setRating(0);
    setNotes("");
    closeForm();
  };

  return (
    <form id="book-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label className="form-label">Автор:</label>
        <input
          type="text"
          className="form-input"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Введите автора"
        />
      </div>
      <div className="form-row">
        <label className="form-label">Название:</label>
        <input
          type="text"
          className="form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Введите название"
        />
      </div>
      <div className="form-row">
        <label className="form-label">Страницы:</label>
        <input
          type="number"
          className="form-input"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          placeholder="Введите количество страниц"
        />
      </div>
      <div className="form-row">
        <label className="form-label">Год выхода:</label>
        <input
          type="number"
          className="form-input"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Введите год"
        />
      </div>
      <div className="checkbox-container">
        <label className="checkbox-label">
          Прочитано:
          <input
            type="checkbox"
            checked={read}
            onChange={(e) => setRead(e.target.checked)}
            className="checkbox-input"
          />
          <span className="checkmark"></span>
        </label>
      </div>

      {/* ⭐ Оценка */}
      <div className="form-row">
        <label className="form-label">Оценка:</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="form-input"
        >
          <option value={0}>Нет</option>
          <option value={1}>⭐</option>
          <option value={2}>⭐⭐</option>
          <option value={3}>⭐⭐⭐</option>
          <option value={4}>⭐⭐⭐⭐</option>
          <option value={5}>⭐⭐⭐⭐⭐</option>
        </select>
      </div>

      {/* ✏️ Заметки */}
      <div className="form-row">
        <label className="form-label">Заметки:</label>
        <textarea
          className="form-input"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Ваши мысли о книге..."
        />
      </div>

      <button type="submit" className="submit-btn">Добавить книгу</button>
    </form>
  );
}

export default BookForm;
