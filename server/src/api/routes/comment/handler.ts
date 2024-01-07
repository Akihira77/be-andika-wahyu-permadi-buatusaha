import { Request, Response } from "express";
import { StatusCodes } from "../../../utils/constants.js";
import { CommentService } from "../../../services/index.service.js";
import { CustomError, ZodSchemaError } from "../../../errors/index.error.js";
import {
	UpsertCommentDTO,
	UpsertCommentDtoType
} from "../../../db/dtos/comment/upsert.dto.js";
import { validateZodSchema } from "../../../utils/validateZodSchema.js";

const commentService = new CommentService();

export const getAll = (
	req: Request<never, never, never, never>,
	res: Response
) => {
	try {
		const comments = commentService.getAll();

		res.status(StatusCodes.Ok200).json({ comments });
		return;
	} catch (error) {
		throw error;
	}
};

export const getCommentById = (
	req: Request<{ id: string }, never, never, never>,
	res: Response
) => {
	try {
		const { id } = req.params;
		const commentFromDb = commentService.getById(id);

		if (!commentFromDb) {
			throw new CustomError(
				StatusCodes.NotFound404,
				"Comment does not found"
			);
		}

		res.status(StatusCodes.Ok200).json({ comment: commentFromDb });
		return;
	} catch (error) {
		throw error;
	}
};

export const create = (
	req: Request<never, never, UpsertCommentDtoType, never>,
	res: Response
) => {
	try {
		const body = req.body;
		const validationResult = validateZodSchema(UpsertCommentDTO, body);
		if (!validationResult.success) {
			throw new ZodSchemaError(validationResult.errors);
		}

		const result = commentService.create(body);

		if (!result) {
			throw new CustomError(
				StatusCodes.InternalServerError500,
				"Create comment failed"
			);
		}

		res.status(StatusCodes.Created201).json({
			message: "Comment created successfully"
		});
		return;
	} catch (error) {
		throw error;
	}
};

export const edit = (
	req: Request<{ id: string }, never, UpsertCommentDtoType, never>,
	res: Response
) => {
	try {
		const body = req.body;
		const validationResult = validateZodSchema(UpsertCommentDTO, body);
		if (!validationResult.success) {
			throw new ZodSchemaError(validationResult.errors);
		}

		const { id } = req.params;
		const commentFromDb = commentService.getById(id);

		if (!commentFromDb) {
			throw new CustomError(
				StatusCodes.NotFound404,
				"Comment does not found"
			);
		}

		const result = commentService.edit(id, body);

		if (!result) {
			throw new CustomError(
				StatusCodes.InternalServerError500,
				"Update comment failed"
			);
		}

		res.status(StatusCodes.Ok200).json({
			message: "Comment updated successfully"
		});
	} catch (error) {
		throw error;
	}
};
