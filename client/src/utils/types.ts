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

export type SuccessResponse<TData> = {
	status: number;
	data: TData;
};

export type ErrorObject = Record<string, string | number | boolean>;

export type ApiResponse = {
	status: number;
	response: AxiosResponse | string;
};
