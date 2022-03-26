const Validator = require('./../../../../repositories/http/validator')

const schema = {
    auth: Validator.object().shape({
        email: Validator.string().required().email(),
        password: Validator.string().required().min(8)
    }),
}

module.exports = schema