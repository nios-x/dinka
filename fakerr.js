import { PrismaClient, Provider, Viewers, Relationship, ChatType } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  const users = [];

  // ----------------------
  // 1️⃣ Create 10 users
  // ----------------------
  for (let i = 0; i < 10; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    const user = await prisma.user.create({
      data: {
        email: faker.internet.email({ firstName, lastName }),
        password: faker.internet.password(),
        firstname: firstName,
        lastname: lastName,
        username: `${firstName}${faker.number.int({ min: 10, max: 99 })}`,
        bio: faker.lorem.sentence(),
        phone: faker.number.int({ min: 6000000000, max: 9999999999 }),
        provider: faker.helpers.arrayElement([Provider.Email, Provider.Google]),
        image: `https://api.dicebear.com/6.x/avataaars/png?seed=${firstName}${lastName}`, // valid avatar
        dob: faker.date.birthdate({ min: 18, max: 60, mode: 'age' }),
      },
    });
    users.push(user);
  }

  // ----------------------
  // 2️⃣ Create posts for each user
  // ----------------------
  for (const user of users) {
    const postCount = faker.number.int({ min: 2, max: 5 });
    for (let i = 0; i < postCount; i++) {
      const isMedia = faker.datatype.boolean();
      await prisma.post.create({
        data: {
          title: faker.lorem.sentence(),
          visiblity: faker.helpers.arrayElement([Viewers.Public, Viewers.Followers]),
          authorId: user.id,
          isMedia,
          mediaurl: isMedia
            ? `https://source.unsplash.com/random/800x600?sig=${faker.number.int({ min: 1, max: 1000 })}`
            : null, // valid Unsplash image
        },
      });
    }
  }

  // ----------------------
  // 3️⃣ Create follow relationships
  // ----------------------
  for (let i = 0; i < 20; i++) {
    const src = faker.helpers.arrayElement(users);
    const dest = faker.helpers.arrayElement(users.filter(u => u.id !== src.id));
    try {
      await prisma.relations.create({
        data: {
          srcid: src.id,
          destid: dest.id,
          type: Relationship.Follower,
        },
      });
    } catch {
      // skip duplicates
    }
  }

  // ----------------------
  // 4️⃣ Create chats
  // ----------------------
  for (let i = 0; i < 30; i++) {
    const from = faker.helpers.arrayElement(users);
    const to = faker.helpers.arrayElement(users.filter(u => u.id !== from.id));

    await prisma.chats.create({
      data: {
        fromId: from.id,
        toId: to.id,
        type: faker.helpers.arrayElement([ChatType.Message, ChatType.Call, ChatType.VideoCall]),
        message: faker.lorem.sentence(),
        isSeen: faker.datatype.boolean(),
      },
    });
  }

  // ----------------------
  // 5️⃣ Create comments on posts
  // ----------------------
  const posts = await prisma.post.findMany();
  for (const post of posts) {
    const commentCount = faker.number.int({ min: 1, max: 3 });
    for (let i = 0; i < commentCount; i++) {
      const user = faker.helpers.arrayElement(users);
      await prisma.comment.create({
        data: {
          postId: post.id,
          userId: user.id,
          content: faker.lorem.sentence(),
        },
      });
    }
  }

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((err) => {
    console.error('❌ Error seeding DB:', err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
