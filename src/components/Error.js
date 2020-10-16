import React from 'react';

function Error({mensaje}) {
    return (
        <p className="my-3 p-4 alert-primary alert-danger">
            {mensaje}
        </p>
    );
}

export default Error;