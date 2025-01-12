import { useQuery } from '@tanstack/react-query';
import { createContext, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from '../../../components/snackbar';
import { useBackendControllers } from '../../../contexts/BackendControllerContext';
import { ILevel } from '../../../types/backend';

export default function useGameStageProvider() {
    const { stageId } = useParams();
    const { stageController } = useBackendControllers();
    const { showSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const { data: listStages, isLoading: isLoadingStages } = useQuery({
        queryKey: ['listStages'],
        queryFn: async () => {
            try {
                const result = await stageController.listStageByOrganizationUserId(4);
                if (!result || result.length === 0) {
                    showSnackbar('No stage found', 'error');
                    navigate(-1);
                    return [];
                }
                return result;
            } catch (error: any) {
                showSnackbar(error?.message || 'Error when fetching data', 'error');
                navigate(-1);
                return [];
            }
        },
        refetchOnMount: true,
    });

    const { data: listLevels, isLoading: isLoadingLevels } = useQuery({
        queryKey: ['listLevels', stageId],
        queryFn: async () => {
            if (!stageId) return [];
            const result = await stageController.getStageById({ stageId: Number(stageId), playerId: 4 });
            if (result?.levels) {
                result.levels = result.levels.map((level: ILevel, index: number) => ({
                    ...level,
                    order: level.order ?? index,
                }));
            }

            return result;
        },
        staleTime: 5 * 60 * 1000,
    });

    return { listLevels, isLoadingLevels, listStages, isLoadingStages };
}

type GameStageContextType = ReturnType<typeof useGameStageProvider>;

export const GameStageContext = createContext<GameStageContextType>({} as GameStageContextType);

export const useGameStage = () => useContext(GameStageContext);
