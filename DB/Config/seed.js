import { faker } from '@faker-js/faker';
import Users from '../../Dal/Models/Users.js';
import Posts from '../../Dal/Models/Posts.js';
import Comments from '../../Dal/Models/Comments.js';
import Todos from '../../Dal/Models/Todos.js';
import Passwords from '../../Dal/Models/Passwords.js';
import sequelize from './db.js';
import bcrypt from 'bcrypt';

async function seed() {
  try {
    await sequelize.sync({ force: true });

    for (let i = 0; i < 10; i++) {
      const user = await Users.create({
        username: faker.internet.username(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        address: {
          street: faker.location.street(),
          city: faker.location.city(),
          zipcode: faker.location.zipCode(),
        },
        phone: faker.phone.number(),
        website: faker.internet.url(),
        company: {
          name: faker.company.name(),
          catchPhrase: faker.company.catchPhrase(),
        },
      });

      const password = faker.internet.password();

      await Passwords.create({
        userId: user.id,
        Password: await bcrypt.hash(password, 10),
      });

      console.log(`User: ${user.username}, Password: ${password}`);

      for (let j = 0; j < 3; j++) {
        const post = await Posts.create({
          userId: user.id,
          title: faker.lorem.sentence(),
          body: faker.lorem.paragraph(),
        });

        for (let k = 0; k < 2; k++) {
          await Comments.create({
            postId: post.id,
            name: faker.person.fullName(),
            body: faker.lorem.sentences(2),
          });
        }
      }

      for (let j = 0; j < 3; j++) {
        await Todos.create({
          userId: user.id,
          title: faker.lorem.words(3),
          completed: faker.datatype.boolean(),
        });
      }
    }

    console.log('Fake data has been seeded.');
    process.exit();
  } catch (error) {
    console.error('Failed to seed data:', error);
    process.exit(1);
  }
}

seed();