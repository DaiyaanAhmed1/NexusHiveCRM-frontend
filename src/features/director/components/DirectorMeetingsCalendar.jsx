import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocalization } from "../../../hooks/useLocalization";
import { directorFeatures } from '../../../components/directorFeatures';
import { 
  FiCalendar, 
  FiClock, 
  FiUsers, 
  FiCheckCircle, 
  FiAlertCircle, 
  FiPlus, 
  FiEdit3, 
  FiEye, 
  FiDownload, 
  FiSearch, 
  FiFilter, 
  FiVideo, 
  FiMapPin, 
  FiMail, 
  FiBell, 
  FiChevronLeft, 
  FiChevronRight, 
  FiMoreHorizontal,
  FiFileText,
  FiTarget,
  FiZap
} from "react-icons/fi";

export default function DirectorMeetingsCalendar() {
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // list or calendar
  const { t } = useTranslation('director');
  const { isRTLMode } = useLocalization();

  // Meetings data using translation keys
  const meetings = [
    { 
      id: 1, 
      date: "2024-03-15", 
      time: "10:00", 
      duration: "2h",
      titleKey: "meetingTitles.boardMeeting", 
      participantKeys: ["participants.director", "participants.deans", "participants.hods"], 
      statusKey: "status.scheduled", 
      agendaKey: "agenda.reviewQ1",
      location: "Conference Room A",
      type: "board",
      priority: "high",
      attendees: 8
    },
    { 
      id: 2, 
      date: "2024-03-17", 
      time: "14:00", 
      duration: "1.5h",
      titleKey: "meetingTitles.researchCommittee", 
      participantKeys: ["participants.director", "participants.deanScience", "participants.hodEEE"], 
      statusKey: "status.scheduled", 
      agendaKey: "agenda.approveResearch",
      location: "Research Center",
      type: "committee",
      priority: "medium",
      attendees: 5
    },
    { 
      id: 3, 
      date: "2024-03-20", 
      time: "09:30", 
      duration: "1h",
      titleKey: "meetingTitles.studentCouncil", 
      participantKeys: ["participants.director", "participants.studentReps"], 
      statusKey: "status.completed", 
      agendaKey: "agenda.studentFeedback",
      location: "Student Center",
      type: "council",
      priority: "low",
      attendees: 12
    },
    { 
      id: 4, 
      date: "2024-03-22", 
      time: "11:00", 
      duration: "3h",
      titleKey: "meetingTitles.facultyMeeting", 
      participantKeys: ["participants.director", "participants.allFaculty"], 
      statusKey: "status.scheduled", 
      agendaKey: "agenda.quarterlyReview",
      location: "Main Auditorium",
      type: "faculty",
      priority: "high",
      attendees: 45
    },
  ];

  // Calendar events using translation keys
  const calendarEvents = [
    { date: "2024-03-15", labelKey: "meetingTitles.boardMeeting", type: "meeting" },
    { date: "2024-03-17", labelKey: "meetingTitles.researchCommittee", type: "meeting" },
    { date: "2024-03-20", labelKey: "meetingTitles.studentCouncil", type: "meeting" },
    { date: "2024-03-22", labelKey: "events.ncaaaAudit", type: "event" },
    { date: "2024-03-25", labelKey: "events.graduationCeremony", type: "event" },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'scheduled': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400';
      case 'completed': return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400';
      case 'cancelled': return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400';
      case 'postponed': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'board': return <FiTarget className="w-4 h-4" />;
      case 'committee': return <FiUsers className="w-4 h-4" />;
      case 'council': return <FiUsers className="w-4 h-4" />;
      case 'faculty': return <FiUsers className="w-4 h-4" />;
      default: return <FiCalendar className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'board': return 'text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400';
      case 'committee': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400';
      case 'council': return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400';
      case 'faculty': return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const filteredMeetings = meetings.filter(meeting => {
    const matchesDate = !selectedDate || meeting.date === selectedDate;
    const matchesStatus = selectedStatus === "all" || meeting.statusKey === `status.${selectedStatus}`;
    return matchesDate && matchesStatus;
  });

  const upcomingMeetings = meetings.filter(m => m.statusKey === "status.scheduled").length;
  const completedMeetings = meetings.filter(m => m.statusKey === "status.completed").length;
  const totalAttendees = meetings.reduce((sum, m) => sum + m.attendees, 0);

  return (
    <div className="w-full">
      <main className="w-full space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
          data-tour="1"
          data-tour-title-en="Meetings & Calendar Overview"
          data-tour-title-ar="نظرة عامة على الاجتماعات والتقويم"
          data-tour-content-en="Review upcoming meetings and manage calendar events."
          data-tour-content-ar="راجع الاجتماعات القادمة وأدر أحداث التقويم."
          data-tour-position="bottom"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <FiCalendar className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                {t('meetingsCalendar.title')}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {t('meetingsCalendar.subtitle')}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-500 dark:text-gray-400">Upcoming</div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{upcomingMeetings}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 dark:text-gray-400">Completed</div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{completedMeetings}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 dark:text-gray-400">Total Attendees</div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{totalAttendees}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{upcomingMeetings}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">Upcoming Meetings</div>
              </div>
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                <FiCalendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">{completedMeetings}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">Completed</div>
              </div>
              <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20">
                <FiCheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{totalAttendees}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">Total Attendees</div>
              </div>
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20">
                <FiUsers className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">4</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">This Week</div>
              </div>
              <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-900/20">
                <FiClock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Meetings List */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
          data-tour="2"
          data-tour-title-en="Upcoming Meetings"
          data-tour-title-ar="الاجتماعات القادمة"
          data-tour-content-en="See scheduled meetings with participants, status, and agenda."
          data-tour-content-ar="اطلع على الاجتماعات المجدولة مع المشاركين والحالة والجدول."
          data-tour-position="bottom"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <FiUsers className="w-6 h-6 text-green-600 dark:text-green-400" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('meetingsCalendar.upcomingMeetings')}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <select 
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value)}
                className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              >
                <option value="all">All Status</option>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors flex items-center gap-2">
                <FiPlus className="w-4 h-4" />
                Add Meeting
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredMeetings.map((meeting, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${getTypeColor(meeting.type)}`}>
                        {getTypeIcon(meeting.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {t(`meetingsCalendar.${meeting.titleKey}`)}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mt-1">
                          <div className="flex items-center gap-1">
                            <FiCalendar className="w-4 h-4" />
                            {meeting.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <FiClock className="w-4 h-4" />
                            {meeting.time} ({meeting.duration})
                          </div>
                          <div className="flex items-center gap-1">
                            <FiMapPin className="w-4 h-4" />
                            {meeting.location}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(meeting.statusKey.split('.').pop())}`}>
                        {t(`meetingsCalendar.${meeting.statusKey}`)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(meeting.priority)}`}>
                        {meeting.priority} priority
                      </span>
                      <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                        <FiUsers className="w-4 h-4" />
                        {meeting.attendees} attendees
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      <div className="font-medium mb-1">Agenda:</div>
                      <div>{t(`meetingsCalendar.${meeting.agendaKey}`)}</div>
                    </div>
                    
                    <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                      <div className="font-medium mb-1">Participants:</div>
                      <div className="flex flex-wrap gap-1">
                        {meeting.participantKeys.map((key, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded-md text-xs">
                            {t(`meetingsCalendar.${key}`)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <button className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <FiEye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                      <FiEdit3 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                      <FiMoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Calendar */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
          data-tour="3"
          data-tour-title-en="Calendar"
          data-tour-title-ar="التقويم"
          data-tour-content-en="Filter by date, add events, and view key milestones."
          data-tour-content-ar="قم بالتصفية حسب التاريخ، أضف الأحداث، واعرض المعالم الرئيسية."
          data-tour-position="bottom"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <FiCalendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('meetingsCalendar.calendar')}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <input 
                type="date" 
                value={selectedDate} 
                onChange={e => setSelectedDate(e.target.value)} 
                className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
              />
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors flex items-center gap-2">
                <FiPlus className="w-4 h-4" />
                {t('meetingsCalendar.addEvent')}
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            {calendarEvents.filter(e => !selectedDate || e.date === selectedDate).map((ev, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${ev.type === 'meeting' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'}`}>
                      {ev.type === 'meeting' ? <FiCalendar className="w-4 h-4" /> : <FiTarget className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {t(`meetingsCalendar.${ev.labelKey}`)}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {ev.date} • {ev.type === 'meeting' ? 'Meeting' : 'Event'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <FiEye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                      <FiEdit3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}