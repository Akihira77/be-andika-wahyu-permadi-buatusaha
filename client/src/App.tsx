import "./App.css";
import { Route, Routes } from "react-router-dom";
import CommentList from "./pages/CommentList.tsx";
import CreateComment from "./pages/CreateComment.tsx";
import EditComment from "./pages/EditComment.tsx";
import CommentDetails from "./pages/CommentDetails.tsx";

function App() {
	return (
		<>
			<Routes>
				<Route path="" element={<CommentList />} />
				<Route path="/create" element={<CreateComment />} />
				<Route path="/update/:id" element={<EditComment />} />
				<Route path="/:id" element={<CommentDetails />} />
			</Routes>
		</>
	);
}

export default App;
