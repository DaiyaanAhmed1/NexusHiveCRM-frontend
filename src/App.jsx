// Trigger redeploy: trivial comment added
import React from "react";
import LandingPage from "./components/LandingPage";
import CookiePolicy from "./components/CookiePolicy";
import LoginPage from "./components/LoginPage";
import UniversityInfo from "./components/UniversityInfo";
import SuperAdminDashboard from "./components/SuperAdminDashboard";
import RBACUsers from "./components/RBACUsers";
import RBACTeams from "./components/RBACTeams";
import RBACTemplates from "./components/RBACTemplates";
import RBACLogs from "./components/RBACLogs";
import RBACSettings from "./components/RBACSettings";
import MarketingHeadLayout from "./features/marketing-head/pages/MarketingHeadLayout";
import MarketingHeadDashboard from "./features/marketing-head/pages/MarketingHeadDashboard";
import MarketingHeadTeamManagement from './features/marketing-head/components/MarketingHeadTeamManagement';
import MarketingHeadCampaignManagement from './features/marketing-head/components/MarketingHeadCampaignManagement';
import MarketingManagerDashboard from "./components/MarketingManagerDashboard";
import AdmissionSpocDashboard from "./features/admission-head/pages/AdmissionSpocDashboard";
import HRHeadLayout from "./features/hr-head/pages/HRHeadLayout";
import HRHeadDashboard from "./features/hr-head/pages/Dashboard";
import HRManagerDashboard from "./components/HRManagerDashboard";
import DirectorDashboard from "./components/DirectorDashboard";
import DirectorAnalyticsReports from './features/director/components/DirectorAnalyticsReports';
import DirectorDepartments from './features/director/components/DirectorDepartments';
import DirectorApprovalCenter from './features/director/components/DirectorApprovalCenter';
import DirectorStrategicPlanning from './features/director/components/DirectorStrategicPlanning';
import DirectorAuditCompliance from './features/director/components/DirectorAuditCompliance';
import DirectorMeetingsCalendar from './features/director/components/DirectorMeetingsCalendar';
import DirectorUserManagement from './features/director/components/DirectorUserManagement';
import DirectorCommunicationHub from './features/director/components/DirectorCommunicationHub';
import Unauthorized from "./components/Unauthorized";
import MarketingHeadLeadsManagement from './features/marketing-head/components/MarketingHeadLeadsManagement';
import MarketingHeadResourceManagement from './features/marketing-head/components/MarketingHeadResourceManagement';
import MarketingHeadReportingAnalytics from './features/marketing-head/components/MarketingHeadReportingAnalytics';
import CommunicationHub from './features/hr-head/pages/CommunicationHub';
import MarketingHeadCommunicationHub from './features/marketing-head/components/MarketingHeadCommunicationHub';
import MarketingHeadTrainingDevelopment from './features/marketing-head/components/MarketingHeadTrainingDevelopment';
import MarketingHeadComplianceQuality from './features/marketing-head/components/MarketingHeadComplianceQuality';
import AdmissionHeadAccountManagement from './features/admission-head/pages/AccountManagement';
import MarketingHeadTickets from "./features/marketing-head/components/MarketingHeadTickets";
import AdmissionHeadLayout from "./features/admission-head/pages/AdmissionHeadLayout";
import AdminHeadLayout from "./features/admin-head/pages/AdminHeadLayout";
import AdminHeadDashboard from "./features/admin-head/pages/AdminHeadDashboard";
import ITHeadDashboard from "./components/ITHeadDashboard";
import HoDDashboard from "./components/HoDDashboard";
import SeniorProfessorDashboard from "./components/SeniorProfessorDashboard";
import StudentDashboard from "./components/StudentDashboard";
import ParentDashboard from "./components/ParentDashboard";
import ExamHeadDashboard from "./components/ExamHeadDashboard";
import LibraryHeadDashboard from "./components/LibraryHeadDashboard";
import TransportHeadDashboard from "./components/TransportHeadDashboard";
import DirectorRiskManagement from './features/director/components/DirectorRiskManagement';

