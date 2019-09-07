import React from "react";
import { Row, Col, CustomInput, FormGroup, Label, Button, ButtonGroup } from 'reactstrap';

function Filter({ redFilterTrue, updateDBTrue }) {
  return (
    <FormGroup >
    <Label Options>Options:</Label>
      <CustomInput type="radio" id="redFilter" name="RadioredFilter" label="Exclude any items that include terms from the unideal filter" onClick={redFilterTrue} />
      <CustomInput type="radio" id="updateDB" name="RadioupdateDB"label="Save these search prreferences to your profile" onClick={updateDBTrue} />
    </FormGroup >

  );
}

export default Filter;