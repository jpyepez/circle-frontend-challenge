import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const main = async () => {
    const books = await prisma.book.findMany()
    console.log(books)
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
