import { Route, Routes, Navigate } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { useAppSelector } from './app/hooks';
import { Register } from './features/auth/register/pages/Register';
import { Login } from './features/auth/login/pages/Login';
import { TaskList } from './features/tasks/pages/TaskList';

function Router(): JSX.Element {
  const { loginLoggedIn } = useAppSelector((state: any) => state.login);
  const { registerLoggedIn } = useAppSelector((state) => state.register);

  const loggedIn = loginLoggedIn || registerLoggedIn;

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          {loggedIn ? (
            <>
              <Route path='/' element={<Navigate to='/tasks' />} />
              <Route path='/tasks' element={<TaskList />} />
              <Route path='/tasks/:id' element={<TaskList />} />
              <Route path='/*' element={<Navigate to='/tasks' />} />
            </>
          ) : (
            <>
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/*' element={<Navigate to='/login' />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;
