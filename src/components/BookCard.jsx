function BookCard({ book, removeBook, toggleRead }) {
  return (
    <div className="book-card">
      <p><strong>Название:</strong> {book.title}</p>
      <p><strong>Автор:</strong> {book.author}</p>
      <p><strong>Страниц:</strong> {book.pages}</p>
      {book.year && <p><strong>Год:</strong> {book.year}</p>}
      <p><strong>Прочитано:</strong> {book.read ? "Да" : "Нет"}</p>

      {/* ⭐ Оценка */}
      {book.rating > 0 && (
        <p><strong>Оценка:</strong> {"⭐".repeat(book.rating)}</p>
      )}

      {/* ✏️ Заметки */}
      {book.notes && (
        <p><strong>Заметки:</strong> {book.notes}</p>
      )}

      <div className="buttons">
        <button className="remove-btn" onClick={() => removeBook(book.id)}>Удалить</button>
        <button className="toggle-read-btn" onClick={() => toggleRead(book.id)}>Сменить статус</button>
      </div>
    </div>
  );
}

export default BookCard;
