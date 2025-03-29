import React from 'react';

const Card = ({ children, variant = 'default', ...props }) => {
  const baseStyles = 'p-4 rounded-lg shadow-md';
  const variantStyles = {
    default: 'bg-white text-black',
    primary: 'bg-blue-600 text-white',
    secondary: 'bg-gray-600 text-white',
    danger: 'bg-red-600 text-white',
  };

  const styles = `${baseStyles} ${variantStyles[variant]}`;

  return (
    <div className={styles} {...props}>
      {children}
    </div>
  );
};

export default Card;
