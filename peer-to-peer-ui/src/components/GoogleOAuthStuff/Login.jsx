import React from "react";

const Login = () => {
	const handleLogin = () => {
		window.location.href = "https://peer-to-peer-59rz.onrender.com/auth/login";
	};

	return (
		<div>
			<h2>Login</h2>
			<button onClick={handleLogin}>Log in with Google</button>
		</div>
	);
};

export default Login;
