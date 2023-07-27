import { z } from "zod";

import { aboutAcfSchema } from "./schema";

export type AboutAcf = z.infer<typeof aboutAcfSchema>;
