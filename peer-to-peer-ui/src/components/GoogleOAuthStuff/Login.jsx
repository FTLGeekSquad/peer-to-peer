import React from "react";

const Login = () => {

  const handleLogin = () => {
    window.location.href = "http://localhost:3000/auth/login";
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Log in with Google</button>
    </div>
  );
};

export default Login;
