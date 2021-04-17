import apiRoutes from '../helpers/apiRoutes';
import fbStorageUploadFile from '../helpers/fbStorageUploadFile';

const articlesService = {
    create: async (data) => {
        if (data.frontPicture?.name || !data.frontPicture.startsWith('https://firebasestorage.googleapis.com/v0/b/fb-storage-upload.appspot.com')) {
            const imageUrl = await fbStorageUploadFile(data.frontPicture, 'articles');
            data.frontPicture = imageUrl;
        }

        return fetch(apiRoutes.article.main, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(data)
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(err => Promise.reject(err))
                }

                return res.json();
            })
    },

    editOne: async (articleId, data) => {
        if (data.frontPicture?.name || !data.frontPicture.startsWith('https://firebasestorage.googleapis.com/v0/b/fb-storage-upload.appspot.com')) {
            const imageUrl = await fbStorageUploadFile(data.frontPicture, 'articles');
            data.frontPicture = imageUrl;
        }

        return fetch(`${apiRoutes.article.main}/${articleId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(data)
        }).then(res => {
            if (!res.ok) {
                return res.json().then(err => Promise.reject(err))
            }

            return 'Update was succssful';
        })
    },

    getHome: () => {
        return fetch(`${apiRoutes.article.main}?home=true`, {
            credentials: "include",
        }).then(res => {
            if (!res.ok) {
                return res.json().then(err => Promise.reject(err))
            }

            return res.json();
        })
    },

    getOne: (articleId) => {
        return fetch(`${apiRoutes.article.main}/${articleId}`, {
            credentials: "include",
        }).then(res => {
            if (!res.ok) {
                return res.json().then(err => Promise.reject(err))
            }

            return res.json();
        })
    },

    getAllByCategory: (categoryId) => {
        return fetch(`${apiRoutes.article.main}?category=${categoryId}`, {
            credentials: "include",
        }).then(res => {
            if (!res.ok) {
                return res.json().then(err => Promise.reject(err))
            }

            return res.json();
        })
    },

    approve: (type, articleId, userId) => {
        return fetch(`${apiRoutes.article.main}/${articleId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({type, userId })
        }).then(res => {
            if (!res.ok) {
                return res.json().then(err => Promise.reject(err))
            }

            return res;
        })
    },

    delete: (articleId) => {
        return fetch(`${apiRoutes.article.main}/${articleId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(err => Promise.reject(err))
                }

                return res.json();
            })
    }
}


export default articlesService;