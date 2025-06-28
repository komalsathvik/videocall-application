import { Routes, Route } from "react-router-dom";
import Join from "./Join";
import VideoCall from "./VideoCall";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Join />} />
      <Route path="/call" element={<VideoCall />} />
    </Routes>
  );
}
