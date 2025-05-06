import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import DashboardView from './views/DashboardView';
import ContactView from './views/ContactView';
import AuthLayout from './layout/AuthLayout';
import LoginView from './views/Auth/LoginView';
import RegisterView from './views/Auth/RegisterView';
import ConfirmAccountView from './views/Auth/ConfirmAccountView';
import RequestNewCodeView from './views/Auth/RequestNewCodeView';
import ForgotPasswordView from './views/Auth/ForgotPasswordView';
import NewPasswordView from './views/Auth/NewPasswordView';
import ProfileView from './views/Profile/ProfileView';
import ChangePasswordView from './views/Profile/ChangePasswordView';
import ProfileLayout from './layout/ProfileLayout';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<DashboardView />} index />
                    <Route path="/:contactId" element={<ContactView />} />
                    <Route element={<ProfileLayout />}>
                        <Route path="/profile" element={<ProfileView />} />
                        <Route path="/profile/password" element={<ChangePasswordView />} />
                    </Route>
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path="/auth/login" element={<LoginView />} />
                    <Route path="/auth/register" element={<RegisterView />} />
                    <Route path="/auth/confirm-account" element={<ConfirmAccountView />} />
                    <Route path="/auth/request-code" element={<RequestNewCodeView />} />
                    <Route path="/auth/forgot-password" element={<ForgotPasswordView />} />
                    <Route path="/auth/new-password" element={<NewPasswordView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}