import React, { useState } from 'react';
import styled from 'styled-components';

const Open = styled.div`
  display: block;
  text-align: center;
  color: #fff;
  top: 75px;
  left: 50px;
  position: fixed;
`;
const OpenButton = styled.div`
  text-align: center;
  color: #fff;
  margin: 0 auto;
  top: 50px;
  left: 50px;
  position: fixed;
`;
const CloseButton = styled.div`
  text-align: center;
  color: #fff;
  margin: 0 auto;
  top: 50px;
  left: 50px;
  position: fixed;
`;

const Drawer = () => {
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);

  console.log(close);
  
  const openFunc = () => {
    setOpen(true);
    setClose(false);
  }
  const closeFunc = () => {
    setOpen(false);
    setClose(true);
  }

  return (
    <React.Fragment>
      {!open && <OpenButton onClick={openFunc}>open</OpenButton>}
      
      {open && (
        <React.Fragment>
          <CloseButton onClick={closeFunc}>close</CloseButton>
          <Open>
            説明が入る
          </Open>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Drawer;
