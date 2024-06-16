import { useState, useEffect } from 'react';
import apiService from './services/apiService';
import Card from './components/Card';
import Datepicker from "react-tailwindcss-datepicker";

export default function App() {
  const [value, setValue] = useState({
    startDate: new Date().toISOString().split('T')[0]
  });

  const [cards, setCards] = useState([]);

  async function getQuizzCards(date) {
    try {
      const response = await apiService.getQuizzCards(date);
      setCards(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleValueChange = newValue => {
    setValue(newValue);
  };

  useEffect(() => {
    getQuizzCards(value.startDate);
  }, [value]);

  return (
    <>
      <div className='w-1/4 mt-10 m-auto'>
        <h1>Sélectionner une date :</h1>
        <Datepicker
          value={value}
          onChange={handleValueChange}
          asSingle={true}
          useRange={false}
        />
      </div>
      <div className='mx-20 flex gap-10 items-center h-2/4'>
        {cards.map(card => (
          <Card
            key={card._id} // Assuming card has an id
            category={card.category}
            question={card.question}
            tag={card.tag}
            actualAnswer={card.answer}
            cardId={card._id}
          />
        ))}
      </div>
    </>

  );
}
