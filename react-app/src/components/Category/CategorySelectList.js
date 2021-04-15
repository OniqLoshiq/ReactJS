import { useState, useEffect, useMemo, useCallback, useContext } from 'react';
import categoriesService from '../../services/categoriesService';
import CommonInput from '../FormFields/CommonInput';
import NotificationContext from '../../contexts/notificationContext';
import styled from 'styled-components';

const CategorySelectList = ({ label, name, id }) => {
    const [categories, setCategories] = useState([]);
    const notifications = useContext(NotificationContext);

    const getCategoriesList = useCallback(() => {
        categoriesService.getList()
            .then(res => {
                setCategories(res)
            })
            .catch(err => {
                if (typeof err === "object") {
                    throw err;
                }
                notifications.timeout("danger", err);
            })
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setCategories])

    const renderCategories = useMemo(() => {
        return categories.map(c => {
            return (
                <option key={c._id} value={c._id}>{c.name}</option>
            )
        })
    }, [categories]);

    useEffect(() => {
        getCategoriesList();
    }, [getCategoriesList])

    return (
        <Styles>
            <CommonInput
                label={label}
                type="text"
                name={name}
                id={id}
                as="select"
                custom
            >
                <option value="">Select Category</option>
                {categories.length > 0 ? renderCategories : <option value="" disabled>Loading...</option>}
            </CommonInput>
        </Styles>
    )
}

const Styles = styled.div`
     select {
        border-top: 0;
        border-left: 0;
        border-right: 0;
        border-radius: 0;
        border-bottom: 1px solid blue;
        outline: none;

        &:hover{
        box-shadow: none;
        border-bottom: 2px solid red;
        }
    }
    
`;

export default CategorySelectList;