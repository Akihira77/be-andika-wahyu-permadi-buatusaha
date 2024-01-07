import { z } from "zod";

export const UpsertCommentDTO = z
	.object({
		name: z.string().min(1).max(50),
		comment: z.string().min(1).max(1000)
	})
	.strict();

export type UpsertCommentDtoType = z.infer<typeof UpsertCommentDTO>;
