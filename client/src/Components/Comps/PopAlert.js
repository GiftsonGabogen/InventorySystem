import React from 'react';

const PopAlert = (props) => {
    return (
        <React.Fragment>
            {props.message === "" ? (
                ""
            ) : (
                    <div
                        className={`alert ${
                            props.Success === true
                                ? "alert-success"
                                : "alert-danger"
                            }`}
                        role="alert"
                    >
                        {props.message}
                    </div>
                )}
        </React.Fragment>
    );
};

export default PopAlert;