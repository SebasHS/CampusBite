import Axios from 'axios';

export class ServiceUsuario{
    static async validarUsuario(email, password){
        const { data } = await Axios.post('/api/users/login', {
            email,
            password,
        });
        const res = data;
        return res
    }
    static crearUsuario(){}
}