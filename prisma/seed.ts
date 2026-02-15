import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.subscription.createMany({
    data: [{
      collectionId: 1811081425,
      artistName: "Europe 2",
      collectionName: "Cauet sur Europe 2",
      feedUrl: "https://feeds.audiomeans.fr/feed/a04c843b-3e68-4928-80e7-27f7617db91b.xml",
      releaseDate: "2026-02-02T12:35:00Z",
      artworkUrl: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts211/v4/fb/2d/f5/fb2df587-a703-4fc3-971e-ba03b3df1db7/mza_7179246925820566499.png/600x600bb.jpg",
  }], skipDuplicates: true,});

  console.log("Seed completed successfully");
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
