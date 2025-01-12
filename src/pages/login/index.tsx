import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, Container, CssBaseline, Card, InputAdornment, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../../components/snackbar';
import { isApiError } from '../../types/ApiError';
import { useAuth } from '../../contexts/AuthContext';
import { useBackendControllerContext } from '../../contexts/BackendControllerContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import OTPInput from './components/OTPInput';
import Countdown from './components/Countdown';

export interface LoginDto {
  username: string;
  otp: string;
}

export default function LoginPage() {
  const { axiosClient } = useBackendControllerContext();
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<LoginDto>();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const { token, login } = useAuth();
  const { userController } = useBackendControllerContext();

  const [isOTPSent, setIsOTPSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [email, setEmail] = useState(''); // Email to display in OTP form

  useEffect(() => {
    if (token) {
      navigate('/', { state: { from: '/login' } });
    }
  }, [token, navigate]);

  const onSendOTP = async (data: { username: string }) => {
    try {
      setIsLoading(true); // Start loading
      await userController.sendOTP(data);
      setEmail(data.username);
      showSnackbar('OTP sent successfully!', 'success');
      setIsOTPSent(true);
    } catch (error) {
      if (isApiError(error)) {
        showSnackbar(`Error ${error.statusCode}: ${error.message}`, 'error');
      } else {
        showSnackbar('An error occurred while sending OTP.', 'error');
      }
    } finally {
      setIsLoading(false); // Stop loading
    }
  };


  const onLogin = async (data: LoginDto) => {
    try {
      const response = await userController.login(data);
      if (response?.token) {
        login(response.token);
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
        navigate('/');
        showSnackbar('Login successful!', 'success');
      }
    } catch (error) {
      if (isApiError(error)) {
        showSnackbar(`Error ${error.statusCode}: ${error.message}`, 'error');
      } else {
        showSnackbar('An error occurred during login.', 'error');
      }
    }
  };

  const handleReinputEmail = () => {
    setIsOTPSent(false);
    setEmail('');
    reset();
  };

  const renderForm = () => {
    if (!isOTPSent) {
      return (
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(onSendOTP)}>
          <TextField
            fullWidth
            margin="normal"
            required
            id="username"
            label="Email"
            {...register('username', { required: 'Email is required' })}
            error={!!errors.username}
            helperText={errors.username ? errors.username.message : ''}
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            fullWidth
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
            sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: 'bold', textTransform: 'none', borderRadius: 2 }}
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? 'Sending...' : 'Send OTP'}
          </Button>
        </Box>
      );
    } else {
      return (
        <Box component="form" noValidate sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }} onSubmit={handleSubmit(onLogin)}>
          <TextField
            fullWidth
            margin="normal"
            id="email"
            label="Email"
            value={email}
            disabled
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              ),
            }}
          />
          <OTPInput length={6} onChange={(otp) => setValue('otp', otp)} />
          <Countdown
            initialTime={60}
            onComplete={() => {
              showSnackbar('OTP expired, please request a new one.', 'warning');
            }}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<LoginIcon />}
            sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: 'bold', textTransform: 'none', borderRadius: 2 }}
          >
            Login
          </Button>
          <Button
            fullWidth
            variant="text"
            color="secondary"
            onClick={handleReinputEmail}
            sx={{ mt: 1, textTransform: 'none', fontSize: '0.9rem' }}
          >
            Re-enter Email
          </Button>
        </Box>
      );
    }
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: 'url(images/bg-login.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container component="main" sx={{ width: 440 }}>
          <Card sx={{ p: 4, borderRadius: 3, boxShadow: 6 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                Welcome Back
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                {isOTPSent ? 'Enter the OTP sent to your email' : 'Please enter your email to receive OTP'}
              </Typography>
              {renderForm()}
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
}
