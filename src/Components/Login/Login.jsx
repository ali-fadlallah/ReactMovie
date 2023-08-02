import Joi from 'joi';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ saveUserData }) {

  let navigate = useNavigate();

  const [users, setUsers] = useState({

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

      let { data } = await axios.post(`https://movies-api.routemisr.com/signin`, users);

      setisLoading(false);

      if (data.message == "success") {

        saveUser(data.token)

        navigate("/");

      } else {

        seterrorsAPI(data.message);
      }

    } else {

      seterrorValidation(validate.error.details);

    }


  }

  function saveUser(token) {

    localStorage.setItem("movie-db", token);

    saveUserData();
  }

  function validateData() {

    let schema = Joi.object({

      email: Joi.string().email({ minDomainSegments: 2, tlds: false }).required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

    })

    return schema.validate(users, { abortEarly: false })
  }

  return (
    <div>

      <h2>Login</h2>

      <form onSubmit={submitData} className='my-3'>

        {/* {errorValidation.length > 0 ? errorValidation.map((error, index) => <div key={index} className="alert alert-danger" role="alert"> {error.path[0] == "password" ? "Invalid Password" : error.message} </div>) : ""} */}

        {errorsAPI.length > 0 ? <div className="alert alert-danger" role="alert"> {errorsAPI} </div> : ""}


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
