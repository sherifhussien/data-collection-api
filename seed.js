const path = require('path');
const { Seeder } = require('mongo-seeding');

const config = {
    database: process.env.MONGODB_URL,
    dropDatabase: true,
}

const seeder = new Seeder(config);

const collections = seeder.readCollectionsFromPath(path.resolve("./data/"));

seeder
    .import(collections)
    .then(() => {
        console.log('data seeded successfully');
    })
    .catch(err => {
        console.log('Error', err);
    });






