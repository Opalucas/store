import { useState } from 'react';

import Button from 'react-bootstrap/Button';

function AlertSucces({message}) {
  

  if (show) {
    return (
      
    );
  }
  return <Button onClick={() => setShow(true)}>Show Alert</Button>;
}

export default AlertSucces;