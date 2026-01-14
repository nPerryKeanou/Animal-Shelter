import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma'; // Chemin vers ton output du schema.prisma

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    // Cette ligne force la connexion à la DB dès que NestJS démarre
    await this.$connect();
  }
}