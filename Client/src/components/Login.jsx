import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../config/auth';


export default function Login() {
    const navegacion = useNavigate();
    const auth = useAuth();
    //let [ROL, getRol] = useState('');
    let [ROL_EMAIL, getMail] = useState('laura@example.com');
    let [ROL_PASSWORD, getCon] = useState('securepass');
    let [token, setToken] = useState(''); // Nuevo estado para el token
    
    const login = async () => {
    try {
        let header = new Headers();
        header.set('Content-Type', 'application/json');
        header.set('Authorization', `Bearer ${token}` );

        const response = await fetch('http://192.168.129.72:5006/login', {
        method: 'POST',
        headers: header,
        body: JSON.stringify({ ROL_EMAIL, ROL_PASSWORD }),
        });

        if (!response.ok) {
        throw new Error('Error en la solicitud');
        }
        
        const data = await response.json();
        if(!data.Token){
            alert(data.msg);
            console.log(data);
        }else {
            setToken(data.Token);
            auth.logins({email:ROL_EMAIL})
            navegacion("/profile");
        }
    } catch (error) {
        console.error(error);
    }
};


return (
   
<div id='formLogin'> 
    <h1>Login</h1>
   
    <br />
    <input
        type="text"
        value={ROL_EMAIL}
        onChange={(e) => getMail(e.target.value)}
        placeholder="email"
    /><br />
    <input
        type="text"
        value={ROL_PASSWORD}
        onChange={(e) => getCon(e.target.value)}
        placeholder="contraseña"
    />

    <br />
    <button value="login" onClick={login}>
        ENVIAR
    </button>

</div>
);
}