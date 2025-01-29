import { body } from "express-validator"; // body is info from req

export const loginValidation = [ // Here are the dependencies for Users
    body("email", "Give the correct Email").isEmail(),
    body("password", "Use at least 5 charachters").isLength({min: 5}),
]

export const registerValidation = [
    body("email", "Give the correct Email").isEmail(),
    body("password", "Use at least 5 charachters").isLength({min: 5}),
    body("fullName", "Give your fullname").isLength({min: 3}),
    body("avatarUrl", "Provide a link").optional().isURL(),
]

export const postCreateValidation = [
    body("title", "Give the title for the post").isLength({min:3}).isString(),
    body("text", "Provide a text for the post").isLength({min: 3}).isString(),
    body("tags", "The tags are in an incorrect format. (Provide array)").optional().isArray(),
    body("imageUrl", "Wrong link").optional().isString(),
]