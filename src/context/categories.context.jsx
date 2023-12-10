import React, { useEffect, useReducer, useContext } from 'react';
import { getCategories } from '../api/categories.api';
import { categoryReducer } from './categories.reducer';

const CategoryContext = React.createContext();

// custom hook - יצירה של פונקצית הוק, שמחזירה את הקונטקסט של הקטגוריות
export const useCategories = () => useContext(CategoryContext);



export const CategoriesProvider = (params) => {
    const [categories, dispatch] = useReducer(categoryReducer, []);

    const loadCategories = async () => {
        const { data } = await getCategories();
        dispatch({
            type: 'load',
            value: data,
        })
    }

    useEffect(() => {
       loadCategories();
    }, []);

    const value = {
        categories,
        dispatch,
    };
    
    return <CategoryContext.Provider value={value} >
        {/* מכיל את החלק שנשלח בתוך הקומפוננטה */}
        { params.children }
    </CategoryContext.Provider>
}