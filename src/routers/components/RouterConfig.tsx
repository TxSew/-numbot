import { useRoutes } from 'react-router-dom';
import { routeConfig } from '../configs/MainRouter';

export default function RouterConfig() {
    const element = useRoutes(routeConfig);
    return element;
}
