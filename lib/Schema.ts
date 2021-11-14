import * as Yup from "yup";

export module AuthSchema {
    export const Password = Yup.string()
        .required('Required')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        );

    export const Email= Yup.string()
        .email('Invalid email')
        .required('Required');

    export const Username = Yup.string().min(4).max(30);
}
