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

    delete: () => {
        return null;
    }
}


export default articlesService;