const Validator = require('../../../../repositories/http/validator');

const schema ={
    create: Validator.object().shape({
        email: Validator.string().required().email(),
        password: Validator.string().required().min(8),
        fullname: Validator.string().required().min(3),
        birth: Validator.string().required().max(10),
        nickname: Validator.string().required().min(3).max(25),
        gender: Validator.mixed().required().oneOf(['Não informar', 'Masculino', 'Feminino', 'Outro']),
        type: Validator.mixed().required().oneOf(['Aluno', 'Professor', 'Administrador']),
        phone: Validator.string().min(14).max(14),
        country: Validator.string().max(10),
        state: Validator.string().max(25),
        city: Validator.string().max(50),
        district: Validator.string().max(50),
        street: Validator.string().max(50),
        number: Validator.string().max(10),
        complement: Validator.string().max(50),
        reference: Validator.string().max(50),
        zipCode: Validator.string().max(10),
        cpfnumber: Validator.string().max(11),
        avatar: Validator.string()
    }),
    id: Validator.object().shape({
        id: Validator.string().required().min(36).max(36),
    }),
} 

module.exports = schema