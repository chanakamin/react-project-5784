import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Outlet, Link } from "react-router-dom";
import { getWord } from './api';
import './App.css'
import { UserContext } from './context/use.context';
import { CategoriesContext } from './context/categories.context';

function App() {
  const [wordDefinition, setWordDefinition] = useState();
  const [word, setWord] = useState('Hello');
  // שליפת נתונים מקונטקסט
  // useContext - האפשרות לשלוף נתונים מהקונטקסט, מקבל את שם הקונטקסט שאת נתוניו שולפים
  const user = useContext( UserContext)

  useEffect(() => {

    const fetchHello = async () => {
      try {
        const { data } = await getWord(word);
        const wordMeaning = data[0].meanings[0].definitions[0].definition;
        setWordDefinition(wordMeaning);
      } catch (error) {
        const { response } = error;
        if (response.status === 404) {
          setWordDefinition('Word doesn\'t exists');
        } else {
          setWordDefinition('an error occured');
        }
      }
      
    }
    fetchHello();
  }, [word]);

  return (
    <>
      <header>
        <h1>Welcome to library! {user[0].name}  </h1>
        <h2>{word}: { wordDefinition }</h2>
        <input type="text" onBlur={e => setWord(e.target.value)} defaultValue={word}/>
      </header>
      <nav>
        <ul>
          <li>
            <Link to={''}>main</Link>            
          </li>
          <li>
            {/* יצירת קישור */}
            <Link to={'categories'}>categories</Link>
            
          </li>
        </ul>
      </nav>
      <CategoriesContext>
          <div>
          {/* לכאן יכנס התוכן של הניווט */}
          <Outlet />
        </div>
      </CategoriesContext>
      
    </>
  )
}

export default App
