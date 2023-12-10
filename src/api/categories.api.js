import axios from 'axios';
// קובץ זה מכיל את כל קריאות השרת עבור קטגוריות

// שליפה של כל הרשימה
export const getCategories = () => {
    return axios.get('http://localhost:3000/categories');
}

// מחיקה
export const deleteCategory = (id) => {
    return axios.delete(`http://localhost:3000/categories/${id}`);
}

// עדכון
export const updateCategory = (id, categoryName) => {
    return axios.put(`http://localhost:3000/categories/${id}`, {
        categoryName,
    });
}

// יצירה
export const createCategory = (categoryName) => {
    return axios.post(`http://localhost:3000/categories`, {
        categoryName,
    });
}