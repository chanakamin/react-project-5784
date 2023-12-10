import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";


export const Book = () => {
    const { bookId } = useParams();
    useEffect(() => {
        // here take matched book
    }, [bookId])
    return <div>
        <h2> Details for book: { bookId } </h2>
    </div>
}