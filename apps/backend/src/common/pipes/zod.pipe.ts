import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { ZodType } from "zod";

@Injectable()
export class ZodPipe implements PipeTransform {
  // On type le constructeur avec ZodType
  constructor(private schema: ZodType) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    // On ignore les décorateurs personnalisés pour ne pas valider n'importe quoi
    if (metadata.type === "custom") {
      return value;
    }

    try {
      // Zod valide et parse les données
      return this.schema.parse(value);
    } catch (error) {
      // En cas d'erreur, on renvoie une 400 propre
      throw new BadRequestException({
        message: "Validation failed",
        errors: error,
      });
    }
  }
}
