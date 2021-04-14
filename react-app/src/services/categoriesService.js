import apiRoutes from '../helpers/apiRoutes';
import fbStorageUploadFile from '../helpers/fbStorageUploadFile';

const categoriesService = {
    create: async (data) => {
        if (data.picture?.name || !data.picture.startsWith('https://firebasestorage.googleapis.com/v0/b/fb-storage-upload.appspot.com')) {
            const imageUrl = await fbStorageUploadFile(data.picture, 'categories');
            data.picture = imageUrl;
        }

        return fetch(apiRoutes.category.main, {
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

    getAll: () => {
        return fetch(apiRoutes.category.main, {
            credentials: "include"
        })
        .then(res => {
            if (!res.ok) {
                return res.text().then(text => Promise.reject(text));
            }
            return res.json()})
    },

    getOne: (categoryId) => {
        return fetch(`${apiRoutes.category.main}/${categoryId}`, {
            credentials: "include"
        })
        .then(res => {
            if (!res.ok) {
                return res.text().then(text => Promise.reject(text));
            }
            return res.json()})
    },

    getList: () => {
        return fetch(apiRoutes.category.list, {
            credentials: "include"
        })
        .then(res => {
            if (!res.ok) {
                return res.text().then(text => Promise.reject(text));
            }
            return res.json()})
    },

    update: (categoryId, data) => {
        return fetch(`${apiRoutes.category.main}/${categoryId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(data)
        })
        .then(res => {
            if (!res.ok) {
                return res.text().then(text => Promise.reject(text));
            }
            return res.json()})
    }
}


export default categoriesService;