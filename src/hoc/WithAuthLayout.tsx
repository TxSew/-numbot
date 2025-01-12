import { ComponentType, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/main-layout';
import { useAuth } from '../contexts/AuthContext';

function withAuthLayout<T extends JSX.IntrinsicAttributes>(WrappedComponent: ComponentType<T>): ComponentType<T> {
  return (props: T) => {
    const { isLoading, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if (!isLoading && !user) {
        navigate('/login');
      }
    }, [isLoading, user, navigate]);

    if (isLoading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" width={'100vw'}>
          <CircularProgress />
        </Box>
      );
    }

    return (
      <MainLayout>
        <WrappedComponent {...props} />
      </MainLayout>
    );
  };
}

export default withAuthLayout;
