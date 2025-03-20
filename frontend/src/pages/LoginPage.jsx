import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../services/api";
import { TextField, Button, Container, Typography, Paper, Box } from "@mui/material";

const LoginPage = ({ setIsAuthenticated }) => {
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
    <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "90vh" }}>
      <Paper elevation={5} sx={{ padding: 4, borderRadius: 3, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", width: "50vh"}}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        {error && <Typography color="error" align="center">{error}</Typography>}
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField fullWidth label="Username" name="username" onChange={handleChange} required />
          <TextField fullWidth type="password" label="Password" name="password" onChange={handleChange} required />
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Button type="submit" variant="contained">
              Login
            </Button>
            <Typography variant="body2">
              <Link to="/signup" style={{ textDecoration: "none" }}>Sign up</Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;