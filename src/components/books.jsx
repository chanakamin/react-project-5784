import React from 'react';
import { books } from '../data/books';
import { useParams, Link } from 'react-router-dom';

export const Books = () => {
    const { id } = useParams();
    
    return <div>
        <h3>Books:</h3>
        <ul>
            { books
            .filter( book => book.category_id === parseInt(id) )
            .map( book => <li key={book.id} > <Link to={'/book/' + book.id}>{ book.name }</Link> </li>) }
        </ul>
    </div>
}