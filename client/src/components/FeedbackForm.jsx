import { useState } from "react";
import axios from "axios";
import { server_dev_url } from "../utils/SD";

function FeedbackForm({ fetchFeedbacks }) {
  const [category, setCategory] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !comment.trim()) {
      alert("Please fill all fields.");
      return;
    }
    try {
      await axios.post(
        `${server_dev_url}/api/feedback`,
        { category, comment },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setCategory("");
      setComment("");
      fetchFeedbacks && fetchFeedbacks();
      alert("Feedback submitted successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit feedback.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      <h2>Submit Feedback</h2>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Select Category</option>
        <option value="Benefit">Benefit</option>
        <option value="Challenge">Challenge</option>
        <option value="Solution">Solution</option>
      </select>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Enter your feedback about computer-based testing"
        required
      />
      <button type="submit">Submit Feedback</button>
    </form>
  );
}

export default FeedbackForm;
