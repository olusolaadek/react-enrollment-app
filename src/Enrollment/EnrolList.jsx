import React, { useEffect } from "react";

import { DetailsList } from "@fluentui/react/lib/DetailsList";

import "./EnrolList.css";

// Columns for the detail list.
const columns = [
  {
    key: "edit",
    name: "Edit",
    fieldName: "edit",
    minWidth: 30,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: "fname",
    name: "First Name",
    fieldName: "fname",
    minWidth: 90,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: "lname",
    name: "Last Name",
    fieldName: "lname",
    minWidth: 90,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: "program",
    name: "Program",
    fieldName: "program",
    minWidth: 60,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: "email",
    name: "Email",
    fieldName: "email",
    minWidth: 130,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: "delete",
    name: "Delete",
    fieldName: "delete",
    minWidth: 30,
    maxWidth: 200,
    isResizable: true,
  },
];

// Test items
let items = [];

const EnrolList = (props) => {
  useEffect(() => {
    const curItemKey = props.studentDetails.key;
    // console.log(props.studentDetails);
    if (curItemKey) {
      items = [...items, props.studentDetails];
      props.setStudentDetails({});
    }
    //
    // Execute deletion on the selected item.
    // console.log(items);
    if (props.action === "delete") {
      const deletedItem = items.filter(
        (item) => item.key === props.selectedItemId
      )[0];

      // console.log("Selected item: ", deletedItem);
      // Remove the item from list
      items = items.filter((item) => item !== deletedItem);
      // update seats
      props.restoreSeats(deletedItem.program);
      props.setStudentDetails({});
    }
  }, [props]);

  return (
    <div className="enrolList">
      <DetailsList items={items} columns={columns} />
    </div>
  );
};
export default EnrolList;
