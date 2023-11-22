// index.d.ts
import React from 'react';

export type UserRegistrationProps = {
  onSubmit: (error: any, response: any) => void;
};
declare const Register: React.FC<UserRegistrationProps>;
export default Register;
