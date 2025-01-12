import AuthLayout from '../../layout/AuthLayout';
import GameStagePage from '../../pages/games-stage';
import PageNotFoundPage from '../../pages/page-not-found';
import GameStageStoryPage from '../../pages/games-stage/game-stage-story';
import GameStagePageContext from '../../pages/games-stage/GameStageContext';
import { Navigate, RouteObject } from 'react-router-dom';
import LevelsPage from '../../pages/levels';
import AvatarBuilderPage from '../../pages/inventory/avatar-builder';
import LoginPage from '../../pages/login';

export const routeConfig: RouteObject[] = [
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            {
                path: '',
                element: <Navigate to="/game-modes" replace />,
            },
            {
                path: 'game-modes',
                element: <GameStagePageContext />,
                children: [
                    {
                        path: '',
                        element: <GameStagePage />,
                    },
                    {
                        path: 'story',
                        element: <GameStageStoryPage />,
                    },
                    {
                        path: 'story/:stageId/index/:index/level',
                        element: <LevelsPage />,
                    },
                ],
            },
            {
                path: 'inventory/botbuilder',
                element: <AvatarBuilderPage />,
            },
            {
                path: '*',
                element: <PageNotFoundPage />,
            },
        ],
    },
    {
        path: '/login',
        element: <LoginPage />
    }
];
