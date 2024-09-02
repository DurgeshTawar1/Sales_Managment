import React from 'react';
 
interface PrivateRouteProps {
  isAuthenticated: boolean;
  element: React.ReactElement;
}
 
const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated, element }) => {
  if (!isAuthenticated) {
    // Perform a full-page redirect using window.location.href
    window.location.href = 'http://localhost:8080/site/logout';

    // return <Navigate to="/http://localhost:8080/site/logout" />;
     return null; // Render nothing while redirecting
  }
  return element; // Render the protected component if authenticated
};
 
export default PrivateRoute;