import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { directorFeatures } from '../../../components/directorFeatures';

export default function DirectorUserManagement() {
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [roleFilter, setRoleFilter] = useState("");
  const [search, setSearch] = useState("");
  const { t, ready } = useTranslation('director');

  // Show loading state if i18n is not ready
  if (!ready) {
    return (
      <div className="flex min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
        <main className="flex-1 p-4 md:p-6 flex flex-col gap-8 overflow-x-auto">
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Loading...</h1>
          </div>
        </main>
      </div>
    );
  }

  // Demo data using translation keys
  const users = [
    { 
      id: 1, 
      nameKey: "demoUsers.johnDoe", 
      roleKey: "roles.dean", 
      departmentKey: "departments.science", 
      statusKey: "userStatuses.active", 
      email: "john.doe@univ.edu" 
    },
    { 
      id: 2, 
      nameKey: "demoUsers.janeSmith", 
      roleKey: "roles.hod", 
      departmentKey: "departments.eee", 
      statusKey: "userStatuses.active", 
      email: "jane.smith@univ.edu" 
    },
    { 
      id: 3, 
      nameKey: "demoUsers.mikeJohnson", 
      roleKey: "roles.faculty", 
      departmentKey: "departments.math", 
      statusKey: "userStatuses.inactive", 
      email: "mike.johnson@univ.edu" 
    },
  ];

  const roles = ["director", "dean", "hod", "faculty", "student", "admin"];

  // Demo data for user metrics using translation keys
  const userMetrics = [
    {
      id: 1,
      titleKey: 'metrics.totalUsers',
      value: '245',
      change: '+12',
      trend: 'up'
    },
    {
      id: 2,
      titleKey: 'metrics.activeUsers',
      value: '230',
      change: '+8',
      trend: 'up'
    },
    {
      id: 3,
      titleKey: 'metrics.newUsers',
      value: '15',
      change: '+5',
      trend: 'up'
    },
    {
      id: 4,
      titleKey: 'metrics.avgActivity',
      value: '85%',
      change: '+2%',
      trend: 'up'
    }
  ];

  return (
    <div className="flex min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-8 overflow-x-auto">
        <div
          data-tour="1"
          data-tour-title-en="User Management Overview"
          data-tour-title-ar="نظرة عامة على إدارة المستخدمين"
          data-tour-content-en="Track user metrics, filter by role, search, and manage users."
          data-tour-content-ar="تتبع مقاييس المستخدمين، وصَفِّ حسب الدور، وابحث، وأدر المستخدمين."
          data-tour-position="bottom"
        >
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            {t('userManagement.title')}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            {t('userManagement.subtitle')}
          </p>
        </div>

        {/* User Metrics */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          data-tour="2"
          data-tour-title-en="User Metrics"
          data-tour-title-ar="مقاييس المستخدمين"
          data-tour-content-en="Key user stats: total, active, new, and activity levels."
          data-tour-content-ar="إحصاءات المستخدمين الرئيسية: الإجمالي، النشط، الجديد، ومستويات النشاط."
          data-tour-position="bottom"
        >
          {userMetrics.map((metric) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: metric.id * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
            >
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {t(`userManagement.${metric.titleKey}`)}
              </h3>
              <div className="mt-2 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{metric.value}</p>
                <span className={`ml-2 text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* User Filters */}
        <section className="mb-4"
          data-tour="3"
          data-tour-title-en="Filters & Actions"
          data-tour-title-ar="المرشحات والإجراءات"
          data-tour-content-en="Filter by role, search by name/email, and add new users."
          data-tour-content-ar="صَفِّ حسب الدور، وابحث بالاسم/البريد، وأضف مستخدمين جدد."
          data-tour-position="bottom"
        >
          <div className="flex flex-wrap gap-2 mb-2">
            <select 
              value={roleFilter} 
              onChange={e => setRoleFilter(e.target.value)} 
              className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="">{t('userManagement.allRoles')}</option>
              {roles.map(r => (
                <option key={r} value={r}>
                  {t(`userManagement.roles.${r}`)}
                </option>
              ))}
            </select>
            <input 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" 
              placeholder={t('userManagement.searchPlaceholder')} 
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              {t('userManagement.addUser')}
            </button>
          </div>
        </section>

        {/* User List */}
        <section
          data-tour="4"
          data-tour-title-en="User List"
          data-tour-title-ar="قائمة المستخدمين"
          data-tour-content-en="Browse users, check roles and status, and edit user details."
          data-tour-content-ar="تصفح المستخدمين، راجع الأدوار والحالة، وعدّل تفاصيل المستخدم."
          data-tour-position="bottom"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-4">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left">
                  <th>{t('userManagement.tableHeaders.name')}</th>
                  <th>{t('userManagement.tableHeaders.role')}</th>
                  <th>{t('userManagement.tableHeaders.department')}</th>
                  <th>{t('userManagement.tableHeaders.status')}</th>
                  <th>{t('userManagement.tableHeaders.email')}</th>
                  <th>{t('userManagement.tableHeaders.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {users.filter(u => {
                  const roleMatch = !roleFilter || u.roleKey === `roles.${roleFilter}`;
                  const searchMatch = t(`userManagement.${u.nameKey}`).toLowerCase().includes(search.toLowerCase()) || 
                                    u.email.toLowerCase().includes(search.toLowerCase());
                  return roleMatch && searchMatch;
                }).map((u, idx) => (
                  <tr key={idx} className="border-b border-gray-100 dark:border-gray-700">
                    <td>{t(`userManagement.${u.nameKey}`)}</td>
                    <td>{t(`userManagement.${u.roleKey}`)}</td>
                    <td>{t(`userManagement.${u.departmentKey}`)}</td>
                    <td>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        u.statusKey === "userStatuses.active" 
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      }`}>
                        {t(`userManagement.${u.statusKey}`)}
                      </span>
                    </td>
                    <td>{u.email}</td>
                    <td>
                      <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                        {t('userManagement.edit')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
} 