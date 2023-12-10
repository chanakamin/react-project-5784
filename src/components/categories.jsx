import React, { useContext, useReducer, useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import { CategoryContext } from '../context/categories.context';
import { categories as initialCategories } from '../data/categories';
import { categoryReducer } from './categories.reducer';


const AddCategory = ({ add }) => {
    const [newCategory, setNewCategory] = useState('');

    const addCategory = (e) => {
        e.preventDefault();
        add(newCategory);
    }

    return <form onSubmit={(e) => addCategory(e)}>
        <label>new category:</label> <input type="text" value={newCategory} onChange={e => setNewCategory(e.target.value)}/> <br />
        <button>Add</button>
    </form>
}


export const Categories = () => {
    // const { categories, addCategory } = useContext(CategoryContext)

    // const [categories, setCategories] = useState(initialCategories);

    // useReducer - יוצר משתנה מסוג state
    // עם פונקצית reducer
    // שכל השינויים במתשנה יקראו רק בפונקציה זו
    // פונקציה הרדיוסר תיקרא ע"י קריאה לפונקציה dispatch
    // שמטרתה להודיע שקרה משהו
    const [categories, dispatch] = useReducer(categoryReducer, initialCategories);
    const [canAdd, setCanAdd] = useState(false);

    const addCategory = (category => {
        // הודעה על הוספה
        // הפונקציה מקבלת action - 
        // אוביקט פעולה שמתאר מה קרה
        dispatch({
            type: 'add',
            newCategory: category,
        })
        setCanAdd(false);
    })

    const removeCategory = (category) => {
        dispatch({
            type: 'remove',
            id: category.id,
        })
        // const newCategories = categories.filter(c => c.id !== category.id);
        // setCategories(newCategories);
    }

    const editCategory = (category) => {
        dispatch({
            type: 'edit',
            id: category.id,
        })

        // const newCategory = {
        //     ...category,
        //     edit: true,
        // };
        // // שכפול של המערך
        // const newCategories = [...categories];
        // // מציאת האינדקס של הקטגוריה
        // const index = newCategories.findIndex(c => c.id === category.id);
        // // newCategories[index] = newCategory;
        // newCategories.splice(index, 1, newCategory);
        // setCategories(newCategories);
    } 

    const saveCategory = (category, newValue) => {
        dispatch({
            type: 'save',
            id: category.id,
            newValue,
        })
        // const newCategory = {
        //     ...category,
        //     edit: false,
        //     category: newValue,
        // };
        // // שכפול של המערך
        // const newCategories = [...categories];
        // // מציאת האינדקס של הקטגוריה
        // const index = newCategories.findIndex(c => c.id === category.id);
        // // newCategories[index] = newCategory;
        // newCategories.splice(index, 1, newCategory);
        // setCategories(newCategories);
    } 

    return <div>
        { !canAdd && <button onClick={() => setCanAdd(!canAdd)}>
            Add Category
        </button> }

        { canAdd && <AddCategory add={addCategory}/> }
        <ul>
            { categories.map(category => <li key={category.id}>
                { category.edit && <input onBlur={e => saveCategory(category, e.target.value)} defaultValue={category.category} /> }
                { !category.edit && <Link to={'/categories/' + category.id}> {category.category} </Link> }
                 <button onClick={() => removeCategory(category)}>X</button>
                 <button onClick={() => editCategory(category)}>E</button>
            </li>) }
        </ul>
        <div>
            
            <Outlet />
        </div>
    </div>
}