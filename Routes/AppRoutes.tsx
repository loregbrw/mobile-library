import { useAuth } from "../context/AuthContext";

import MainTabs from "../components/MainTabs";
import LoginScreen from "../screens/LoginScreen";

const AppRoutes = () => {
    const { isAuthenticated, isLoading, } = useAuth();

    if (isLoading) return null;

    return isAuthenticated ? <MainTabs /> : <LoginScreen />;
};

export default AppRoutes;