import DirectorSettings from './features/director/components/DirectorSettings';
import Workspace from './features/hr-head/pages/Workspace';
import MarketingHeadWorkspace from './features/marketing-head/components/MarketingHeadWorkspace';
import AdmissionHeadSupport from './features/admission-head/components/AdmissionHeadSupport';
import MarketingHeadSupport from './features/marketing-head/components/MarketingHeadSupport';
import AdmissionHeadDashboardComponent from "./features/admission-head/components/AdmissionHeadDashboard";
import AdmissionHeadLeadsApplicants from "./features/admission-head/components/AdmissionHeadLeadsApplicants";
import LeadsManagement from "./features/admission-head/pages/LeadsManagement";
import AdmissionHeadWorkspace from "./features/admission-head/components/AdmissionHeadWorkspace";
import Applications from './features/admission-head/pages/Applications';
import Schedule from './features/admission-head/pages/Schedule';
import Communication from './features/admission-head/pages/Communication';
import Payments from './features/admission-head/pages/Payments';
import Documents from './features/admission-head/pages/Documents';
import SearchFilters from './features/admission-head/pages/SearchFilters';
import ToolsUtilities from './features/admission-head/pages/ToolsUtilities';
import LeadTransfer from './features/admission-head/pages/LeadTransfer';
import CourseManagementPage from './features/admission-head/pages/CourseManagement';
import TrainingDevelopmentPage from './features/admission-head/pages/TrainingDevelopment';
import ComplianceQualityPage from './features/admission-head/pages/ComplianceQuality';
import PayrollOverview from "./features/hr-head/pages/PayrollOverview";
import BudgetManagement from "./features/hr-head/pages/BudgetManagement";
import ReportsAnalytics from "./features/hr-head/pages/ReportsAnalytics";
import AuditLogs from "./features/hr-head/pages/AuditLogs";
import Settings from "./features/hr-head/pages/Settings";
import SupportTickets from "./features/hr-head/pages/SupportTickets";
import AdminUserRoleManagement from "./features/admin-head/pages/AdminUserRoleManagement";
import AdminDepartmentsHierarchy from "./features/admin-head/pages/AdminDepartmentsHierarchy";
import AdminAcademicSetup from "./features/admin-head/pages/AdminAcademicSetup";
import AdminCommunication from "./features/admin-head/pages/AdminCommunication";
import AdminSettingsConfiguration from "./features/admin-head/pages/AdminSettingsConfiguration";
import AdminIntegrations from "./features/admin-head/pages/AdminIntegrations";
import AdminLogsAudit from "./features/admin-head/pages/AdminLogsAudit";
import AdminBackupSecurity from "./features/admin-head/pages/AdminBackupSecurity";
import AdminReportsAnalytics from "./features/admin-head/pages/AdminReportsAnalytics";
import AdminSettings from "./features/admin-head/pages/AdminSettings";
import AdminHelpSupport from "./features/admin-head/pages/AdminHelpSupport";
import AdminCommunicationHub from "./features/admin-head/pages/AdminCommunicationHub";
import AdminTrainingDevelopment from "./features/admin-head/pages/AdminTrainingDevelopment";
import AdminComplianceQuality from "./features/admin-head/pages/AdminComplianceQuality";
import AdminWorkspace from "./features/admin-head/pages/AdminWorkspace";
import AdminSupportTickets from "./features/admin-head/pages/AdminSupportTickets";
import DeanDashboard from './features/dean/components/DeanDashboard';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DirectorLayout from './features/director/components/DirectorLayout';
import DirectorWorkspace from './features/director/components/DirectorWorkspace';
import DirectorSupport from './features/director/components/DirectorSupport';
import { LocalizationProvider } from './hooks/useLocalization.jsx';
import './utils/i18n'; // Initialize i18n

// AI Chat Components
import DirectorAIChat from "./features/director/pages/DirectorAIChat";
import MarketingHeadAIChat from "./features/marketing-head/pages/MarketingHeadAIChat";
import AdmissionHeadAIChat from "./features/admission-head/pages/AdmissionHeadAIChat";

