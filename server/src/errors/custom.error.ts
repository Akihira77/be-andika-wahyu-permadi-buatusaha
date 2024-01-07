export default class CustomError extends Error {
	constructor(readonly statusCode: number, message: string) {
		super(message);
	}
}
