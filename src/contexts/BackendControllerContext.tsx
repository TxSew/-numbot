import { createContext, useContext, useMemo } from 'react';
import axios from 'axios';
import { useSnackbar } from '../components/snackbar';
import { useNavigate } from 'react-router-dom';
import { appConfig } from '../configs/AppConfig';
import { FileController } from '../controllers/FileController';
import { UserController } from '../controllers/UserController';
import { AvatarController } from '../controllers/AvatarController';
import { StageController } from '../controllers/StageController';
import { OrganizationUserController } from '../controllers/OrganizationUserController';
import { UserLevelController } from '../controllers/UserLevelController';
import { UserAvatarItemController } from '../controllers/UserAvatarItemController';
import { CoinTransactionController } from '../controllers/CoinTransactionController';

export const useBackendControllers = () => {
    const { showSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const axiosClient = useMemo(() => {
        const client = axios.create({
            baseURL: appConfig.service.api,
            timeout: 30 * 1000,
        });

        client.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response) {
                    const statusCode = error.response.status;
                    const message = error.response.data?.message || 'An unknown error occurred';

                    if (statusCode === 401) {
                        localStorage.removeItem('token');
                        navigate('/login');
                    }

                    showSnackbar(`Error ${statusCode}: ${message}`, 'error');
                }
                return Promise.reject(error);
            }
        );

        return client;
    }, [navigate, showSnackbar]);

    const controllers = useMemo(
        () => ({
            userController: new UserController(axiosClient),
            avatarController: new AvatarController(axiosClient),
            fileController: new FileController(axiosClient),
            stageController: new StageController(axiosClient),
            organizationUserController: new OrganizationUserController(axiosClient),
            userLevelController: new UserLevelController(axiosClient),
            userAvatarItemController: new UserAvatarItemController(axiosClient),
            coinTransactionController: new CoinTransactionController(axiosClient),
        }),
        [axiosClient]
    );

    return { ...controllers, axiosClient };
};

const BackendControllerContext = createContext<ReturnType<typeof useBackendControllers> | null>(null);

export const useBackendControllerContext = () => {
    const context = useContext(BackendControllerContext);
    if (!context) {
        throw new Error('useBackendControllerContext must be used within a BackendControllerProvider');
    }
    return context;
};

export const BackendControllerProvider: React.FC<{ children: any }> = ({ children }: { children: any }) => {
    const controllers = useBackendControllers();

    return <BackendControllerContext.Provider value={controllers}>{children}</BackendControllerContext.Provider>;
};
