import { PrismaClient } from '@prisma/client'
import mockData from './mocks/mockData'

const prisma = new PrismaClient()

const main = async () => {
    await prisma.book.deleteMany({})

    await Promise.all(
        mockData.map(async (book) => {
            return await prisma.book.create({
                data: book,
            })
        })
    )
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
