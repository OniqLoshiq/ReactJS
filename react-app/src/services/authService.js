import apiRoutes from '../helpers/apiRoutes';
import fbStorageUploadFile from '../helpers/fbStorageUploadFile';

const authService = {
    register: async (data, previewPicture) => {
        if (previewPicture.startsWith('/static/media/person-reading-book')) {
            data.profilePicture = 'https://firebasestorage.googleapis.com/v0/b/fb-storage-upload.appspot.com/o/person-reading-book.png?alt=media&token=b2d59981-bbbf-4674-bfaf-2bca3c249e35';
        } else if (!data.profilePicture.startsWith('https://firebasestorage.googleapis.com/v0/b/fb-storage-upload.appspot.com')){
            const imageUrl  = await fbStorageUploadFile(data.profilePicture, 'avatars');
            data.profilePicture = imageUrl;
        }

        return fetch(apiRoutes.register, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(data)
        })
            .then(res => {
                if(!res.ok){
                    return res.json().then(err => Promise.reject(err))
                }

                return res.json();
            })
    },

    signIn: (data) => {
        return fetch(apiRoutes.signIn, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(data)   
        })
        .then(res => {
            if(!res.ok){
                return res.json().then(err => Promise.reject(err))
            }

            return res.json();
        })
    },

    logOut: () => {
        return fetch(apiRoutes.logout, {
            method: 'POST',
            credentials: "include"
        })
        .then(res => res.text());
    }
}


export default authService;