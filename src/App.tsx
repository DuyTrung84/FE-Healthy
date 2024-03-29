import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './utils/i18n';
import { Skeleton } from 'antd';

// Import tay các component cần lazy load
const Signin = React.lazy(() => import('./pages/auth/Signin'));
const Signup = React.lazy(() => import('./pages/auth/Signup'));
const EmailVerify = React.lazy(() => import('./pages/auth/EmailVerify'));
const IsCheckAdmin = React.lazy(() => import('./pages/auth/IsCheckAdmin'));
const LayoutSite = React.lazy(() => import('./layout/site/LayoutSite'));
const Home = React.lazy(() => import('./pages/site/Home'));
const ListCategories = React.lazy(() => import('./pages/site/ListCategories'));
const AppointmentHist = React.lazy(() => import('./pages/site/AppointmentHist'));
const MedExamination = React.lazy(() => import('./pages/site/med-services/SpecialtyDetail'));
const ClinicsDetail = React.lazy(() => import('./pages/site/med-services/ClinicsDetail'))
const ClinicsChildren = React.lazy(() => import('./pages/site/med-services/ClinicsChildren'))
const LayoutAdmin = React.lazy(() => import('./layout/admin/LayoutAdmin'));
const SpecialtyManage = React.lazy(() => import('./pages/admin/SpecialtyManage/SpecialtyManage'));
const AddSpecialtyManage = React.lazy(() => import('./pages/admin/SpecialtyManage/AddSpecialty'));
const UpdateSpecialty = React.lazy(() => import('./pages/admin/SpecialtyManage/UpdateSpecialty'));
const ClinicsManage = React.lazy(() => import('./pages/admin/ClinicsManage/ClinicsManage'));
const ClinicsAdd = React.lazy(() => import('./pages/admin/ClinicsManage/ClinicsAdd'));
const ClinicsUpdate = React.lazy(() => import('./pages/admin/ClinicsManage/ClinicsUpdate'));
const AccountManage = React.lazy(() => import('./pages/admin/AccountManage/AccountManage'));
const AddAccount = React.lazy(() => import('./pages/admin/AccountManage/AddAccount'));
const UpdateDoctor = React.lazy(() => import('./pages/admin/AccountManage/UpdateDoctor'));
const MakeAppt = React.lazy(() => import('./pages/site/MakeAppt'));
const DoctorDetail = React.lazy(() => import('./pages/site/med-services/DoctorDetail'));
const Profile = React.lazy(() => import('./pages/site/profile/Profile'))
const LstProfile = React.lazy(() => import('./pages/site/profile/LstProfile'))
const AddProfile = React.lazy(() => import('./pages/site/profile/AddProfile'))
const UpdateProfile = React.lazy(() => import('./pages/site/profile/UpdateProfile'))

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <Suspense fallback={<Skeleton />}>
          <Routes>
            <Route path="/" element={<LayoutSite />}>
              <Route index element={<Home />} />
              <Route path='danh-sach/:slug' element={<ListCategories />} />
              <Route path='lich-hen' element={<AppointmentHist />} />
              <Route path='dich-vu-y-te/:slug/:slug' element={<MedExamination />} />
              <Route path='co-so-y-te/:slug' element={<ClinicsDetail />} />
              <Route path='co-so-y-te/:slug/:id' element={<ClinicsChildren />} />
              <Route path='dat-lich/:id' element={<MakeAppt />} />
              <Route path='bac-si/:slug' element={<DoctorDetail />} />
              <Route path="ho-so-kham-benh" element={<Profile />}>
                <Route index element={<LstProfile />} />
                <Route path="them" element={<AddProfile />} />
                <Route path="sua/:id" element={<UpdateProfile />} />
              </Route>
            </Route>
            <Route element={<IsCheckAdmin />}>
              <Route path="/admin" element={<LayoutAdmin />}>
                <Route path='quan-ly-chuyen-khoa' element={<SpecialtyManage />} />
                <Route path='them-chuyen-khoa' element={<AddSpecialtyManage />} />
                <Route path='sua-chuyen-khoa/:id' element={<UpdateSpecialty />} />
                <Route path='quan-ly-phong-kham' element={<ClinicsManage />} />
                <Route path='them-phong-kham' element={<ClinicsAdd />} />
                <Route path='sua-phong-kham/:id' element={<ClinicsUpdate />} />
                <Route path='quan-ly-tai-khoan' element={<AccountManage />} />
                <Route path='them-tai-khoan' element={<AddAccount />} />
                <Route path='cap-nhat-bac-si/:id' element={<UpdateDoctor />} />
              </Route>
            </Route>
            <Route path='/login' element={<Signin />} />
            <Route path='/register' element={<Signup />} />
            <Route path='/auth/email-verification/:token' element={<EmailVerify />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
