import React, { useState, Suspense } from "react";
import "./App.css";
import EnrolmentForm from "./Enrolment/EnrolmentForm";
// import EnrolList from "./Enrollment/EnrolList";
const EnrolList = React.lazy(() => import("./Enrolment/EnrolList"));

const App = () => {
  const [program, setProgram] = useState("UG");
  const [ugSeats, setUgSeats] = useState(60);
  const [pgSeats, setPgSeats] = useState(40);
  const [studentDetails, setStudentDetails] = useState({});
  const [action, setAction] = useState();
  const [selItemId, setSelItemId] = useState();
  const [isUGChecked, setIsUGChecked] = useState(true);
  const [isRestoreSeats, setIsRestoreSeats] = useState(false);

  const handleChange = (event) => {
    setProgram(event.target.value);
    setIsUGChecked(!isUGChecked);

    if (isRestoreSeats) {
      event.target.value === "UG"
        ? setPgSeats(pgSeats + 1)
        : setUgSeats(ugSeats + 1);
      setIsRestoreSeats(false);
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
  const setSelectedProgram = (selProgram) => {
    selProgram === "UG" ? setIsUGChecked(true) : setIsUGChecked(false);
    setProgram(selProgram);
    setIsRestoreSeats(true);
  };

  const setUpdatedSeats = (updatedSeats) => {
    if (program === "UG") {
      setUgSeats(updatedSeats);
    } else {
      setPgSeats(updatedSeats);
    }
  };

  return (
    <div className="App">
      <div className="programs">
        <h3 className="title">Student Enrolment Form</h3>
        <ul className="ulEnrol">
          <li className="parentLabels">
            <input
              type="radio"
              value="UG"
              name="programGroup"
              onChange={handleChange}
              checked={isUGChecked}
            />
            Undergraduate
            <input
              type="radio"
              className="radioSel"
              value="PG"
              name="programGroup"
              onChange={handleChange}
              checked={!isUGChecked}
            />
            Postgraduate
          </li>
          <li>
            <label className="parentLabels">
              Remaining {program} Seats - {program === "UG" ? ugSeats : pgSeats}
            </label>
          </li>
        </ul>
      </div>
      <EnrolmentForm
        setStudentDetails={setStudentDetails}
        handleItemSelection={handleItemSelection}
      />
      <Suspense
        fallback={
          <div className="enrolList">Enrolled students details loading...</div>
        }
      >
        <EnrolList
          studentDetails={studentDetails}
          setStudentDetails={setStudentDetails}
          selectedItemId={selItemId}
          action={action}
          restoreSeats={restoreSeats}
          chosenProgram={program}
          setUpdatedSeats={setUpdatedSeats}
          currentSeats={program === "UG" ? ugSeats : pgSeats}
          setSelectedProgram={setSelectedProgram}
        />
      </Suspense>
    </div>
  );
};

export default App;
