import * as Yup from "yup"

export const schema= Yup.object({

    username: Yup.string().min(2).max(25).required("name is required"),
    email: Yup.string().email().required("enter a valid email"),
    password:Yup.string().min(4).required("enter a valid password"),
    confpassword: Yup.string().required().oneOf([Yup.ref("password"),null],"password do not match")

})