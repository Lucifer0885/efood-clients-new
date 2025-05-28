import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router";

function AuthRoute({ children }) {
    const { user } = useAuth();

    if (!user ) {
        return (
            <Navigate
                to={"/login"}
            />
        );
    }
    return children;
}

export default AuthRoute;