import React, { useState } from 'react';

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
    <>
      {!open && <div onClick={openFunc}>open</div>}
      
      {open && (
        <>
          <div onClick={closeFunc}>close</div>
          <div>
            説明が入る
          </div>
        </>
      )}
      <style>{`
      
      `}</style>
    </>
  );
}

export default Drawer;
