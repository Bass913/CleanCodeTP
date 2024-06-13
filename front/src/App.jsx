import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './components/Card';

export default function App() {
  const [cards, setCards] = useState([]);

  async function getCards() {
    try {
      const response = await axios.get('http://localhost:8080/cards');
      setCards(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCards();
  }, []);

  return (
    <div className='mx-20 flex gap-10 items-center h-2/4'>
      {cards.map(card => (
        <Card
          key={card._id} // Assuming card has an id
          category={card.category}
          question={card.question}
          tag={card.tag}
        />
      ))}
    </div>
  );
}
