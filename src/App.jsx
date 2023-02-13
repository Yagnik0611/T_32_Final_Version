import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { RequireAuth } from 'react-auth-kit'
function App() {
  return (

    <Routes>

      <Route path="/auth/*" element={<Auth />} />
      
     <Route path="/user/*" 
     element={
      <RequireAuth loginPath={'/auth/sign-in'}>
            <Dashboard />
          </RequireAuth>
     }
      />
       <Route path="/admin/*"  element={
      <RequireAuth loginPath={'/auth/sign-in'}>
            <Dashboard />
          </RequireAuth>
     } /> 
      <Route path="/client/*" element={
      <RequireAuth loginPath={'/auth/sign-in'}>
            <Dashboard />
          </RequireAuth>
     } /> 
      
      
      <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
    </Routes>
  );
}

export default App;
