
import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Global() // rend Prisma disponible partout sans réimporter
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // permet aux autres modules d'utiliser PrismaService
})
export class PrismaModule {}
