import { useState, createContext, useContext, useCallback } from "react";

export const ChatModalContext = createContext({});

export default function ChatModalProvider({ children }) {
  const [showModal, setShowModal] = useState(false);
  const [messages, setMessages] = useState([]);

  const toggleModal = useCallback(() => {
    setShowModal(showModal ? false : true);
  }, [showModal]);

  return (
    <ChatModalContext.Provider
      value={{ toggleModal, showModal, messages, setMessages }}
    >
      {children}
    </ChatModalContext.Provider>
  );
}

export const useChatModal = () => {
  const context = useContext(ChatModalContext);

  if (!context)
    throw new Error("useChatModal must be used within a ChatModalProvider");

  return { ...context };
};
