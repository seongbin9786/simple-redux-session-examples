import React from 'react';

const containerCss = { 
    border: '1px solid black', 
    maxWidth: 800,
    margin: '0 auto', 
    minHeight: 100, 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center' 
};

const CenterChild = ({ children }) => <div style={containerCss}>{children}</div>;

export default CenterChild;