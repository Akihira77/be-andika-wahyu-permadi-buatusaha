import axios, { AxiosError } from "axios";
import { ApiResponse, UpsertCommentDTO } from "./types.ts";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const getAllComments = () => {
	return axios.get(`${SERVER_URL}/comments`);
};

export const getCommentById = (id: string) => {
	return axios.get(`${SERVER_URL}/comments/${id}`);
};

export const postComment = async (
	data: UpsertCommentDTO
): Promise<ApiResponse> => {
	try {
		const result = await axios.post(`${SERVER_URL}/comments`, data);

		return {
			status: result.status,
			response: result
		};
	} catch (error) {
		console.log(error);
		const result = (error as AxiosError).response;
		return {
			status: result?.status ?? 500,
			response: result ?? "Server error"
		};
	}
};

export const putComment = async (
	id: string,
	data: UpsertCommentDTO
): Promise<ApiResponse> => {
	try {
		const result = await axios.put(`${SERVER_URL}/comments/${id}`, data);
		return {
			status: result.status,
			response: result
		};
	} catch (error) {
		console.log(error);
		const result = (error as AxiosError).response;
		return {
			status: result?.status ?? 500,
			response: result ?? "Server error"
		};
	}
};
