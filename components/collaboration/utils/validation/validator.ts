import { collaborationHeroAcfSchema, thingSchema, thingsAcfSchema } from "./schema";
import { CollaborationBannerAcf, CollaborationHeroAcf, Thing, ThingsAcf } from "./types";

export const isCollaborationHeroAcf = (acf: unknown): acf is CollaborationHeroAcf =>
  collaborationHeroAcfSchema.safeParse(acf).success;
export const isCollaborationBannerAcf = (acf: unknown): acf is CollaborationBannerAcf =>
  collaborationHeroAcfSchema.safeParse(acf).success;
export const isThingsAcf = (acf: unknown): acf is ThingsAcf =>
  thingsAcfSchema.safeParse(acf).success;
export const isThing = (maybeThing: unknown): maybeThing is Thing =>
  thingSchema.safeParse(maybeThing).success;
