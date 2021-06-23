import { FiMessageSquare } from "react-icons/fi";

import "./styles.css";

export default function ButtonOpenChat({ ...rest }) {
  return (
    <button className="open-button-chat" {...rest}>
      <FiMessageSquare size={24} />
    </button>
  );
}
