import { z } from "zod";

import {
  collaborationBannerAcfSchema,
  collaborationHeroAcfSchema,
  thingSchema,
  thingsAcfSchema,
} from "./schema";

export type CollaborationHeroAcf = z.infer<typeof collaborationHeroAcfSchema>;
export type CollaborationBannerAcf = z.infer<typeof collaborationBannerAcfSchema>;
export type ThingsAcf = z.infer<typeof thingsAcfSchema>;
export type Thing = z.infer<typeof thingSchema>;
