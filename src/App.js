import { useEffect, useState } from "react";
import "./App.css";
import EnrollmentForm from "./Enrollment/EnrollmentForm";
import EnrolList from "./Enrollment/EnrolList";

function App() {
  const [program, setProgram] = useState("UG");
  const [pgSeats, setPgSeats] = useState(40);
  const [ugSeats, setUgSeats] = useState(60);
  const [currentSeats, setCurrentSeats] = useState(0);
  const [studentDetails, setStudentDetails] = useState({});
  const [action, setAction] = useState();
  const [selItemId, setSelItemId] = useState();

  const onUpdatedSeats = (updatedSeats) => {
    program === "PG" ? setPgSeats(updatedSeats) : setUgSeats(updatedSeats);
    setCurrentSeats(updatedSeats);
    // setCurrentSeats(val);
  };

  const handleChange = (e) => {
    const prog = e.target.value;
    console.log(prog);
    setProgram(prog);
    setPgSeats(pgSeats);
    setUgSeats(ugSeats);

    if (prog === "PG") {
      setCurrentSeats(pgSeats);
    } else {
      setCurrentSeats(ugSeats);
    }
  };
  const handleItemSelection = (action, id) => {
    setAction(action);
    setSelItemId(id);
  };
  const restoreSeats = (pgm) => {
    pgm === "UG" ? setUgSeats(ugSeats + 1) : setPgSeats(pgSeats + 1);
    setAction("");
  };
  useEffect(() => {
    if (program === "PG") {
      setCurrentSeats(pgSeats);
    } else {
      setCurrentSeats(ugSeats);
    }
  }, [program, pgSeats, ugSeats]);

  return (
    <div className="App">
      <div className="programs">
        <h3 className="title">Student Enrolment Form</h3>
        <ul className="ulEnrol">
          <li className="parentLabels" onChange={handleChange}>
            {/* <select
              className="appDropDowns"
              value={program}

            >
              <option value="UG">Undergraduate</option>
              <option value="PG">Postgraduate</option>
            </select> */}
            <input
              type="radio"
              className="radioSel"
              value="UG"
              name="programGroup"
              defaultChecked
            />
            Undergraduate
            <input
              type="radio"
              className="radioSel"
              value="PG"
              name="programGroup"
            />
            Postgraduate
          </li>
          <li>
            <label className="parentLabels">
              Remaining {program} Seats - {currentSeats}
              {/* program === "UG" ? ugSeats : pgSeats */}
            </label>
          </li>
        </ul>
      </div>

      <EnrollmentForm
        chosenProgram={program}
        currentSeats={program === "UG" ? ugSeats : pgSeats}
        setUpdatedSeats={onUpdatedSeats}
        setStudentDetails={setStudentDetails}
        handleItemSelection={handleItemSelection}
      />
      <EnrolList
        studentDetails={studentDetails}
        setStudentDetails={setStudentDetails}
        selectedItemId={selItemId}
        action={action}
        restoreSeats={restoreSeats}
      />
    </div>
  );
}

export default App;
