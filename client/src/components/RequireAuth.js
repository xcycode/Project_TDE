import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// const RequireAuth = ({ allowedRoles }) => {
//     const { auth } = useAuth();
//     const location = useLocation();

//     return (
//         auth?.roles == allowedRoles
//             ? <Outlet />
//             : auth?.account
//                 ? <Navigate to="unauthorize" state={{ from: location }} replace />
//                 : <Navigate to="/" state={{ from: location }} replace />
//     );
// }

// export default RequireAuth;

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

   
    return (
        auth?.msg === "success"
            ? <Outlet />
            : auth?.role === "user"
                ? <Navigate to="/loginU" state={{ from: location }} replace />
                : auth?.role === "delivery"
                    ? <Navigate to="/loginD" state={{ from: location }} replace />
                        : auth?.role === "restaurant"
                            ? <Navigate to="/loginR" state={{ from: location }} replace />
                            : <Navigate to="/" state={{ from: location }} replace />
                        
    );
}

export default RequireAuth;