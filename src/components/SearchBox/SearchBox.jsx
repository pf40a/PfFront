import { useState } from 'react'
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useEffect } from "react"

import { allTypesRooms, filterTypesRooms } from "../../redux/actions"

export default function SearchBox () {
const dispatch = useDispatch()
const [listHabitaciones, setListHabitaciones] = useState([])
// const {typesRooms} = useSelector(state => state.typesRooms)
// console.log('TP',typesRooms)

useEffect(() => {
 const fetchData = async () => {
  dispatch(await allTypesRooms());
  dispatch(await filterTypesRooms('Gold'));
};

fetchData();

},[])

function handleSubmit(e) {

}

 return (
  <div className="mx-auto">
  <form onSubmit={handleSubmit}>

  </form>
  
  </div>
 )
}