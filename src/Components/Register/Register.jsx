import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function Register() {

  let navigate = useNavigate();

  const [users, setUsers] = useState({

    first_name: "",
    last_name: "",
    age: "",
    email: "",
    password: "",

  })

  const [isLoading, setisLoading] = useState(false);

  const [errorsAPI, seterrorsAPI] = useState("")

  const [errorValidation, seterrorValidation] = useState([])

  function getData(eventInfo) {

    let myUsers = { ...users };

    myUsers[eventInfo.target.name] = eventInfo.target.value;

    setUsers(myUsers);

  }

  async function submitData(e) {

    e.preventDefault();

    let validate = validateData();

    if (validate.error == null) {

      setisLoading(true);

      let { data } = await axios.post(`https://route-movies-api.vercel.app/signup`, users);

      setisLoading(false);

      if (data.message == "success") {

        navigate("/login");

      } else {

        seterrorsAPI(data.message);
      }

    } else {

      seterrorValidation(validate.error.details);

    }


  }

  function validateData() {

    let schema = Joi.object({

      first_name: Joi.string().min(3).max(100).alphanum().required().trim(),
      last_name: Joi.string().min(3).max(100).alphanum().required().trim(),
      age: Joi.number().min(18).max(89).required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: false }).required().trim(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().trim(),

    })

    return schema.validate(users, { abortEarly: false })
  }

  return (
    <div>

      <h2>Register</h2>

      <form onSubmit={submitData} className='my-3'>

        {/* {errorValidation.length > 0 ? errorValidation.map((error, index) => <div key={index} className="alert alert-danger" role="alert"> {error.path[0] == "password" ? "Invalid Password" : error.message} </div>) : ""} */}

        {errorsAPI.length > 0 ? <div className="alert alert-danger" role="alert"> {errorsAPI} </div> : ""}

        <label htmlFor="first_name">First Name</label>
        <input onChange={getData} className='form-control mb-3 mt-2' type="text" name="first_name" id="first_name" />

        {errorValidation.filter((error) => error.context.label == "first_name")[0] ? <div className="alert alert-danger" role="alert"> {errorValidation.filter((error) => error.context.label == "first_name")[0]?.message} </div> : ""}


        <label htmlFor="last_name">Last Name</label>
        <input onChange={getData} className='form-control mb-3 mt-2' type="text" name="last_name" id="last_name" />

        {errorValidation.filter((error) => error.context.label == "last_name")[0] ? <div className="alert alert-danger" role="alert"> {errorValidation.filter((error) => error.context.label == "last_name")[0]?.message} </div> : ""}


        <label htmlFor="age">Age</label>
        <input onChange={getData} className='form-control mb-3 mt-2' type="number" name="age" id="age" />

        {errorValidation.filter((error) => error.context.label == "age")[0] ? <div className="alert alert-danger" role="alert"> {errorValidation.filter((error) => error.context.label == "age")[0]?.message} </div> : ""}


        <label htmlFor="email">Email</label>
        <input onChange={getData} autoComplete="off" className='form-control mb-3 mt-2' type="email" name="email" id="email" />

        {errorValidation.filter((error) => error.context.label == "email")[0] ? <div className="alert alert-danger" role="alert"> {errorValidation.filter((error) => error.context.label == "email")[0]?.message} </div> : ""}


        <label htmlFor="password">Password</label>
        <input onChange={getData} autoComplete="off" className='form-control mb-3 mt-2' type="password" name="password" id="password" />

        {errorValidation.filter((error) => error.context.label == "password")[0] ? <div className="alert alert-danger" role="alert"> {errorValidation.filter((error) => error.context.label == "password")[0]?.message} </div> : ""}


        {isLoading ? <button type='button' className='btn btn-outline-info'><i className=' fa fa-spinner fa-spin'></i></button> : <button type='submit' className='btn btn-outline-info'>Submit</button>}

      </form>

    </div>
  )
}
