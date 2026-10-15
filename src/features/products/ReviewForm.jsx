import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createProductReview } from "../../api/productApi";

function ReviewForm({ productId, onReviewAdded }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      toast.error("Please add a comment");
      return;
    }

    setSubmitting(true);
    try {
      await createProductReview(productId, { rating, comment });
      toast.success("Review submitted");
      setComment("");
      setRating(5);
      onReviewAdded?.(); // let the parent refetch product details to show the new review
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    submitting && (
      <form onSubmit={handleSubmit} className="space-y-3 border-t border-[#1B2340]/10 pt-6 mt-6">
      <h3 className="font-semibold">Write a review</h3>

      <div>
        <label className="block text-sm mb-1">Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border border-[#1B2340]/20 rounded px-3 py-2 bg-white"
        >
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {"★".repeat(n)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm mb-1">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          className="w-full border border-[#1B2340]/20 rounded px-3 py-2 bg-white"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="px-5 py-2 rounded font-medium disabled:opacity-50"
        style={{ backgroundColor: "#D85A30", color: "#FDF1EC" }}
      >
        {submitting ? "Submitting..." : "Submit review"}
      </button>
    </form>
    )
    
  );
}

export default ReviewForm;