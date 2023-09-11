import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReviewsCarrousel from "../../views/ReviewsCarrousel/ReviewsCarrousel";

const Review = () => {
  const reviewId = useSelector((state) => state.auth.uid);
  const userEmail = useSelector((state) => state.auth.email);
  const [usersList, setUsersList] = useState([]);

  const [reviews, setReviews] = useState([]);
  const [reviewsDb, setReviewsDb] = useState([]);
  // console.log(reviews);
  const [review, setReview] = useState({
    rating: 0,
    comment: "",
  });
  const [charCount, setCharCount] = useState(200);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/hotel/users/`);

        const users = response.data.data;

        setUsersList(users);
      } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
      }
    };

    fetchUserData();
  }, []);

  const isUserAuthenticated = usersList.some(
    (user) => user.email === userEmail
  );

  const handleRatingChange = (value) => {
    setReview({ ...review, rating: value });
  };

  const handleCommentChange = (event) => {
    const inputText = event.target.value;
    const remainingChars = 200 - inputText.length; // Calcula caracteres restantes
    setCharCount(remainingChars); // Actualiza el contador
    if (remainingChars >= 0) {
      setReview({ ...review, comment: inputText });
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/hotel/reviews/`
        );
        const reviewsData = response.data.data;

        setReviews(reviewsData);
      } catch (error) {
        console.error("Error al obtener las revisiones:", error);
      }
    };

    fetchReviews();
  }, []);

  const handleSubmit = async () => {
    if (review.comment.length > 200) {
      alert("El comentario no puede exceder los 200 caracteres.");
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/hotel/reviews`, {
        UsuarioId: reviewId,
        rating: review.rating,
        comentario: review.comment,
        deleted: false,
      });
      console.log("REVIEW CREADA");
      setCharCount(200);
      setReview({ rating: 0, comment: "" });
      setShowReviewForm(false);
    } catch (error) {
      // Manejar errores
    }
    const pedido = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/hotel/reviews/`
        );
        const reviewsData = response.data.data;
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error al obtener las revisiones:", error);
      }
    };
    pedido();
  };

  return (
    <div className="space-y-4">
      {isUserAuthenticated && (
        <div>
          <div className="text-center">
            <button
              className="bg-[#16242f] hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowReviewForm(true)}
            >
              DEJANOS TU OPINION
            </button>
          </div>
          {showReviewForm && (
            <div className="max-w-md mx-auto p-4">
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <label
                      key={value}
                      className={`cursor-pointer ${
                        value <= review.rating
                          ? "text-purple-600"
                          : "text-gray-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="rating"
                        value={value}
                        onChange={() => handleRatingChange(value)}
                        className="sr-only"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 inline-block"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                      </svg>
                    </label>
                  ))}
                </div>
                <textarea
                  placeholder="Escribe tu comentario aquí..."
                  value={review.comment}
                  onChange={handleCommentChange}
                  className="w-full px-3 py-2 border rounded-md max-w-full overflow-x-auto"
                  maxLength={200}
                ></textarea>
                <p className="text-sm text-right text-gray-400">
                  Caracteres restantes: {charCount}
                </p>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
                >
                  Enviar
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      <div>
        <ReviewsCarrousel state={reviews} />
      </div>
    </div>
  );
};

export default Review;
