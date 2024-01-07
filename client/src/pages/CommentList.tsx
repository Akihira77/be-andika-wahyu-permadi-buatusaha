import React from "react";
import { CommentDTO } from "../utils/types.ts";
import { getAllComments } from "../utils/api.ts";
import Comment from "../components/Comment.tsx";
import { useNavigate } from "react-router-dom";

const CommentList: React.FC = () => {
	const [comments, setComments] = React.useState<CommentDTO[]>([]);
	const navigate = useNavigate();

	React.useEffect(() => {
		const findComments = async () => {
			const { data } = await getAllComments();

			setComments(data.comments);
		};

		findComments();
	}, []);

	return (
		<div className="container-fluid d-flex flex-column align-items-center py-5">
			<h2>List Komentar</h2>
			<div className="add__button mt-4">
				<button
					className="btn btn-primary"
					onClick={() => navigate("/create")}
				>
					Tambahkan Komentar
				</button>
			</div>
			<div className="mt-5 d-flex gap-3 flex-wrap">
				{comments &&
					comments.map((comment) => (
						<Comment
							key={comment.id}
							id={comment.id}
							name={comment.name}
							comment={comment.comment}
						/>
					))}
			</div>
		</div>
	);
};

export default CommentList;
