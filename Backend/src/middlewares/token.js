import genCollection from "../helpers/db.js";
import { SignJWT, jwtVerify } from "jose";
import { validationLogin } from "../validator/validaciones.js";
import { validationResult } from 'express-validator';

/*
"email_registro": "usuario@example.com",
"password_registro": "usuario23",
"rol_name": "Usario reporte",
*/

/*email: "josedavid@example.com",
password: "secreto",

email: "ana@example.com",
password: "ana456"

ROL = ["user", "shopkeeper", "admin"]

{
    "ROL": "user",
    "ROL_EMAIL": "josedavid@example.com"
    "ROL_PASSWORD":  "secreto"
}
*/

const generateToken = async(req, res) => {
    //Validacion de las credenciales de login
    await Promise.all(validationLogin.map(rule => rule.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorValidaton = errors.array().map(error => [error.msg]);
        return res.send(errors.errors[0]);
    }
    const {ROL_EMAIL: email ,ROL_PASSWORD: psw } = req.body;
    
    const coleccion = await genCollection("user")
    const result = await coleccion.findOne({"email":email, "password": psw })
    console.log({"result": result});
    if(!result){return res.send({"status": 404, "msg":`Usuario no registrado en la base de datos`})}
    const datauser = {
        "id":result.rol
    }
    console.log({"datauser": datauser});
    //crecion del token
    const encoder = new TextEncoder();
    const jwtConstructor = await new SignJWT(datauser)
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(encoder.encode(process.env.JWT_SECRET));
    res.send({"Token":jwtConstructor});
}
    
const validateToken = async (token) => {
    try {
        const encoder = new TextEncoder();
        const jwtData = await jwtVerify(
            token,
            encoder.encode(process.env.JWT_SECRET)
        );
        const coleccion = await genCollection("rols")
        return await coleccion.findOne({"_id": jwtData.payload.id});
    } catch (error) {
        console.log(error);
        return false;
    }
}


export {
    generateToken,
    validateToken
}