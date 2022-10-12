// generator client {
//     provider = "prisma-client-js"
//   }

//   datasource db {
//     provider = "postgresql"
//     url      = env("DATABASE_URL")
//   }

//   model Product {
//     id          Int       @id @default(autoincrement())
//     createdAt   DateTime  @default(now())
//     updatedAt   DateTime  @updatedAt
//     name        String    @unique
//     description String    @db.VarChar(255)
//     image       String    @db.VarChar(500)
//     category    String
//     quantity    Int
//     price       Int
//     variants    Variant[]
//     ratings     Review[]

//     @@map(name: "products")
//   }

//   model Variant {
//     id        Int     @id @default(autoincrement())
//     color     String
//     image     String  @db.VarChar(500)
//     product   Product @relation(fields: [productId], references: [id])
//     productId Int

//     @@map(name: "variants")
//   }

//   model Review {
//     id        Int     @id @default(autoincrement())
//     name      String
//     review    String  @db.VarChar(500)
//     rating    Int
//     Product   Product @relation(fields: [productId], references: [id])
//     productId Int

//     @@map(name: "reviews")
//   }
