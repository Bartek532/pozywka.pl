import { aboutAcfSchema } from "./schema";
import { AboutAcf } from "./types";

export const isAboutAcf = (acf: unknown): acf is AboutAcf => aboutAcfSchema.safeParse(acf).success;
