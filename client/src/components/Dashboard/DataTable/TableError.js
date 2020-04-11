import React from "react";
import PropTypes from "prop-types";

export const TableError = ({ error }) => {
    return (
        <div>Something went wrong fetching that data.</div>
    )
};

TableError.propTypes = {
    error: PropTypes.object
}