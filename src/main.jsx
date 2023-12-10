import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// טעינת המודולים של של הניווט
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Categories } from './components/categories.jsx';
import { Book } from './components/book.jsx';
import { Main } from './components/main.jsx';
import { Books } from './components/books.jsx';
import { UserContext } from './context/use.context';

const user = [{name: 'aaa',id:1},{name: 'עכג',id:2}]

// אוביקט קונפיגורציה שמגדיר את הגדרות הניווט - על כל כתובת איזה תוכן יוצג בה
const router = createBrowserRouter([
  {
    path: "/",
    // element: <div>Hello world!</div>,
    Component: App,
    children: [{
      path: 'categories',
      Component: Categories,
      children: [{
        // חלק שמשתנה. כל פעם יהיה מזהה אחר
        path: ':id',
        Component: Books,
      }]
    }, {
      path: 'book/:bookId',
      Component: Book,
    }, {
      path: '',
      Component: Main,
    }],
    errorElement: <p> oops :( not exists... </p>,
  }, 
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* הוספת נתונים לקונטקסט - שימוש בקונטקסט
      Provider - קונפוננטה עוטפת ששומרת נתונים, שאליהם ניתן לגשת מכל רמת קינון שהיא עוטפת
      בדוגמא זו שלחנו נתוני יוזר
    */}
    <UserContext.Provider value={user}>
       <RouterProvider router={router} />
    </UserContext.Provider>
   
  </React.StrictMode>,
)

// https://reactrouter.com/en/main/start/tutorial
