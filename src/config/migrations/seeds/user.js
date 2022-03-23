
exports.seed = function(knex) {
    return knex('users').del().then(function() {
		return knex('users').insert([
			{
			
			}
      	]).then(function() {
			return knex('sellers').insert([
			{
			
			}
        ]);
      });
    });
};