export default function App() {
  return (
    <LocalizationProvider>
      <Router basename="/NexusHiveCRM-frontend">
        <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/university-info" element={<UniversityInfo />} />
        <Route path="/rbac" element={<SuperAdminDashboard />} />
        <Route path="/rbac/users" element={<RBACUsers />} />
        <Route path="/rbac/teams" element={<RBACTeams />} />
        <Route path="/rbac/templates" element={<RBACTemplates />} />
        <Route path="/rbac/logs" element={<RBACLogs />} />
        <Route path="/rbac/settings" element={<RBACSettings />} />
        
        {/* Marketing Head Routes */}
        <Route path="/rbac/marketing-head" element={<MarketingHeadLayout />}>
          <Route index element={<MarketingHeadDashboard />} />
          <Route path="team" element={<MarketingHeadTeamManagement />} />
          <Route path="leads" element={<MarketingHeadLeadsManagement />} />
          <Route path="campaigns" element={<MarketingHeadCampaignManagement />} />
          <Route path="resources" element={<MarketingHeadResourceManagement />} />
          <Route path="analytics" element={<MarketingHeadReportingAnalytics />} />
          <Route path="communication" element={<MarketingHeadCommunicationHub />} />
          <Route path="training" element={<MarketingHeadTrainingDevelopment />} />
          <Route path="workspace" element={<MarketingHeadWorkspace />} />
          <Route path="support" element={<MarketingHeadSupport />} />
          <Route path="ai-chat" element={<MarketingHeadAIChat />} />
        </Route>

        <Route path="/rbac/marketing-manager" element={<MarketingManagerDashboard />} />
        <Route path="/rbac/admission-head" element={<AdmissionHeadLayout />}>
          <Route index element={<AdmissionHeadDashboardComponent />} />
          <Route path="leads" element={<AdmissionHeadLeadsApplicants />} />
          <Route path="applications" element={<Applications />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="communication" element={<Communication />} />
          <Route path="payments" element={<Payments />} />
          <Route path="documents" element={<Documents />} />
          <Route path="search" element={<SearchFilters />} />
          <Route path="tools" element={<ToolsUtilities />} />
          <Route path="lead-transfer" element={<LeadTransfer />} />
          <Route path="courses" element={<CourseManagementPage />} />
          <Route path="training" element={<TrainingDevelopmentPage />} />
          <Route path="compliance" element={<ComplianceQualityPage />} />
          <Route path="workspace" element={<AdmissionHeadWorkspace />} />
          <Route path="tickets" element={<PlaceholderPage title='Tickets' />} />
          <Route path="account" element={<AdmissionHeadAccountManagement />} />
          <Route path="help" element={<AdmissionHeadSupport />} />
          <Route path="ai-chat" element={<AdmissionHeadAIChat />} />
        </Route>
        <Route path="/rbac/admission-spoc" element={<AdmissionSpocDashboard />} />
        <Route path="/rbac/hr-head" element={<HRHeadLayout />}>
          <Route index element={<HRHeadDashboard />} />
          <Route path="payroll" element={<PayrollOverview />} />
          <Route path="budget" element={<BudgetManagement />} />
          <Route path="reports" element={<ReportsAnalytics />} />
          <Route path="approvals" element={<DirectorApprovalCenter />} />
          <Route path="audit" element={<AuditLogs />} />
          <Route path="settings" element={<Settings />} />
          <Route path="communication" element={<CommunicationHub />} />
          <Route path="training" element={<TrainingDevelopmentPage />} />
          <Route path="compliance" element={<MarketingHeadComplianceQuality />} />
          <Route path="workspace" element={<Workspace />} />
          <Route path="support" element={<SupportTickets />} />
        </Route>
        <Route path="/rbac/hr-manager" element={<HRManagerDashboard />} />
        <Route path="/rbac/director" element={<DirectorLayout />}>
          <Route index element={<DirectorDashboard />} />
          <Route path="analytics" element={<DirectorAnalyticsReports />} />
          <Route path="departments" element={<DirectorDepartments />} />
          <Route path="approvals" element={<DirectorApprovalCenter />} />
          <Route path="strategic-planning" element={<DirectorStrategicPlanning />} />
          <Route path="communication" element={<DirectorCommunicationHub />} />
          <Route path="audit" element={<DirectorAuditCompliance />} />
          <Route path="calendar" element={<DirectorMeetingsCalendar />} />
          <Route path="users" element={<DirectorUserManagement />} />
          <Route path="settings" element={<DirectorSettings />} />
          <Route path="workspace" element={<DirectorWorkspace />} />
          <Route path="support" element={<DirectorSupport />} />
          <Route path="ai-chat" element={<DirectorAIChat />} />
        </Route>
        <Route path="/rbac/marketing-head/support" element={<MarketingHeadSupport />} />
        <Route path="/rbac/dean" element={<DeanDashboard />} />
        <Route path="/rbac/admin-head" element={<AdminHeadLayout />}>
          <Route index element={<AdminHeadDashboard />} />
          <Route path="user-role-management" element={<AdminUserRoleManagement />} />
          <Route path="departments-hierarchy" element={<AdminDepartmentsHierarchy />} />
          <Route path="academic-setup" element={<AdminAcademicSetup />} />
          <Route path="communication" element={<AdminCommunication />} />
          <Route path="settings-configuration" element={<AdminSettingsConfiguration />} />
          <Route path="integrations" element={<AdminIntegrations />} />
          <Route path="logs-audit" element={<AdminLogsAudit />} />
          <Route path="backup-security" element={<AdminBackupSecurity />} />
          <Route path="reports-analytics" element={<AdminReportsAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="help-support" element={<AdminHelpSupport />} />
          <Route path="communication-hub" element={<AdminCommunicationHub />} />
          <Route path="training-development" element={<AdminTrainingDevelopment />} />
          <Route path="compliance-quality" element={<AdminComplianceQuality />} />
          <Route path="workspace" element={<AdminWorkspace />} />
          <Route path="support-tickets" element={<AdminSupportTickets />} />
        </Route>
        <Route path="/rbac/it-head" element={<ITHeadDashboard />} />
        <Route path="/rbac/hod" element={<HoDDashboard />} />
        <Route path="/rbac/senior-professor" element={<SeniorProfessorDashboard />} />
        <Route path="/rbac/student" element={<StudentDashboard />} />
        <Route path="/rbac/parent" element={<ParentDashboard />} />
        <Route path="/rbac/exam-head" element={<ExamHeadDashboard />} />
        <Route path="/rbac/library-head" element={<LibraryHeadDashboard />} />
        <Route path="/rbac/transport-head" element={<TransportHeadDashboard />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
      </Router>
    </LocalizationProvider>
  );
}

function PlaceholderPage({ title }) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-lg text-gray-500 dark:text-gray-400">Content coming soon!</p>
    </div>
  );
}