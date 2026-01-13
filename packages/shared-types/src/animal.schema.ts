import { z } from "zod";

// ENUMS
export const AnimalStatusEnum = z.enum(["available", "adopted", "foster_care", "unavailable"]);
export type AnimalStatus = z.infer<typeof AnimalStatusEnum>;

export const AnimalSexEnum = z.enum(["male", "female", "unknown"]);
export type AnimalSex = z.infer<typeof AnimalSexEnum>;

// ESPÈCE
export const SpeciesSchema = z.object({
  id: z.int().positive(),
  name: z.string().max(50),
  created_at: z.date(),
  updated_at: z.date().nullable().optional(),
  deleted_at: z.date().nullable().optional(), // Soft Delete
});

export type Species = z.infer<typeof SpeciesSchema>;

// ANIMAL
export const AnimalSchema = z.object({
  id: z.int().positive(),
  name: z.string().min(1).max(100),
  age: z.string().max(50).nullable().optional(), // Ex: "2 ans"
  description: z.string().nullable().optional(),

  // Caractéristiques physiques
  sex: AnimalSexEnum,
  weight: z.number().nullable().optional(), // Float en BDD -> number en JS
  height: z.int().nullable().optional(), // En cm

  // Gestion et Médias
  animal_status: AnimalStatusEnum.default("available"),
  photos: z.array(z.url()).nullable().optional(), // JSONB -> Tableau URLs

  // Critères de Matching (Symétriques aux profils)
  accept_other_animals: z.boolean().default(true),
  accept_children: z.boolean().default(true),
  need_garden: z.boolean().default(false),
  treatment: z.string().nullable().optional(),

  // Clés étrangères
  species_id: z.int().positive(),
  pfc_user_id: z.int().positive(), // ID du refuge propriétaire

  // Dates
  created_at: z.date(),
  updated_at: z.date().nullable().optional(),
  deleted_at: z.date().nullable().optional(), // Archivage (Soft Delete)
});

export type Animal = z.infer<typeof AnimalSchema>;

// DTOs (Data Transfer Objects)

// CREATE : Création d'une fiche (Par le Refuge)
export const CreateAnimalSchema = AnimalSchema.omit({
  id: true,
  pfc_user_id: true, // Sera récupéré via le token du refuge
  created_at: true,
  updated_at: true,
  deleted_at: true,
}).extend({
  // Photos optionnelles mais initialisées en tableau vide par défaut
  photos: z.array(z.url()).default([]),
});

export type CreateAnimalDto = z.infer<typeof CreateAnimalSchema>;

// UPDATE : Modification d'une fiche
export const UpdateAnimalSchema = CreateAnimalSchema.partial();

export type UpdateAnimalDto = z.infer<typeof UpdateAnimalSchema>;
