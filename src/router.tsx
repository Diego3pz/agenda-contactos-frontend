import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import DashboardView from './views/DashboardView';
import ContactView from './views/ContactView';
import AuthLayout from './layout/AuthLayout';
import LoginView from './views/Auth/LoginView';
import RegisterView from './views/Auth/RegisterView';
import ConfirmAccountView from './views/Auth/ConfirmAccountView';
import RequestNewCodeView from './views/Auth/RequestNewCodeView';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<DashboardView />} index />
                    <Route path="/:contactId" element={<ContactView />} />
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path="/auth/login" element={<LoginView />} />
                    <Route path="/auth/register" element={<RegisterView />} />
                    <Route path="/auth/confirm-account" element={<ConfirmAccountView />} />
                    <Route path="/auth/request-code" element={<RequestNewCodeView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}