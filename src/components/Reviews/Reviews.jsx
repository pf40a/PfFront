import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Review = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false); // Estado para mostrar el formulario

  const user = useSelector((state) => state.auth);
  console.log(user);
  const authenticatedEmail = user.email;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/hotel/users");

        const users = response.data.data;
        // console.log(users[0].id);
        // setUsersList(users);
      } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
      }
    };

    fetchUserData();
  }, []);

  const isUserAuthenticated = usersList.some(
    (user) => user.email === authenticatedEmail
  );

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    console.log("Calificación:", rating);
    console.log("Comentario:", comment);
    const data = {
      UsuarioId: user.uid,
      rating: rating,
      comentario: comment,
      deleted: false,
      Usuario: {
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
      },
    };
    axios
      .post("http://localhost:3001/hotel/reviews/", data)
      .then((response) => {
        console.log("Solicitud POST exitosa:", response.data);
        // Realiza acciones adicionales después de enviar los datos, si es necesario.
        // Por ejemplo, podrías ocultar el formulario aquí
        setShowReviewForm(false);
      })
      .catch((error) => {
        console.error("Error al enviar la solicitud POST:", error);
        // Maneja errores aquí si es necesario.
      });
  };

  return (
    <div className="rating">
      {isUserAuthenticated && (
        <div>
          <button onClick={() => setShowReviewForm(true)}>
            Completar Revisión
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
    </div>
  );
};

export default Review;
