import React, { useEffect, useState } from 'react';
import { categories } from '../data/categories';

export const CategoryContext = React.createContext();

export const CategoriesContext = (params) => {
    const [_categories, setCategories] = useState(categories);

    useEffect(() => {
        // load data from server
    }, [])
    const addCategory = (category) => {
        // hhtp request
        category.id = _categories[_categories.length -1].id + 1;
        setCategories([...categories, category]);
    }

    const contextValue = {
        categories: _categories,
        addCategory,
    }
    return <CategoryContext.Provider value={contextValue} >
        { params.children }
    </CategoryContext.Provider>
}