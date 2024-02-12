import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { BayModal } from "./BayModal";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

export const Bay = ({ bay }) => {
  const { idbay, plate, date, ruc, rego, cof } = bay;
  const [plateText, setPlateText] = useState(plate);
  const [dateText, setDateText] = useState(date);
  const [rucValue, setRucValue] = useState(ruc);
  const [regoValue, setRegoValue] = useState(rego);
  const [cofValue, setCofValue] = useState(cof);
  const [isEditing, setIsEditing] = useState(false);

  const updatedBay = {
    idbay,
    plate: plateText,
    date: dateText,
    rego: regoValue,
    ruc: rucValue,
    cof: cofValue,
  };

  useEffect(() => {
    setPlateText(plate);
    setDateText(date);
    setRegoValue(rego);
    setRucValue(ruc);
    setCofValue(cof);
  }, [plate, date, rego, ruc, cof]);

  const handleSave = (updatedPlate, updatedDate, updatedRuc, updatedRego, updatedCof) => {
    setPlateText(updatedPlate);
    setDateText(updatedDate);
    setRegoValue(updatedRego);
    setRucValue(updatedRuc);
    setCofValue(updatedCof);
  };

  return (
    <div className="">
      {isEditing ? (
        <BayModal
          position={idbay}
          bay={updatedBay}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className="editableItem">
          <div className="bayPosition" onClick={() => setIsEditing(!isEditing)}>
            <p>{idbay}</p>
          </div>
          <div className="bayContent">
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">PLATE</InputGroup.Text>
              <Form.Control
                placeholder="AAA123"
                aria-label="Plate"
                aria-describedby="basic-addon1"
                defaultValue={plateText}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">DATE</InputGroup.Text>
              <Form.Control
                placeholder="31/05"
                aria-label="Date"
                aria-describedby="basic-addon1"
                defaultValue={dateText}
              />
            </InputGroup>
            <div className="buttons">
              <Button
                htmlFor="rego"
                variant={regoValue ? "success" : "danger"}
                disabled
                className="btn-block"
              >
                REGO
              </Button>
              <Button
                htmlFor="ruc"
                variant={rucValue ? "success" : "danger"}
                disabled
                className="btn-block"
              >
                RUC
              </Button>
              <Button
                htmlFor="cof"
                variant={cofValue ? "success" : "danger"}
                disabled
                className="btn-block"
              >
                COF
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
