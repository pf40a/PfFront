import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@tremor/react";
const ReviewAdmin = () => {
  const userEmail = useSelector((state) => state.auth.email);
  const [usersList, setUsersList] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/hotel/users/`
        );

        const users = response.data.data;

        setUsersList(users);
      } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
      }
    };

    fetchUserData();
  }, []);

  const isUserAuthenticated = userEmail === "hoteloasis48@gmail.com";

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

  const handleDeleteReview = async (id, isDeleted) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/hotel/reviews/disable/${id}`,
        {
          deleted: !isDeleted, // Alternar el valor "deleted"
        }
      );

      if (response.status === 200) {
        // Actualiza la lista de reseñas para reflejar el cambio
        const updatedReviews = reviews.map((review) =>
          review.id === id ? { ...review, deleted: !isDeleted } : review
        );
        console.log(updatedReviews);
        setReviews(updatedReviews);
      } else {
        console.error(
          `Error al alternar el estado de eliminación para la reseña con ID ${id}`
        );
        // Maneja los errores adecuadamente aquí
      }
    } catch (error) {
      console.error(
        `Error al alternar el estado de eliminación para la reseña con ID ${id}:`,
        error
      );
      // Maneja los errores adecuadamente aquí
    }
  };
  return (
    <div className="space-y-4">
      {isUserAuthenticated && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center text-center"
            >
              <div className="mb-2 flex-grow">
                <span className="text-gray-700">{review.comentario}</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-base mt-2">
                {Array(review.rating)
                  .fill(null)
                  .map((_, index) => (
                    <span key={index} className="text-yellow-500 text-3xl">
                      ★
                    </span>
                  ))}
              </div>

              <Button
                onClick={() => handleDeleteReview(review.id, review.deleted)}
                color={review.deleted === false ? "emerald" : "red"}
                className="flex-row"
              >
                <div className="flex items-center">
                  <div className="mr-2">
                    {review.deleted === false ? "activo" : "inactivo"}
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                </div>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewAdmin;
