import { PrismaClient } from '@prisma/client'
import { getBlogsData } from './prisma-helper/getBlogs'
const prisma = new PrismaClient()
async function main() {
  const blogs = await getBlogsData('/public/blogs', 'mdx')

  await prisma.user.create({
    data: {
      id: -1,
      email: "guest@example.com",
      name: "Guest",
    }
  })

  await prisma.user.upsert({
    where: { email: 'murky0830@gmail.com' },
    update: {},
    create: {
      email: 'murky0830@gmail.com',
      name: 'Tiny Murky',
      blogs: {
        create: blogs
      },
    },
  })


  console.log('all blogs construct complete')
}
main()
  .then(async () => {
    console.log('prisma disconnecting')
    await prisma.$disconnect()
    console.log('prisma disconnected, seed is complete')
    process.exit(1)
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
