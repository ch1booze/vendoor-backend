import { PrismaClient } from '@prisma/client';
import { BusinessTag } from '../src/businesses/businesses.types';

const demoUserId = '00000000-0000-0000-0000-000000000000';
const demoBusinesses = [
  {
    name: 'TaylorMade Suits',
    description:
      'A custom tailoring shop offering bespoke suits and alterations.',
    tags: [BusinessTag.TAILORING, BusinessTag.CLOTHING],
  },
  {
    name: 'FreshHarvest Grocers',
    description:
      'A grocery store providing fresh produce, pantry staples, and meal delivery services.',
    tags: [BusinessTag.GROCERY, BusinessTag.RETAIL, BusinessTag.CATERING],
  },
  {
    name: 'SavoryBite Restaurant',
    description:
      'A restaurant offering a variety of cuisines with dine-in and home delivery options.',
    tags: [
      BusinessTag.RESTAURANT,
      BusinessTag.FOOD_TRUCK,
      BusinessTag.CATERING,
    ],
  },
  {
    name: 'UrbanChic Boutique',
    description:
      'A clothing store specializing in trendy fashion and accessories for men and women.',
    tags: [BusinessTag.BOUTIQUE, BusinessTag.CLOTHING, BusinessTag.RETAIL],
  },
];

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction(async (tx) => {
    await tx.user.upsert({
      where: { id: demoUserId },
      create: { id: demoUserId, firstName: 'Demo', lastName: 'User' },
      update: { firstName: 'Demo', lastName: 'User' },
    });

    await Promise.all(
      demoBusinesses.map(async (b) => {
        const existingBusiness = await tx.business.findFirst({
          where: { name: b.name },
        });
        if (!existingBusiness) {
          await tx.business.create({ data: { ...b, userId: demoUserId } });
        }
      }),
    );
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
