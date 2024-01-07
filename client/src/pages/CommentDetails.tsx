import React from "react";
import { useParams } from "react-router-dom";
import { CommentDTO } from "../utils/types.ts";
import { getCommentById } from "../utils/api.ts";
import Comment from "../components/Comment.tsx";

const CommentDetails: React.FC = () => {
	const { id } = useParams();
	const [comment, setComment] = React.useState<CommentDTO>();

	React.useEffect(() => {
		const findComment = async () => {
			const { data } = await getCommentById(id!);

			setComment(data.comment);
		};

		findComment();
	}, [id]);

	return (
		<div className="container-fluid d-flex flex-column align-items-center pt-5">
			<h2>Edit Komentar</h2>
			{comment && (
				<Comment
					id={comment.id}
					name={comment.name}
					comment={comment.comment}
				/>
			)}
		</div>
	);
};

export default CommentDetails;
