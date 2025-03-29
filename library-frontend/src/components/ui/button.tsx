import React from 'react';

const Button = ({ children, onClick, variant = 'primary', size = 'md', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };
  const sizeStyles = {
    sm: 'px-2.5 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const styles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`;

  return (
    <button onClick={onClick} className={styles} {...props}>
      {children}
    </button>
  );
};

export default Button;
