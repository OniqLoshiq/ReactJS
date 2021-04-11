import { storage } from '../firebase';

async function fbStorageUploadFile(file, folder) {
    return new Promise((resolve, reject) => {
        const newFileName = file.name + '-' + Date.now();
        const uploadTask = storage.ref(`${folder}/${newFileName}`).put(file);

        uploadTask.on('state_changed',
        snapshot => { },
        error => {
            console.log(error);
        },
        () => {
            storage
                .ref(folder)
                .child(newFileName)
                .getDownloadURL()
                .then(url => {
                    resolve(url);
                });
        });
    })
}

export default fbStorageUploadFile;