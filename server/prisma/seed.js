import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seed() {
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();

    const frankie = await prisma.user.create({ data: { name: 'FrankieDev' } });
    const malanie = await prisma.user.create({ data: { name: 'Malanie Girl' } });

    const post1 = await prisma.post.create({
        data: {
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia maiores doloribus nulla fugiat excepturi quis dolor sit necessitatibus? Voluptatum maiores ut eligendi voluptas quam porro temporibus mollitia quae error dolor.',
            title: 'Post 1',
        },
    });
    const post2 = await prisma.post.create({
        data: {
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia maiores doloribus nulla fugiat excepturi quis dolor sit necessitatibus? Voluptatum maiores ut eligendi voluptas quam porro temporibus mollitia quae error dolor.',
            title: 'Post 2',
        },
    });

    const comment1 = await prisma.comment.create({
        data: {
            message: 'I am a root comment',
            userId: frankie.id,
            postId: post1.id,
        },
    });
    const comment2 = await prisma.comment.create({
        data: {
            parentId: comment1.id,
            message: 'I am a nested comment',
            userId: malanie.id,
            postId: post1.id,
        },
    });
    const comment3 = await prisma.comment.create({
        data: {
            message: 'I am another root comment',
            userId: malanie.id,
            postId: post1.id,
        },
    });
}

seed();
