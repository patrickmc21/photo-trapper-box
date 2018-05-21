
exports.seed = function(knex, Promise) {
  return knex('photos').del()
    .then(function () {
      return knex('photos').insert([
        {title: 'sunset', url: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Sunset_2007-1.jpg'},
        {title: 'mountain', url: 'https://mountainprojectmt.com/wp-content/uploads/2016/04/climb2-2.jpg'}
      ])
    })
    .then(() => console.log('successful seeding'))
    .catch((error) => console.log('Error: ', error))
};