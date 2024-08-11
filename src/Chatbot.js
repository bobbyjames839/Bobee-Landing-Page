import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaComments, FaTimes, FaUser, FaRobot } from 'react-icons/fa';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const isRelevantQuestion = (message) => {
    const relevantKeywords = [
      'bobee',
      'cleaning',
      'services',
      'pricing',
      'subscription',
      'home',
      'office',
      'cleaner',
      'hiring',
      'quality',
      'service',
    ];

    return relevantKeywords.some((keyword) =>
      message.toLowerCase().includes(keyword)
    );
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    
    if (!isRelevantQuestion(input)) {
      const botMessage = {
        role: 'assistant',
        content: "I'm here to help with questions about Bobee and cleaning services. Please ask something related to those topics!",
      };
      setMessages([...newMessages, botMessage]);
      return;
    }

    setIsTyping(true);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: generateSystemMessage() },  // System message to guide the bot
            ...newMessages,
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const botMessage = {
        role: 'assistant',
        content: response.data.choices[0].message.content,
      };
      setMessages([...newMessages, botMessage]);
    } catch (error) {
      console.error('Error communicating with OpenAI API:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const generateSystemMessage = () => {
    return `
      You are a support bot for Bobee, a company that offers on-demand cleaning services.
      Your task is to assist customers with inquiries about Bobee's services, mission, pricing, and general cleaning topics.
      If the customer asks about anything unrelated to Bobee or cleaning or something similar, politely inform them that you can only assist with Bobee-related or cleaning-related queries.
    `;
  };

  return (
    <>
      {isOpen && (
        <div className="chatbot">
          <div className="chatbot_top">
            <div className="chatbot_top_left">
              <span className="bot_icon_top">
                <FaRobot className="bot_icon_top_inner" />
              </span>
              <div className="chatbot_top_left_inner">
                <p className="chatbot_title">Support Bot</p>
                <p className="online">Online</p>
              </div>
            </div>
            <button className="chatbot_button" onClick={toggleChatbot}>
              <FaTimes size={24} />
            </button>
          </div>

          <div className="chatbot_messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chatbot_message ${msg.role}`}>
                <div
                  className={`chatbot_message_top ${
                    msg.role === 'user' ? 'user_top' : 'bot_top'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <>
                      <span className="message_icon_user_outer">
                        <FaUser size={10} className="message_icon user_small_icon" />
                      </span>
                      <p className="message_user_text">Customer</p>
                    </>
                  ) : (
                    <>
                      <p className="message_user_text">Assistant</p>
                      <span className="message_icon_assistant_outer">
                        <FaRobot size={10} className="message_icon robot_small_icon" />
                      </span>
                    </>
                  )}
                </div>

                <div
                  className={`chatbot_message_bottom ${
                    msg.role === 'user' ? 'user_bottom' : 'bot_bottom'
                  }`}
                >
                  <p>{msg.content}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="chatbot_typing_indicator">
                <p>Assistant is typing...</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot_input_outer">
            <input
              className="chatbot_input"
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Speak to Bobee"
            />
            <button className="send_button" onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      )}
      {!isOpen && (
        <button className="chatbot_toggle" onClick={toggleChatbot}>
          <FaComments size={27} />
        </button>
      )}
    </>
  );
};

export default Chatbot;
