import bcrypt from 'bcryptjs'

const data_restaurantes = {
    restaurantes:[
        {
            name: 'Restaurante 1',
            email: 'Rest1admin@ejemplo.com',
            password: bcrypt.hashSync('12345'),
            horario: new Map([['Lunes', '7 AM - 6 PM'],
                ['Lunes', '7 AM - 6 PM'],
                ['Martes', '7 AM - 6 PM'],
                ['Miercoles', '7 AM - 6 PM'],
                ['Jueves', '7 AM - 6 PM'],
                ['Viernes', '7 AM - 6 PM'],
                ['Sabado', '7 AM - 2 PM']]),
        }
    ]
}
export default data_restaurantes