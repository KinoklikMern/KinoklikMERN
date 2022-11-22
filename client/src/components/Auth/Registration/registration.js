import React, { useState, setState } from "react";
import "./style.css";
function RegistrationForm() {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [role, setRole] = useState("Viewer");
  const [confirmPassword, setConfirmPassword] = useState(null);
  const options = [
    {
      label: "Viewer",
      value: "Viewer",
    },
    {
      label: "FILM_MAKER",
      value: "FILM_MAKER",
    },
    {
      label: "Sales_Agent",
      value: "Sales_Agent",
    },
    {
      label: "Distributor",
      value: "Distributor",
    },
    {
      label: "Film_Festival",
      value: "Film_Festival",
    },
  ];
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "firstName") {
      setFirstName(value);
    }
    if (id === "lastName") {
      setLastName(value);
    }
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
    if (id === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = () => {
    console.log(firstName, lastName, email, password, confirmPassword);
    fetch("http://localhost:8000/users/register", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        role: role,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((data) => data.json())
      .then((json) => alert(JSON.stringify(json)));
  };

  return (
    <div className="form">
      <div className="form-body">
        <div className="username">
          <label className="form__label" for="firstName">
            First Name{" "}
          </label>
          <input
            className="form__input"
            type="text"
            value={firstName}
            onChange={(e) => handleInputChange(e)}
            id="firstName"
            placeholder="First Name"
          />
        </div>
        <div className="lastname">
          <label className="form__label" for="lastName">
            Last Name{" "}
          </label>
          <input
            type="text"
            name=""
            id="lastName"
            value={lastName}
            className="form__input"
            onChange={(e) => handleInputChange(e)}
            placeholder="LastName"
          />
        </div>
        <div className="email">
          <label className="form__label" for="email">
            Email{" "}
          </label>
          <input
            type="email"
            id="email"
            className="form__input"
            value={email}
            onChange={(e) => handleInputChange(e)}
            placeholder="Email"
          />
        </div>

        <div className="password">
          <label className="form__label" for="password">
            Role{" "}
          </label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div className="password">
          <label className="form__label" for="password">
            Password{" "}
          </label>
          <input
            className="form__input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => handleInputChange(e)}
            placeholder="Password"
          />
        </div>
        <div className="confirm-password">
          <label className="form__label" for="confirmPassword">
            Confirm Password{" "}
          </label>
          <input
            className="form__input"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => handleInputChange(e)}
            placeholder="Confirm Password"
          />
        </div>
      </div>

      <button onClick={() => handleSubmit()} type="submit" class="btn">
        Register
      </button>
    </div>
  );
}

export default RegistrationForm;
