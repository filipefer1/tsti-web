import "./styles.css";

export default function MessageBox({
  message,
  position = "right",
  date,
  clientOrDevName,
}) {
  const dateMessage = new Date(date).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "2-digit",
    year: "2-digit",
  });

  return (
    <div className={`message-container message-${position}`}>
      <div className="message-box">
        <div className="message-clientName">
          <p>{message}</p>
          <p className="message-name">{clientOrDevName}</p>
        </div>
        <footer>
          <p className="message-date">{dateMessage}</p>
        </footer>
      </div>
    </div>
  );
}
