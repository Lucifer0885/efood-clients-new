import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router";

function NoAuthRoute({ children }) {
    const { user } = useAuth();

    if ( user ) {
        return (
            <Navigate
                to={"/stores"}
            />
        );
    }
    return children;
}

export default NoAuthRoute;