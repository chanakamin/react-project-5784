import React, { useEffect, useState } from 'react';
import { books } from '../data/books';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCategories } from '../context/categories.context';

export const Books = () => {
    const { id } = useParams();
    const navigator = useNavigate()
    const { categories } = useCategories();
    const [currentCategory, setCurrentCategory] = useState({});

    useEffect(() => {
        const current = categories.find(c => c.id === parseInt(id));
        if (current) {
            setCurrentCategory(current);
        } else {
            // ניווט דרך הקוד
            navigator('/categories');
        }
    }, [id])
    
    return <div>
        <h3>Books of category { currentCategory?.category }:</h3>
        <ul>
            { books
            .filter( book => book.category_id === parseInt(id) )
            .map( book => <li key={book.id} > <Link to={'/book/' + book.id}>{ book.name }</Link> </li>) }
        </ul>
    </div>
}