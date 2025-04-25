import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import DashboardView from './views/DashboardView';
import ContactView from './views/ContactView';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<DashboardView />} index />
                    <Route path="/:contactId" element={<ContactView />}  />

                </Route>
            </Routes>
        </BrowserRouter>
    )
}