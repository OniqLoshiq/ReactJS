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

export {
    registerValidations,
    signInValidations
}