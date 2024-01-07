import { AxiosResponse } from "axios";

export type CommentDTO = {
	id: string;
	name: string;
	comment: string;
};

export type UpsertCommentDTO = Omit<CommentDTO, "id">;

export type UpsertCommentResponseDTO = {
	message: string;
};

export type ErrorObject = {
	[fieldName: string]: string[];
};

export type ApiResponse = {
	status: number;
	response: AxiosResponse | string;
};
