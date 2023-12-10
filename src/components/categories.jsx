import React, { useReducer, useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import { useCategories } from '../context/categories.context';
import { createCategory, getCategories } from '../api/categories.api';


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
    const {categories, dispatch} = useCategories();
    const [canAdd, setCanAdd] = useState(false);

    const addCategory = async (category) => {
        await createCategory(category);
        setCanAdd(false);
        const { data } = await getCategories();
        dispatch({
            type: 'load',
            value: data,
        })
    }

    const removeCategory = (category) => {
        dispatch({
            type: 'remove',
            id: category.id,
        });
    }

    const editCategory = (category) => {
        dispatch({
            type: 'edit',
            id: category.id,
        });
    } 

    const saveCategory = (category, newValue) => {
        dispatch({
            type: 'save',
            id: category.id,
            newValue,
        });
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