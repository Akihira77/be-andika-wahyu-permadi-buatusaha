import { z } from "zod";

export const CommentDTO = z
	.object({
		id: z.string().uuid(),
		name: z.string().min(1).max(50),
		comment: z.string().min(1).max(1000)
	})
	.strict();

export type CommentDtoType = z.infer<typeof CommentDTO>;
