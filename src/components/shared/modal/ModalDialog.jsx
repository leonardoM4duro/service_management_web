import React from 'react';

function ModalDialog({ show, title, message, onOk, onCancel, okText = 'Ok', cancelText, children, actions }) {
  if (!show) return null;
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 2px 16px #aaa', padding: 32, minWidth: 320, textAlign: 'center' }}>
        {title && <h4>{title}</h4>}
        {message && <h5>{message}</h5>}
        {children}
        <div className="mt-4 d-flex gap-2 justify-content-center">
          {actions ? actions : (
            <>
              {cancelText && <button className="btn btn-outline-secondary" onClick={onCancel}>{cancelText}</button>}
              <button className="btn btn-primary" onClick={onOk}>{okText}</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ModalDialog;
