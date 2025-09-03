import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { directorFeatures } from '../../../components/directorFeatures';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Demo data for filters - will be generated dynamically with translations
const years = ["2024", "2025", "2026", "2027", "2028"];

// Demo data for KPIs - will be generated dynamically with translations

// Demo data for progress bars - will be generated dynamically with translations

// Demo data for Gantt chart (strategic roadmap) - will be generated dynamically with translations

// Enhanced Academic Planning Tools data - will be generated dynamically with translations

// Enhanced SWOT - will be generated dynamically with translations

// Enhanced Trend Analysis - will be generated dynamically with translations

export default function DirectorStrategicPlanning() {
  const { t, ready } = useTranslation('director');
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [selectedDept, setSelectedDept] = useState("All Departments");
  const [selectedYear, setSelectedYear] = useState("2024");

  if (!ready) {
    return <div className="flex min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 items-center justify-center">
      <div className="text-lg text-gray-600 dark:text-gray-300">Loading...</div>
    </div>;
  }

  // Generate translated data
  const departments = [t('strategicPlanning.filters.allDepartments'), t('strategicPlanning.filters.departments.computerScience'), t('strategicPlanning.filters.departments.eee'), t('strategicPlanning.filters.departments.mechanical'), t('strategicPlanning.filters.departments.business'), t('strategicPlanning.filters.departments.biotech')];
  
  const kpis = [
    { label: t('strategicPlanning.kpis.studentFacultyRatio'), value: 18, target: 15, unit: ":1" },
    { label: t('strategicPlanning.kpis.publicationsFaculty'), value: 2.8, target: 3.5 },
    { label: t('strategicPlanning.kpis.retentionRate'), value: 92, target: 95, unit: "%" },
    { label: t('strategicPlanning.kpis.placementRate'), value: 81, target: 90, unit: "%" },
  ];

  const goals = [
    { label: t('strategicPlanning.strategicGoals.researchOutput'), progress: 70 },
    { label: t('strategicPlanning.strategicGoals.accreditationStatus'), progress: 85 },
    { label: t('strategicPlanning.strategicGoals.placements'), progress: 81 },
    { label: t('strategicPlanning.strategicGoals.facultyHiring'), progress: 60 },
  ];

  const roadmap = [
    { name: t('strategicPlanning.roadmap.ncaaaPrep'), start: "2024", end: "2025" },
    { name: t('strategicPlanning.roadmap.newBscAiProgram'), start: "2025", end: "2026" },
    { name: t('strategicPlanning.roadmap.campusExpansion'), start: "2026", end: "2028" },
    { name: t('strategicPlanning.roadmap.greenCampusInitiative'), start: "2024", end: "2027" },
  ];

  const curriculumMatrix = [
    { course: t('strategicPlanning.programs.bscAi'), status: t('strategicPlanning.curriculumStatus.proposal'), lead: t('strategicPlanning.faculty.drChen'), start: "2024-06", end: "2025-05" },
    { course: t('strategicPlanning.programs.mbaFintech'), status: t('strategicPlanning.curriculumStatus.review'), lead: t('strategicPlanning.faculty.drRao'), start: "2023-09", end: "2024-08" },
    { course: t('strategicPlanning.programs.btechEee'), status: t('strategicPlanning.curriculumStatus.ongoing'), lead: t('strategicPlanning.faculty.drSingh'), start: "2022-07", end: "2025-06" },
    { course: t('strategicPlanning.programs.mscDataSci'), status: t('strategicPlanning.curriculumStatus.proposal'), lead: t('strategicPlanning.faculty.drPatel'), start: "2024-01", end: "2025-12" },
    { course: t('strategicPlanning.programs.bbaMarketing'), status: t('strategicPlanning.curriculumStatus.accredited'), lead: t('strategicPlanning.faculty.drMehra'), start: "2021-08", end: "2024-07" },
  ];

  const programEvaluation = [
    { program: t('strategicPlanning.programs.bscCs'), next: "2025", last: "2020" },
    { program: t('strategicPlanning.programs.mba'), next: "2026", last: "2021" },
    { program: t('strategicPlanning.programs.btechEee'), next: "2027", last: "2022" },
    { program: t('strategicPlanning.programs.mscDataSci'), next: "2028", last: "New" },
    { program: t('strategicPlanning.programs.bbaMarketing'), next: "2024", last: "2019" },
  ];

  const swot = {
    [t('strategicPlanning.swot.strengths')]: [
      t('strategicPlanning.swot.items.strongFacultyBase'),
      t('strategicPlanning.swot.items.modernLabs'),
      t('strategicPlanning.swot.items.highResearchOutput'),
      t('strategicPlanning.swot.items.internationalPartnerships')
    ],
    [t('strategicPlanning.swot.weaknesses')]: [
      t('strategicPlanning.swot.items.limitedHostelCapacity'),
      t('strategicPlanning.swot.items.outdatedLibraryResources'),
      t('strategicPlanning.swot.items.lowAlumniEngagement')
    ],
    [t('strategicPlanning.swot.opportunities')]: [
      t('strategicPlanning.swot.items.aiMlProgramDemand'),
      t('strategicPlanning.swot.items.industryTieUps'),
      t('strategicPlanning.swot.items.governmentGrants'),
      t('strategicPlanning.swot.items.onlineCourseExpansion')
    ],
    [t('strategicPlanning.swot.threats')]: [
      t('strategicPlanning.swot.items.risingCompetition'),
      t('strategicPlanning.swot.items.changingRegulations'),
      t('strategicPlanning.swot.items.decliningEnrollment'),
      t('strategicPlanning.swot.items.economicDownturn')
    ],
  };

  const trends = [
    { label: t('strategicPlanning.trends.enrollment'), values: [1200, 1300, 1400, 1550, 1700], years: ["2020","2021","2022","2023","2024"] },
    { label: t('strategicPlanning.trends.placements'), values: [800, 900, 950, 1100, 1200], years: ["2020","2021","2022","2023","2024"] },
    { label: t('strategicPlanning.trends.researchFunding'), values: [200, 250, 300, 350, 400], years: ["2020","2021","2022","2023","2024"] },
    { label: t('strategicPlanning.trends.facultyPublications'), values: [50, 60, 70, 85, 90], years: ["2020","2021","2022","2023","2024"] },
    { label: t('strategicPlanning.trends.internationalCollaborations'), values: [2, 3, 4, 6, 8], years: ["2020","2021","2022","2023","2024"] },
  ];

  return (
    <div className="flex min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-8 overflow-x-auto">
        {/* Filters */}
        <div
          className="flex flex-wrap gap-4 items-center mb-2"
          data-tour="1"
          data-tour-title-en="Planning Filters"
          data-tour-title-ar="مرشحات التخطيط"
          data-tour-content-en="Filter by department and year to focus the strategic plan."
          data-tour-content-ar="قم بالتصفية حسب القسم والسنة للتركيز على الخطة الإستراتيجية."
          data-tour-position="bottom"
        >
          <select value={selectedDept} onChange={e => setSelectedDept(e.target.value)} className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            {departments.map(d => <option key={d}>{d}</option>)}
          </select>
          <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)} className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            {years.map(y => <option key={y}>{y}</option>)}
          </select>
        </div>

        {/* 1. Key Performance Indicators */}
        <section
          data-tour="2"
          data-tour-title-en="Key Performance Indicators"
          data-tour-title-ar="مؤشرات الأداء الرئيسية"
          data-tour-content-en="Track KPIs versus targets to ensure alignment with strategic goals."
          data-tour-content-ar="تتبع مؤشرات الأداء مقابل الأهداف لضمان التوافق مع الأهداف الإستراتيجية."
          data-tour-position="bottom"
        >
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{t('strategicPlanning.sections.keyPerformanceIndicators')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((kpi, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow"
              >
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{kpi.label}</h3>
                <div className="mt-2 flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {kpi.value}{kpi.unit || ""}
                  </p>
                  <span className={`ml-2 text-sm font-medium ${
                    kpi.value >= kpi.target ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {t('strategicPlanning.kpis.target')}: {kpi.target}{kpi.unit || ""}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 2. Strategic Goals & Roadmap */}
        <section
          data-tour="3"
          data-tour-title-en="Strategic Goals & Roadmap"
          data-tour-title-ar="الأهداف الإستراتيجية وخارطة الطريق"
          data-tour-content-en="Monitor goal progress and view the multi-year strategic roadmap."
          data-tour-content-ar="راقب تقدم الأهداف واعرض خارطة الطريق الإستراتيجية لعدة سنوات."
          data-tour-position="bottom"
        >
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{t('strategicPlanning.sections.strategicGoalsRoadmap')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
              <h3 className="font-semibold mb-2">{t('strategicPlanning.strategicGoals.goalProgressTracker')}</h3>
              {goals.map(goal => (
                <div key={goal.label} className="mb-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>{goal.label}</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div className="h-2 rounded-full bg-blue-500" style={{ width: `${goal.progress}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
              <h3 className="font-semibold mb-2">{t('strategicPlanning.strategicGoals.strategicRoadmapTimeline')}</h3>
              <div className="flex flex-col gap-2">
                {roadmap.map(item => (
                  <div key={item.name} className="flex items-center gap-2 text-xs">
                    <span className="font-semibold text-gray-700 dark:text-gray-200 w-40">{item.name}</span>
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full relative">
                      <div className="h-2 rounded-full bg-green-500 absolute left-0" style={{ left: `${(parseInt(item.start)-2024)*25}%`, width: `${(parseInt(item.end)-parseInt(item.start)+1)*25}%` }}></div>
                    </div>
                    <span>{item.start}</span> - <span>{item.end}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Academic Planning Tools */}
        <section
          data-tour="4"
          data-tour-title-en="Academic Planning Tools"
          data-tour-title-ar="أدوات التخطيط الأكاديمي"
          data-tour-content-en="Curriculum development matrix and program evaluation cycles."
          data-tour-content-ar="مصفوفة تطوير المناهج ودورات تقييم البرامج."
          data-tour-position="bottom"
        >
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{t('strategicPlanning.sections.academicPlanningTools')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
              <h3 className="font-semibold mb-2">{t('strategicPlanning.academicPlanning.curriculumDevelopmentMatrix')}</h3>
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left">
                    <th>{t('strategicPlanning.academicPlanning.course')}</th><th>{t('strategicPlanning.academicPlanning.status')}</th><th>{t('strategicPlanning.academicPlanning.lead')}</th><th>{t('strategicPlanning.academicPlanning.startDate')}</th><th>{t('strategicPlanning.academicPlanning.endDate')}</th>
                  </tr>
                </thead>
                <tbody>
                  {curriculumMatrix.map((row, i) => (
                    <tr key={i}>
                      <td>{row.course}</td>
                      <td>{row.status}</td>
                      <td>{row.lead}</td>
                      <td>{row.start}</td>
                      <td>{row.end}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
              <h3 className="font-semibold mb-2">{t('strategicPlanning.academicPlanning.programEvaluationCycle')}</h3>
              <ul className="text-xs list-disc ml-4">
                {programEvaluation.map((prog, i) => (
                  <li key={i}>{prog.program}: {t('strategicPlanning.academicPlanning.reviewIn')} {prog.next} ({t('strategicPlanning.academicPlanning.last')}: {prog.last})</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 4. SWOT Analysis */}
        <section
          data-tour="5"
          data-tour-title-en="SWOT Analysis"
          data-tour-title-ar="تحليل سوات"
          data-tour-content-en="Strengths, Weaknesses, Opportunities, and Threats overview."
          data-tour-content-ar="نظرة عامة على نقاط القوة والضعف والفرص والتهديدات."
          data-tour-position="bottom"
        >
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{t('strategicPlanning.sections.swotAnalysis')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(swot).map(([category, items]) => (
              <div key={category} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                <h3 className="font-semibold mb-2">{category}</h3>
                <ul className="text-xs space-y-1">
                  {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Trend Analysis */}
        <section
          data-tour="6"
          data-tour-title-en="Trend Analysis"
          data-tour-title-ar="تحليل الاتجاهات"
          data-tour-content-en="Analyze trends across enrollment, placements, research funding, and more."
          data-tour-content-ar="حلل الاتجاهات عبر التسجيلات، التوظيف، تمويل البحث، والمزيد."
          data-tour-position="bottom"
        >
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{t('strategicPlanning.sections.trendAnalysis')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {trends.map((trend, i) => {
              const data = trend.values.map((value, idx) => ({
                year: trend.years[idx],
                value,
              }));
              return (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                  <h3 className="font-semibold mb-2">{trend.label}</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
} 