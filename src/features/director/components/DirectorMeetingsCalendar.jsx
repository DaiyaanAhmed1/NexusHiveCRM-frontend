import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { directorFeatures } from '../../../components/directorFeatures';

export default function DirectorMeetingsCalendar() {
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [selectedDate, setSelectedDate] = useState("");
  const { t } = useTranslation('director');

  // Meetings data using translation keys
  const meetings = [
    { 
      id: 1, 
      date: "2024-03-15", 
      time: "10:00", 
      titleKey: "meetingTitles.boardMeeting", 
      participantKeys: ["participants.director", "participants.deans", "participants.hods"], 
      statusKey: "status.scheduled", 
      agendaKey: "agenda.reviewQ1" 
    },
    { 
      id: 2, 
      date: "2024-03-17", 
      time: "14:00", 
      titleKey: "meetingTitles.researchCommittee", 
      participantKeys: ["participants.director", "participants.deanScience", "participants.hodEEE"], 
      statusKey: "status.scheduled", 
      agendaKey: "agenda.approveResearch" 
    },
    { 
      id: 3, 
      date: "2024-03-20", 
      time: "09:30", 
      titleKey: "meetingTitles.studentCouncil", 
      participantKeys: ["participants.director", "participants.studentReps"], 
      statusKey: "status.completed", 
      agendaKey: "agenda.studentFeedback" 
    },
  ];

  // Calendar events using translation keys
  const calendarEvents = [
    { date: "2024-03-15", labelKey: "meetingTitles.boardMeeting" },
    { date: "2024-03-17", labelKey: "meetingTitles.researchCommittee" },
    { date: "2024-03-20", labelKey: "meetingTitles.studentCouncil" },
    { date: "2024-03-22", labelKey: "events.ncaaaAudit" },
  ];

  return (
    <div className="flex min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-8 overflow-x-auto">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            {t('meetingsCalendar.title')}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            {t('meetingsCalendar.subtitle')}
          </p>
        </div>

        {/* Meetings List */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            {t('meetingsCalendar.upcomingMeetings')}
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-4">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left">
                  <th>{t('meetingsCalendar.tableHeaders.date')}</th>
                  <th>{t('meetingsCalendar.tableHeaders.time')}</th>
                  <th>{t('meetingsCalendar.tableHeaders.title')}</th>
                  <th>{t('meetingsCalendar.tableHeaders.participants')}</th>
                  <th>{t('meetingsCalendar.tableHeaders.status')}</th>
                  <th>{t('meetingsCalendar.tableHeaders.agenda')}</th>
                </tr>
              </thead>
              <tbody>
                {meetings.map((m, idx) => (
                  <tr key={idx} className="border-b border-gray-100 dark:border-gray-700">
                    <td>{m.date}</td>
                    <td>{m.time}</td>
                    <td>{t(`meetingsCalendar.${m.titleKey}`)}</td>
                    <td>{m.participantKeys.map(key => t(`meetingsCalendar.${key}`)).join(", ")}</td>
                    <td>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        m.statusKey === "status.scheduled" 
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" 
                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      }`}>
                        {t(`meetingsCalendar.${m.statusKey}`)}
                      </span>
                    </td>
                    <td>{t(`meetingsCalendar.${m.agendaKey}`)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Calendar */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            {t('meetingsCalendar.calendar')}
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-4">
            <div className="flex flex-wrap gap-2 mb-2">
              <input 
                type="date" 
                value={selectedDate} 
                onChange={e => setSelectedDate(e.target.value)} 
                className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" 
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                {t('meetingsCalendar.addEvent')}
              </button>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left">
                  <th>{t('meetingsCalendar.tableHeaders.date')}</th>
                  <th>{t('meetingsCalendar.tableHeaders.event')}</th>
                </tr>
              </thead>
              <tbody>
                {calendarEvents.filter(e => !selectedDate || e.date === selectedDate).map((ev, idx) => (
                  <tr key={idx} className="border-b border-gray-100 dark:border-gray-700">
                    <td>{ev.date}</td>
                    <td>{t(`meetingsCalendar.${ev.labelKey}`)}</td>
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