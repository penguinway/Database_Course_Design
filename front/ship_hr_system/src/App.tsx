import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import AboutPage from './About';
import Dashboard from './DashBoard';
import PersonList from './PersonList';
import PositionList from './PositionList';
import PersonDetail from './PersonDetail';
import AddPerson from './AddPerson';
import ChangePersonDetail from './ChangePerson';
import AddPosition from './AddPosition';
import Error from './Error';
import ChangePosition from './ChangePosition';
import AddEducation from './AddEducation';
import AddExprience from './AddExprience';
import ChangeEducation from './ChangeEducation';
import ChangeExprience from './ChangeExprience';
import PersonPosition from './PersonPosition';
import DeleteEducation from './DeleteEducation';
import DeleteExperience from './DeleteExperience';
// import CertificateList from './CertList';
// import AddCertificate from './AddCert';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route index element={<Dashboard />} />  
          {/* 系统概览页面 */}
          <Route path="about" element={<AboutPage />} />  {/* 关于系统页面 */}
          <Route path="employee-management/all-employees" element={<PersonList />} />  
          {/* 员工管理页面 */}
          <Route path="position-records/all-position" element={<PositionList />} />
          {/* 岗位管理页面 */}
          <Route path="employee-management/employee-detail/:employeeId" element={<PersonDetail />} />
          {/* 员工详情页面 */}
          <Route path="employee-management/add-employee" element={<AddPerson />} />
          {/* 添加员工页面 */}
          <Route path="employee-management/edit-employee/:employeeId" element={<ChangePersonDetail />} />
          {/* 修改员工页面 */}
          <Route path="position-records/add-position" element={<AddPosition />} />
          {/* 其他子路由 */}
          <Route path="position-records/edit-position/:positionId" element={<ChangePosition />} />
          <Route path="education-management/add-education" element={<AddEducation />} />
          <Route path="experience-management/add-experience" element={<AddExprience />} />
          <Route path="education-management/edit-education" element={<ChangeEducation />} />
          <Route path="experience-management/edit-experience" element={<ChangeExprience />} />
          <Route path="person-position-management" element={<PersonPosition />} />
          <Route path="education-management/delete-education" element={<DeleteEducation />} />
          <Route path="experience-management/delete-experience" element={<DeleteExperience />} />
          {/* <Route path="certificate-management" element={<CertificateList />} />
          <Route path="certificate-management/add-certificate" element={<AddCertificate />} /> */}
          <Route path="*" element={<Error />} />
          {/* 其他子路由 */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
