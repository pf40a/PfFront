import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveSearch } from "../../redux/actions";

export default function SearchBox() {
  let { pathname } = useLocation();
  const dispatch = useDispatch();

  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [isCheckInCalendarOpen, setIsCheckInCalendarOpen] = useState(false);
  const [isCheckOutCalendarOpen, setIsCheckOutCalendarOpen] = useState(false);

  let search = useSelector((state) => state.search);
  
  //console.log('Form',diets)
  const validate = (inputs) => {
    let err = {};

    if (!inputs.fechaIn || inputs.fechaIn.length < 10) {
      err.fechaIn = "Falta la Fecha de Ingreso";
    }
    if (!inputs.fechaOut || inputs.fechaOut.length < 10) {
      err.fechaOut = "Falta la Fecha de Salida";
    }
    if (inputs.adultos < 1) {
      err.adultos = "Falta el número de adultos";
    }

    return err;
  };

  const [inputs, setInputs] = useState(search);
  //console.log('IN',inputs)
  const [errors, setErrors] = useState({
    fechaIn: "",
    fechaOut: "",
    adultos: "",
    niños: "",
  });

  const handleChange = (event) => {
    let campo = event.target.name;
    let valor = event.target.value;
    console.log('change',campo,valor)
setInputs({ ...inputs, [campo]: valor });

    setErrors(validate({ ...inputs, [campo]: valor }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //
    dispatch(saveSearch(inputs));
    //
  };

  console.log('inp',inputs)

  function formatDate(date) {
    return date.toISOString().slice(0, 10);
  }

  return (
    <div className="mx-auto -mt-4">
      <form onSubmit={handleSubmit}>
        <div className="search-form bg-yellow-200 p-2 rounded-md shadow-md text-center md:text-left flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8 md:items-end md:justify-between  align-bottom md:p-4">
          <div className="flex flex-col">
            <label>Fecha de Ingreso:</label>
            <DatePicker
              selected={checkInDate}
              onChange={(date) => {
                setCheckInDate(date);
                setInputs({ ...inputs, 'fechaIn': formatDate(date) })
              }}
              onClickOutside={() => setIsCheckInCalendarOpen(false)}
              onFocus={() => setIsCheckInCalendarOpen(true)}
              open={isCheckInCalendarOpen}
              dateFormat="yyyy-MM-dd"
              minDate={new Date()}
              className="border rounded-md"
              placeholderText="Ingreso"
              value={inputs.fechaIn}
              name="fechaIn"
            />
          </div>
          <div className="flex flex-col">
            <label>Fecha de Salida:</label>
            <DatePicker
              selected={checkOutDate}
              onChange={(date) => {
                setCheckOutDate(date);
                handleChange;
              }}
              onClickOutside={() => setIsCheckOutCalendarOpen(false)}
              onFocus={() => setIsCheckOutCalendarOpen(true)}
              open={isCheckOutCalendarOpen}
              dateFormat="yyyy-MM-dd"
              minDate={checkInDate ? new Date(checkInDate) : new Date()}
              className="border rounded-md"
              placeholderText="Salida"
              value={inputs.fechaOut}
              name="fechaOut"
            />
          </div>
          <div className="flex flex-col">
            <label>Adultos</label>
            <input
              type="number"
              min="1"
              value={inputs.adultos}
              name="adultos"
              className="border rounded-md w-14 text-center"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label>Niños</label>
            <input
              type="number"
              min="0"
              value={inputs.niños}
              name="niños"
              className="border rounded-md w-14 text-center"
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-orange-950 text-white px-10 py-2"
            >
              Buscar
            </button>
          </div>
        </div>
        {errors.fechaIn && <div className="danger">{errors.fechaIn}</div>}
        {errors.fechaOut && <div className="danger">{errors.fechaOut}</div>}
        {errors.adultos && <div className="danger">{errors.adultos}</div>}
      </form>
    </div>
  );
}
