import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import { SnackbarProvider } from './components/snackbar';
import { AppQueryClientProvider } from './providers/AppQueryClientProvider';
import { AppThemeProvider } from './providers/AppThemeProvider';
import RouterConfig from './routers/components/RouterConfig';
import { BackendControllerProvider } from './contexts/BackendControllerContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
    return (
        <AppQueryClientProvider>
            <AppThemeProvider>
                <SnackbarProvider>
                    <CssBaseline />
                    <Router>
                        <BackendControllerProvider>
                            <AuthProvider>
                                <RouterConfig />
                            </AuthProvider>
                        </BackendControllerProvider>
                    </Router>
                </SnackbarProvider>
            </AppThemeProvider>
        </AppQueryClientProvider>
    );
}

export default App;
