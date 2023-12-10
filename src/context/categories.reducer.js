// מקבל את הערך המקורי והאוביקט של הפעולה, וצריך להחזיר את הערך החדש
export const categoryReducer = (categories, action) => {
    const { type } = action;
    switch (type) {
        case 'load':
            return action.value
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
        default:
            return categories;
    }
}