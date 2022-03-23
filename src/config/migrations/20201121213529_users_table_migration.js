
exports.up = function(knex) {
    return knex.schema
        .createTable('users', function (table) {
            table.uuid('id').primary().defaultTo(knex.raw("(UUID())")).unsigned();
            table.string('email', 50).notNullable();
            table.string('password', 80).notNullable();
            table.string('fullname', 80).notNullable();
            table.string('birth').notNullable();
            table.string('nickname', 25).notNullable();
            table.enu('gender', ['Não informar', 'Masculino', 'Feminino', 'Outro']).notNullable();
            table.enu('type', ['Aluno', 'Professor', 'Administrador']).notNullable();
            table.string('phone', 14).notNullable();
            table.string('country', 10);
            table.string('state', 25);
            table.string('city', 50);
            table.string('district', 50);
            table.string('street', 50);
            table.string('number', 10);
            table.string('complement', 50);
            table.string('reference', 50);
            table.string('zipCode', 10);
            table.string('cpfnumber', 11);
            table.mediumtext('avatar');
            table.uuid('recovery_code');
            table.string('role', 50).defaultTo('user');
            table.boolean('active').defaultTo('true').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
            table.timestamp('lastAcess_at').defaultTo(knex.fn.now());
        })
};

exports.down = function(knex) {
    return knex.schema.dropTable("users");
};
