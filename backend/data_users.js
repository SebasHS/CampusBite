import bcrypt from 'bcryptjs'

const data = {
    users:[
        {
            name: 'Sebas DevTeam',
            email: 'adminCampusBite@ejemplo.com',
            password: bcrypt.hashSync('1234'),
            isAdmin: true,
        },
        {
            name: 'Cliente X',
            email: 'cliente@ejemplo.com',
            password: bcrypt.hashSync('1234'),
            isAdmin: false
        },
    ]
}
export default data