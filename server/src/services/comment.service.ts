import { CommentDtoType } from "../db/dtos/comment/common.dto.js";
import { UpsertCommentDtoType } from "../db/dtos/comment/upsert.dto.js";
import * as db from "../db/index.db.js";
import { v4 as uuidv4 } from "uuid";

class CommentService {
	private db;

	constructor() {
		this.db = db;
	}

	getAll(): CommentDtoType[] {
		try {
			return this.db.comments;
		} catch (error) {
			throw error;
		}
	}

	getById(id: string): CommentDtoType | undefined {
		try {
			return this.db.comments.find((comment) => comment.id === id);
		} catch (error) {
			throw error;
		}
	}

	create(request: UpsertCommentDtoType): boolean {
		try {
			const { name, comment } = request;
			const insertPayload = { id: uuidv4(), name, comment };

			this.db.comments.push(insertPayload);

			return true;
		} catch (error) {
			throw error;
		}
	}

	edit(commentId: string, request: UpsertCommentDtoType): boolean {
		try {
			this.db.comments.map((comment, index) => {
				if (comment.id !== commentId) {
					this.db.comments[index] = comment;
					return comment;
				}

				const payload = {
					id: comment.id,
					name: request.name,
					comment: request.comment
				};
				this.db.comments[index] = payload;
				return payload;
			});

			return true;
		} catch (error) {
			throw error;
		}
	}
}

export default CommentService;
