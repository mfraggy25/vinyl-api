import React from "react";
import { connect } from "react-redux";
import "./visibility-filter-input.scss";

import Form from "react-bootstrap/Form";

import { setFilter } from "../../actions/actions";

function VisibilityFilterInput(props) {
  return (
    <Form.Control
      onChange={(e) => props.setFilter(e.target.value)}
      value={props.visibilityFilter}
      placeholder="Search by artist or album title"
    />
  );
}

export default connect(null, { setFilter })(VisibilityFilterInput);
