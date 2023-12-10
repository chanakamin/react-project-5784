// מקבל את הערך המקורי והאוביקט של הפעולה, וצריך להחזיר את הערך החדש
export const categoryReducer = (categories, action) => {
    const { type } = action;
    switch (type) {
        case 'load':
            return action.value
        case 'add':
            return [
                ...categories,
                {
                    category: action.newCategory,
                    id:  categories[categories.length -1].id + 1,
                }
            ];
        case 'remove':
            return categories.filter(c => c.id !== action.id)
        case 'edit':
            return categories.map(category => {
                if (category.id === action.id) {
                    return {
                        ...category,
                        edit: true,
                    }
                }
                return category;
            });
        
        case 'save':
            return categories.map(category => {
                if (category.id === action.id) {
                    return {
                        ...category,
                        edit: false,
                        category: action.newValue,
                    }
                }
                return category;
            })
    
        default:
            return categories;
    }
}