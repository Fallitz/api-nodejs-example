const yup = require('yup')

yup.setLocale({
    mixed: {
        default: 'Campo Inválido',
        required: 'Campo Obrigatório',
        oneOf: 'Campo deve ser um dos seguintes valores: ${values}',
        notOneOf: 'Campo não pode ser um dos seguintes valores: ${values}',
    },
    string: {
        length: 'É necessário ter exatamente ${length} caracteres',
        min: 'É necessário pelo menos ${min} caracteres',
        max: 'É necessário ter no máximo ${max} caracteres',
        email: 'E-Mail inválido',
        url: 'É necessário ter um formato de URL válida',
        trim: 'Não deve conter espaços no início ou no fim.',
        lowercase: 'É necessário estar em maiúsculo',
        uppercase: 'É necessário estar em minúsculo',
    },
    number: {
        min: 'É necessário ser no mínimo ${min}',
        max: 'É necessário ser no máximo ${max}',
        lessThan: 'É necessário ser menor que ${less}',
        moreThan: 'É necessário ser maior que ${more}',
        notEqual: 'Não pode ser igual à ${notEqual}',
        positive: 'É necessário ser um número posítivo',
        negative: 'É necessário ser um número negativo',
        integer: 'É necessário ser um número inteiro',
    },
    date: {
        min: 'É necessário ser maior que a data ${min}',
        max: 'É necessário ser menor que a data ${max}',
    },
    array: {
        min: 'É necessário ter no mínimo ${min} itens',
        max: 'É necessário ter no máximo ${max} itens',
    },
});

module.exports = yup