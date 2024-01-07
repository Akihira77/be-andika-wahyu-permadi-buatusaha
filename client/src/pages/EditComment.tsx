import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorObject, UpsertCommentDTO } from "../utils/types.ts";
import { getCommentById, putComment } from "../utils/api.ts";
import { ToastContainer, toast } from "react-toastify";

const EditComment: React.FC = () => {
	const { id } = useParams();
	const [commentData, setCommentData] = React.useState<UpsertCommentDTO>();
	const [errors, setErrors] = React.useState<ErrorObject>();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		console.log(commentData);
		if (!commentData) {
			return;
		}

		const { response } = await putComment(id!, commentData);

		if (typeof response === "string") {
			notify(response, "error");
		} else if ("message" in response.data) {
			notify(response.data.message, "success");
		} else {
			setErrors(response.data.error);
			console.log(response);
		}
	};

	const notify = (
		message: string,
		type: "info" | "success" | "error" | "default"
	) =>
		toast(message, {
			position: "top-right",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: false,
			progress: undefined,
			theme: "light",
			type
		});

	React.useEffect(() => {
		const findComment = async () => {
			const { data } = await getCommentById(id!);

			setCommentData({
				name: data.comment.name,
				comment: data.comment.comment
			});
		};

		findComment();
	}, [id]);

	return (
		<>
			<div className="container-fluid d-flex flex-column align-items-center pt-5">
				<h2>Edit Komentar</h2>
				{errors && (
					<ul className="text-danger" style={{ width: "600px" }}>
						{Object.entries(errors).map(([field, message]) => (
							<li key={field}>
								<span className="object__key d-block">
									{field}
								</span>
								<ul>
									{Array.isArray(message) &&
										message.map((item, id) => (
											<li key={id}>
												<span className="object__value">
													{item}
												</span>
											</li>
										))}
								</ul>
							</li>
						))}
					</ul>
				)}
				<div
					className="comment__field border border-black p-3 mt-5"
					style={{ width: "600px" }}
				>
					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label htmlFor="user__name" className="form-label">
								Nama
							</label>
							<input
								type="text"
								className="form-control"
								id="user__name"
								defaultValue={commentData?.name}
								onChange={(e) =>
									setCommentData({
										...commentData!,
										name: e.target.value
									})
								}
								required
								maxLength={50}
							/>
						</div>
						<div className="form-floating mb-3">
							<textarea
								className="form-control"
								placeholder="Leave a comment here"
								id="floatingTextarea"
								style={{ height: "150px" }}
								defaultValue={commentData?.comment}
								onChange={(e) =>
									setCommentData({
										...commentData!,
										comment: e.target.value
									})
								}
								required
								maxLength={1000}
							></textarea>
							<label htmlFor="floatingTextarea">Comments</label>
						</div>
						<div className="submit__button d-flex justify-content-between">
							<button
								className="btn btn-secondary"
								onClick={() => navigate("/")}
							>
								Back to List
							</button>
							<button className="btn btn-primary">Submit</button>
						</div>
					</form>
				</div>
			</div>
			<ToastContainer />
		</>
	);
};

export default EditComment;
