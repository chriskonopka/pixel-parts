import * as React from 'react';

export interface MockButton { 
    children: React.ReactNode
    onClick?: () => void 
}

const Button = ({ children, onClick }: MockButton) => {
  return (
    <button onClick={onClick} style={{
      backgroundColor: '#292929',
      cursor: 'pointer',
      border: '1px solid #00a68e',
      display: 'block',
      color: '#fff',
      width: '100%',
      height: 40,
      padding: '0 20px',
      borderRadius: 6,
      fontSize: 15
    }}>
      {children}
    </button>
  );
};

export default Button;