// src/components/AuthFields.tsx
import FloatingInput from './FloatingInput';

interface AuthFieldsProps {
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  prefix?: 'login' | 'register';
}

const AuthFields = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  prefix = 'login',
}: AuthFieldsProps) => {
  return (
    <>
      <FloatingInput
        label="Email"
        id={`${prefix}-email`}
        type="email"
        placeholder="votre@email.com"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        required
      />
      <div className="relative">
        <FloatingInput
          label="Mot de passe"
          id={`${prefix}-password`}
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          required
        />
      </div>
    </>
  );
};

export default AuthFields;
