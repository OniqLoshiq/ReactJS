import { useState, useEffect, useCallback, useContext } from 'react';
import FeaturedCarousel from '../Article/FeaturedCarousel';
import LatestCarousel from '../Article/LatestCarousel';
import articlesService from '../../services/articlesService'
import NotificationContext from '../../contexts/notificationContext';

const Home = () => {
    const [articles, setArticles] = useState({});
    const notifications = useContext(NotificationContext);

    const getArticles = useCallback(() => {
        articlesService.getHome()
            .then(res => {
                setArticles(res)
            })
            .catch(err => {
                if (typeof err === "object") {
                    throw err;
                }
                notifications.timeout("danger", err);
            })
        // eslint-disable-next-line
    }, [setArticles]);

    useEffect(() => {
        getArticles();
    }, [getArticles])

    return (
        <>
            {
                articles.featured?.length > 0 ?
                    (
                        <>
                            <FeaturedCarousel articles={articles.featured} />
                            <LatestCarousel articles={articles.latest} />
                        </>
                    ) : null
            }
        </>
    )
}

export default Home;