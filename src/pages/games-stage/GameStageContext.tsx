import { Outlet } from 'react-router-dom';
import useGameStageProvider, { GameStageContext } from './hook/GameStageProvider';

export default function GameStagePageContext() {
    const gameStageContext = useGameStageProvider();

    return (
        <GameStageContext.Provider value={gameStageContext}>
            <Outlet />
        </GameStageContext.Provider>
    )
}
