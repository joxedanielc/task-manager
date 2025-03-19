import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/api";
import { TextField, Button, Container, Typography } from "@mui/material";

const LoginPage = ({setIsAuthenticated}) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.login(credentials);
      setIsAuthenticated(true);
      navigate("/");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4">Login</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField fullWidth margin="normal" label="Username" name="username" onChange={handleChange} required />
        <TextField fullWidth margin="normal" type="password" label="Password" name="password" onChange={handleChange} required />
        <Button type="submit" variant="contained" fullWidth>Login</Button>
      </form>
    </Container>
  );
};

export default LoginPage;