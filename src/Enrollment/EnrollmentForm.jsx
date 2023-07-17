import { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import "./EnrollmentForm.css";
const EnrolmentForm = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleClick = (event) => {
    handleInputReset("", "", "");

    props.setUpdatedSeats(props.currentSeats - 1);

    // Student ID generation
    const randomKey = Math.floor(1000 + Math.random() * 9000);
    const id = randomKey;
    props.setStudentDetails({
      key: id,
      fname: firstName,
      lname: lastName,
      program: props.chosenProgram,
      email: email,
      edit: <MdEdit className="actionIcon" />,
      delete: (
        <MdDelete
          className="actionIcon"
          onClick={() => props.handleItemSelection("delete", id)}
        />
      ),
    });

    event.preventDefault();
  };
  //change of input value set method
  const handleInputChange = (setInput, event) => {
    setInput(event.target.value);
  };
  //set input fields
  const handleInputReset = (fname, lname, email) => {
    setFirstName(fname);
    setLastName(lname);
    setEmail(email);
  };
  return (
    <div>
      <div className="enrolContainer">
        <form className="enrolForm" name="enrolForm">
          <ul className="ulEnrol">
            <li>
              <label htmlFor="firstname"></label>
              <input
                type="text"
                className="inputFields"
                id="firstname"
                name="firstname"
                placeholder="First Name"
                value={firstName}
                // setFirstName as a function parameter
                onChange={(event) => handleInputChange(setFirstName, event)}
              />
            </li>
            <li>
              <label htmlFor="lastname"></label>
              <input
                type="test"
                className="inputFields"
                id="lastname"
                name="lastname"
                placeholder="Last Name"
                value={lastName}
                onChange={(event) => handleInputChange(setLastName, event)}
              />
            </li>
            <li>
              <label htmlFor="email"></label>
              <input
                type="email"
                className="inputFields"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(event) => handleInputChange(setEmail, event)}
              />
            </li>
            <li id="center-btn">
              <input
                type="submit"
                id="btnEnrol"
                name="Enrol"
                alt="Enrol"
                value="Enroll"
                onClick={handleClick}
              />
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
};
export default EnrolmentForm;
