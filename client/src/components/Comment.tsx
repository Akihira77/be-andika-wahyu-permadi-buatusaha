import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
	id: string;
	name: string;
	comment: string;
};

const Comment: React.FC<Props> = ({ id, name, comment }) => {
	const navigate = useNavigate();

	return (
		<div
			className="container-fluid border p-3 border-dark"
			style={{ width: "600px" }}
		>
			<div className="comment__field border border-black p-3">
				<main className="text-start">
					<div>
						<h1 className="fs-6 d-flex align-items-center gap-1">
							<span
								className="d-inline-block text-truncate"
								style={{ maxWidth: "250px" }}
							>
								{name}
							</span>
							<span style={{ fontSize: "13px" }}>({id})</span>
						</h1>
					</div>
					<p
						className="overflow-auto"
						style={{ minHeight: "50px", maxHeight: "200px" }}
					>
						{comment}
					</p>
				</main>
				<div className="edit__button">
					<button
						className="btn btn-link"
						onClick={() => navigate(`/update/${id}`)}
						style={{ fontSize: "14px" }}
					>
						Edit Komentar
					</button>
				</div>
			</div>
		</div>
	);
};

export default Comment;
