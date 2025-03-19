import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/api";
import { TextField, Button, Container, Typography } from "@mui/material";

const SignupPage = () => {
  const [userData, setUserData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.signup(userData);
      navigate("/login"); // Redirect to LoginPage after signup
    } catch (err) {
      setError("Signup failed. Try again.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4">Sign Up</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField fullWidth margin="normal" label="Username" name="username" onChange={handleChange} required />
        <TextField fullWidth margin="normal" type="password" label="Password" name="password" onChange={handleChange} required />
        <Button type="submit" variant="contained" fullWidth>Sign Up</Button>
      </form>
    </Container>
  );
};

export default SignupPage;