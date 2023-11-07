import { PrismaClient } from '@prisma/client'
import { getBlogsData } from './prisma-helper/getBlogs'
const prisma = new PrismaClient()
async function main() {
  const blogs = await getBlogsData('/public/blogs', 'mdx')

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
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
