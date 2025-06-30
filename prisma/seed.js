import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Seed Credit Cards
  const creditCardsData = [
    { name: 'Air India Signature', assetName: 'state-bank-of-india.svg', enabled: true, archived: false },
    { name: 'Rewards', assetName: 'axis-bank.svg', enabled: true, archived: false },
    { name: 'Centurion', assetName: 'american-express.svg', enabled: true, archived: false },
    { name: 'Indulge', assetName: 'indusind-bank.svg', enabled: true, archived: false },
    { name: 'First Preferred credit card', assetName: 'yes-bank.svg', enabled: false, archived: false },
    { name: 'ThankYou Preferred', assetName: 'citibank.svg', enabled: true, archived: false },
    { name: 'Pride platinum', assetName: 'axis-bank.svg', enabled: false, archived: false },
    { name: 'Platinum Plus Credit Card', assetName: 'hdfc-bank.svg', enabled: false, archived: false },
    { name: 'Ink Business Cash', assetName: 'chase-bank.svg', enabled: true, archived: false },
    { name: 'The Platinum Card', assetName: 'american-express.svg', enabled: true, archived: false },
    { name: 'Membership Rewards', assetName: 'american-express.svg', enabled: true, archived: false },
    { name: 'Etihad Guest Premier', assetName: 'state-bank-of-india.svg', enabled: true, archived: false },
    { name: 'Ink Plus', assetName: 'chase-bank.svg', enabled: false, archived: false },
    { name: 'Propel American Express', assetName: 'wells-fargo.svg', enabled: false, archived: false },
    { name: 'Diners Club Rewardz Credit Card', assetName: 'hdfc-bank.svg', enabled: false, archived: false },
    { name: 'PRIVATE Credit Card', assetName: 'yes-bank.svg', enabled: false, archived: false },
    { name: 'Air India Platinum', assetName: 'state-bank-of-india.svg', enabled: true, archived: false },
    { name: 'Venture X Rewards', assetName: 'capital-one.svg', enabled: true, archived: false },
    { name: 'Iconia', assetName: 'indusind-bank.svg', enabled: true, archived: false },
    { name: 'Business Gold', assetName: 'american-express.svg', enabled: true, archived: false }
  ]

  const ffpData = [
    { name: 'Royal Orchid Plus', assetName: 'royal-orchid-plus.svg', enabled: true },
    { name: 'KrisFlyer', assetName: 'krisflyer.svg', enabled: true },
    { name: 'Asiana Club', assetName: 'asiana-club.svg', enabled: true },
    { name: 'AAdvantage', assetName: 'aadvantage.svg', enabled: true },
    { name: 'Flying Blue', assetName: 'flying-blue.svg', enabled: true },
    { name: 'SkyMiles', assetName: 'skymiles.svg', enabled: true },
    { name: 'Enrich', assetName: 'enrich.svg', enabled: true },
    { name: 'Privilege Club', assetName: 'privilege-club.svg', enabled: true },
    { name: 'Miles&Smiles', assetName: 'miles-and-smiles.svg', enabled: true },
    { name: 'Skywards', assetName: 'skywards.svg', enabled: true },
    { name: 'Asia Miles', assetName: 'asia-miles.svg', enabled: true },
    { name: 'Airpoints', assetName: 'airpoints.svg', enabled: true },
    { name: 'Maharaja Club', assetName: 'maharaja-club.svg', enabled: true },
    { name: 'TrueBlue', assetName: 'trueblue.svg', enabled: true },
    { name: 'LifeMiles', assetName: 'lifemiles.svg', enabled: true },
    { name: 'Aeroplan', assetName: 'aeroplan.svg', enabled: true },
    { name: 'Executive Club', assetName: 'executive-club.svg', enabled: true },
    { name: 'Frequent Flyer', assetName: 'qantas-frequent-flyer.svg', enabled: true },
    { name: 'TAP Miles&Go', assetName: 'miles-and-go.svg', enabled: true },
    { name: 'AeroMexico Rewards', assetName: 'aeromexico-rewards.svg', enabled: true }
  ]

  await prisma.creditCard.createMany({ data: creditCardsData })
  await prisma.frequentFlyerProgram.createMany({ data: ffpData })

  console.log('✅ Seed complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
