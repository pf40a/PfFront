import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Review = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false); // Estado para mostrar el formulario
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(true); // Estado para mostrar el formulario
  const [reviews, setReviews] = useState([]);

  const user = useSelector((state) => state.auth);
  console.log(user);
  const authenticatedEmail = user.email;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/hotel/reviews/"
        );
        const reviewsData = response.data.data;
        console.log(reviewsData);
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error al obtener las revisiones:", error);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/hotel/users/");

        const users = response.data.data;

        setUsersList(users);
        const caca = usersList.some(
          (user) => user.email === authenticatedEmail
        );

        if (!caca) {
          setIsUserAuthenticated(false);
        }
      } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    const data = {
      UsuarioId: user.uid,
      rating: rating,
      comentario: comment,
      deleted: false,
    };
    axios
      .post("http://localhost:3001/hotel/reviews/", data)
      .then((response) => {
        console.log("Solicitud POST exitosa:", response.data);

        setShowReviewForm(false); //ocultar form review
      })
      .catch((error) => {
        console.error("Error al enviar la solicitud POST:", error);
      });
  };

  const renderStars = (numStars) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-3xl ${
            i <= numStars ? "text-yellow-500" : "text-gray-400"
          }`}
        >
          ★
        </span>
      );
    }
    return stars;
  };
  console.log(isUserAuthenticated);
  return (
    <div className="rating">
      {isUserAuthenticated && (
        <div>
          <button
            className="mt-4 bg-green-300 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowReviewForm(true)}
          >
            DANOS TU OPINIÓN ACERCA DE LA ESTADÍA EN OASIS HOTEL
          </button>
          {showReviewForm && (
            <div>
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
          )}
        </div>
      )}
      <div>
        <h2>Review:</h2>
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p>
                {" "}
                {review.Usuario.nombre}{" "}
                {review.Usuario.apellido !== "Sin apellido" &&
                  review.Usuario.apellido}
              </p>

              <div>{renderStars(review.rating)}</div>
              <p> {review.comentario}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Review;
