import * as Yup from 'yup';

const registerValidations = {
    username: Yup.string()
        .required('Username is required')
        .min(4, 'Username should be more than 3 chars')
        .max(15, 'Username should be not more than 15 chars'),

    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),

    firstName: Yup.string()
        .required('First Name is required')
        .min(2, 'First Name should be more than 2 chars')
        .max(15, 'First Name should be not more than 15 chars'),

    lastName: Yup.string()
        .required('Last Name is required')
        .min(2, 'First Name should be more than 2 chars')
        .max(15, 'First Name should be not more than 15 chars'),

    dateOfBirth: Yup.string()
        .required('Date of birth is required'),

    profilePicture: Yup.mixed(),

    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password should be more than 6 chars')
        .max(18, 'Password should be not more than 18 chars'),

    repeatPassword: Yup.string().required('Repeat password is required').when("password", {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
            [Yup.ref("password")],
            "Both passwords should match"
        )
    })
}

const signInValidations = {
    username: Yup.string()
        .required('Username is required')
        .min(4, 'Enter valid username')
        .max(15, 'Enter valid username'),

    password: Yup.string()
        .required('Password is required')
}

const categoryValidations = {
    name: Yup.string()
        .required('Name is required')
        .min(3, 'Name must be at least 3 chars long')
        .max(25, 'Name must be maximum 25 chars long'),

    picture: Yup.mixed()
        .required('Picture as poster is required'),

    description: Yup.string()
        .required('Description is required')
        .min(15, 'Description must be at least 15 chars long')
        .max(350, 'Description must be maximum 350 chars long')
}

const articleValidations = {
    title: Yup.string()
        .required('Title is required')
        .min(10, 'Title must be at least 10 chars long')
        .max(150, 'Title must be maximum 150 chars long'),

    subtitle: Yup.string()
        .required('Subtitle is required')
        .min(10, 'Subtitle must be at least 10 chars long')
        .max(255, 'Subtitle must be maximum 255 chars long'),

    // body: Yup.string()
    //     .required('Description is required')
    //     .min(20, 'Description must be at least 20 chars long'),

    frontPicture: Yup.mixed()
        .required('Front picture as poster is required'),

    category: Yup.string()
    .required('Category is required')
}

export {
    registerValidations,
    signInValidations,
    categoryValidations,
    articleValidations
}