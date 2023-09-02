import React, { useState } from "react";

const Rating = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    console.log("Calificación:", rating);
    console.log("Comentario:", comment);
  };

  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((value) => (
        <label key={value} className="cursor-pointer">
          <input
            type="radio"
            name="rating"
            value={value}
            checked={rating === value}
            onChange={() => handleRatingChange(value)}
            className="sr-only"
          />
          <span
            className={`text-3xl ${
              rating >= value ? "text-yellow-500" : "text-gray-400"
            }`}
          >
            ★
          </span>
        </label>
      ))}
      <div className="mt-2">
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-gray-700"
        >
          Comentario:
        </label>
        <textarea
          id="comment"
          name="comment"
          rows="4"
          value={comment}
          onChange={handleCommentChange}
          className="mt-1 p-2 border rounded-md w-full"
        ></textarea>
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Enviar
      </button>
    </div>
  );
};

export default Rating;

// ★
