import { CommentDtoType } from "./dtos/comment/common.dto.js";
import { v4 as uuidv4 } from "uuid";

export let comments: CommentDtoType[] = [
	{
		id: uuidv4(),
		name: "Andika Wahyu Permadi",
		comment: "ini comment pertama saya"
	}
];
