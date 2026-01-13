import { z } from "zod";

// ENUM
export const HousingTypeEnum = z.enum(["house", "apartment", "other"]);
export type HousingType = z.infer<typeof HousingTypeEnum>;

// PROFIL PARTICULIER (Individual)
export const IndividualProfileSchema = z.object({
  pfc_user_id: z.int().positive(), // Clé étrangère = Clé Primaire (1-1)

  // Critères de logement
  housing_type: HousingTypeEnum.nullable().optional(),
  surface: z.int().positive().nullable().optional(), // En m²

  // Critères de matching (Booléens)
  have_garden: z.boolean().default(false),
  have_animals: z.boolean().default(false),
  have_children: z.boolean().default(false),

  // Disponibilité Famille d'Accueil
  available_family: z.boolean().default(false),
  available_time: z.string().nullable().optional(), // Description libre

  created_at: z.date(),
  updated_at: z.date().nullable().optional(),
});

export type IndividualProfile = z.infer<typeof IndividualProfileSchema>;

// DTO : Mise à jour (Front -> Back)
export const UpdateIndividualProfileSchema = IndividualProfileSchema.omit({
  pfc_user_id: true, // L'ID ne change pas
  created_at: true,
  updated_at: true,
}).partial(); // Tout est optionnel pour une mise à jour partielle

export type UpdateIndividualProfileDto = z.infer<typeof UpdateIndividualProfileSchema>;

// PROFIL REFUGE (Shelter)
export const ShelterProfileSchema = z.object({
  pfc_user_id: z.int().positive(), // Clé étrangère = Clé Primaire (1-1)

  siret: z.string().length(14, { error: "Le SIRET doit faire exactement 14 caractères" }),
  shelter_name: z.string().min(2).max(100),
  description: z.string().nullable().optional(),

  created_at: z.date(),
  updated_at: z.date().nullable().optional(),
});

export type ShelterProfile = z.infer<typeof ShelterProfileSchema>;

// DTO : Mise à jour (Front -> Back)
export const UpdateShelterProfileSchema = ShelterProfileSchema.omit({
  pfc_user_id: true,
  siret: true, // Le SIRET est une info légale fixe
  created_at: true,
  updated_at: true,
}).partial();

export type UpdateShelterProfileDto = z.infer<typeof UpdateShelterProfileSchema>;
