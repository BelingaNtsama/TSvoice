import React, { type InputHTMLAttributes } from 'react';

// Définir les props pour le composant
interface FloatingInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ label, id, ...props }, ref) => {
    return (
      <label htmlFor={id} className="floating-label">
        <span>{label}</span>
        <input {...props} id={id} className="input input-md w-full" ref={ref} />
      </label>
    );
  }
);

FloatingInput.displayName = 'FloatingInput';

export default FloatingInput;
