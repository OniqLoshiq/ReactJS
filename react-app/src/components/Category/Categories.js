import { useState, useEffect, useCallback, useMemo } from 'react';
import categoriesService from '../../services/categoriesService';
import ListCard from './ListCard';

const Categories = () => {
    const [categories, setCategories] = useState([]);

    const getCategories = useCallback(() => {
        categoriesService.getAll()
                .then(res => {
                    setCategories(res)
                })
                .catch(err => {
                    throw err;
                })
    },[setCategories]);

    const renderCategories = useMemo(() => {
        return categories.map(c => {
            return (
                <ListCard 
                    key={c.id}
                    id={c.id}
                    name={c.name}
                    description={c.description}
                    picture={c.picture}
                    articles={c.articlesCount}
                />
            )
        })
    }, [categories]);

    useEffect(() => {
        getCategories()
    }, [getCategories]);

    return (
        <>
            {categories.length > 0 ? renderCategories : <div>No categories found</div>}
        </>
    );
}

export default Categories;