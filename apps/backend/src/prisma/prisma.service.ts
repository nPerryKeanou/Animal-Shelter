
import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "../../generated/prisma";



@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect(); // connexion à la base au démarrage du module
  }

  async onModuleDestroy() {
    await this.$disconnect(); // déconnexion propre quand l'app s'arrête
  }
}
