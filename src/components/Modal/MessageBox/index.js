import "./styles.css";

export default function MessageBox({ message, position = "right", date }) {
  const dateMessage = new Date(date).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "2-digit",
    year: "2-digit",
  });

  return (
    <div className={`message-container message-${position}`}>
      <div className="message-box">
        <p>{message}</p>
        <footer>
          <p className="message-date">{dateMessage}</p>
        </footer>
      </div>
    </div>
  );
}
