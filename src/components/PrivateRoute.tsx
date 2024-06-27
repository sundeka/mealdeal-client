import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  isLoggedIn: boolean;
  children: JSX.Element;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  return props.isLoggedIn ? props.children : <Navigate to="/" />;
};

export default PrivateRoute;