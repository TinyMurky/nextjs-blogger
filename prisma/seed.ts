import prisma from "@/libs/db"
import { getBlogsData } from './prisma-helper/getBlogs'
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
  console.log('all blogs construct complete')
}
main()
  .then(async () => {
    console.log('prisma disconnecting')
    await prisma.$disconnect()
    console.log('prisma disconnected, seed is complete')
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
