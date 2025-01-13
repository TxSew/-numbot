import { useQuery } from '@tanstack/react-query';
import { createContext, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from '../../../components/snackbar';
import { useBackendControllers } from '../../../contexts/BackendControllerContext';
import { ILevel } from '../../../types/backend';
import { useAuth } from '../../../contexts/AuthContext';

export default function useGameStageProvider() {
    const { stageId } = useParams();
    const { stageController } = useBackendControllers();
    const { showSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const { organizationUsers } = useAuth();
    // console.log('🚀 ~ useGameStageProvider ~ organizationUsers:', organizationUsers);

    const { data: listStages, isLoading: isLoadingStages } = useQuery({
        queryKey: ['listStages', organizationUsers?.length],
        queryFn: async () => {
            try {
                if (!organizationUsers?.length) return;
                const result = await stageController.listStageByOrganizationUserId(organizationUsers[0].id);
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
        queryKey: ['listLevels', stageId, organizationUsers?.length],
        queryFn: async () => {
            if (!organizationUsers?.length || !stageId) return [];
            const result = await stageController.getStageById({
                stageId: Number(stageId),
                playerId: organizationUsers[0].id,
            });
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
