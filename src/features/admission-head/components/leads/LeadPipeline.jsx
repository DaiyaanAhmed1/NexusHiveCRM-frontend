import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FiUser, FiMail, FiPhone, FiTag, FiClock, FiTrendingUp } from 'react-icons/fi';

const pipelineStages = [
  { id: 'inquiry', label: 'Inquiry', color: 'bg-blue-100 text-blue-800' },
  { id: 'contacted', label: 'Contacted', color: 'bg-purple-100 text-purple-800' },
  { id: 'application_started', label: 'Application Started', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'documents_submitted', label: 'Documents Submitted', color: 'bg-green-100 text-green-800' },
  { id: 'verified', label: 'Verified', color: 'bg-indigo-100 text-indigo-800' },
  { id: 'offer_sent', label: 'Offer Sent', color: 'bg-pink-100 text-pink-800' },
  { id: 'confirmed', label: 'Confirmed', color: 'bg-emerald-100 text-emerald-800' },
  { id: 'withdrawn', label: 'Withdrawn/Rejected', color: 'bg-red-100 text-red-800' },
];

const getConversionScoreColor = (score) => {
  switch (score.toLowerCase()) {
    case 'high':
      return 'bg-green-100 text-green-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const LeadCard = ({ lead, index, onSelect }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lead.id.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`group relative mb-4 p-0 rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 cursor-pointer transition-transform duration-200 hover:scale-[1.03] hover:shadow-2xl overflow-hidden ${isDragging ? 'scale-105 shadow-2xl border-indigo-300' : ''}`}
      onClick={() => onSelect(lead)}
    >
      {/* Conversion Score Badge */}
      <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${getConversionScoreColor(lead.conversionScore)}`}>{lead.conversionScore} Score</span>

      {/* Avatar */}
      <div className="flex flex-col items-center pt-7 pb-2 px-6">
        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-200 to-indigo-400 dark:from-indigo-900 dark:to-indigo-700 flex items-center justify-center text-indigo-700 dark:text-indigo-200 text-2xl font-bold ring-4 ring-indigo-100 dark:ring-indigo-900 mb-2">
          {lead.name.charAt(0)}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center leading-tight">{lead.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">{lead.program}</p>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 dark:border-gray-700 mx-6" />

      {/* Contact Info */}
      <div className="px-6 py-3 space-y-2 bg-gray-50 dark:bg-gray-900/40 rounded-b-xl">
        <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
          <FiMail className="mr-2" />
          <span className="truncate">{lead.contact.email}</span>
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
          <FiPhone className="mr-2" />
          <span>{lead.contact.phone}</span>
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
          <FiUser className="mr-2" />
          <span>Assigned: {lead.assignedTo}</span>
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
          <FiClock className="mr-2" />
          <span>Last: {lead.lastContact}</span>
        </div>
      </div>

      {/* Tags */}
      {lead.tags.length > 0 && (
        <div className="px-6 pb-4 pt-2 flex flex-wrap gap-2 bg-gray-50 dark:bg-gray-900/40">
          {lead.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 rounded-full text-xs font-medium shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default function LeadPipeline({ leads, onLeadSelect }) {
  const [columns, setColumns] = useState(() => {
    // Initialize columns with leads grouped by status
    const initialColumns = {};
    pipelineStages.forEach(stage => {
      initialColumns[stage.id] = leads.filter(lead => lead.status.toLowerCase() === stage.id);
    });
    return initialColumns;
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Find which column the active item is in
    let sourceColumnId = null;
    let sourceIndex = -1;
    
    for (const [columnId, columnLeads] of Object.entries(columns)) {
      const index = columnLeads.findIndex(lead => lead.id.toString() === activeId);
      if (index !== -1) {
        sourceColumnId = columnId;
        sourceIndex = index;
        break;
      }
    }

    if (sourceColumnId === null) return;

    // Find which column the item is being dropped into
    let destColumnId = null;
    let destIndex = -1;
    
    for (const [columnId, columnLeads] of Object.entries(columns)) {
      const index = columnLeads.findIndex(lead => lead.id.toString() === overId);
      if (index !== -1) {
        destColumnId = columnId;
        destIndex = index;
        break;
      }
    }

    if (destColumnId === null) return;

    if (sourceColumnId === destColumnId) {
      // Reordering within the same column
      const column = columns[sourceColumnId];
      const newColumn = arrayMove(column, sourceIndex, destIndex);
      
      setColumns({
        ...columns,
        [sourceColumnId]: newColumn
      });
    } else {
      // Moving between columns
      const sourceColumn = columns[sourceColumnId];
      const destColumn = columns[destColumnId];
      const [removed] = sourceColumn.splice(sourceIndex, 1);
      destColumn.splice(destIndex, 0, removed);
      
      setColumns({
        ...columns,
        [sourceColumnId]: [...sourceColumn],
        [destColumnId]: [...destColumn]
      });

      // Here you would typically make an API call to update the lead's status
      console.log(`Moved lead ${removed.id} from ${sourceColumnId} to ${destColumnId}`);
    }
  };

  return (
    <div className="p-6 md:p-10 text-base">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <div className="space-y-8">
          {pipelineStages.map((stage) => (
            <div key={stage.id}>
              <div className="mb-2 flex items-center justify-between">
                <span className={`font-semibold text-sm px-3 py-1 rounded-full ${stage.color}`}>{stage.label}</span>
                <span className="text-xs text-gray-400">{columns[stage.id]?.length || 0}</span>
              </div>
              <SortableContext
                items={columns[stage.id]?.map(lead => lead.id.toString()) || []}
                strategy={horizontalListSortingStrategy}
              >
                <div className="flex flex-row gap-6 overflow-x-auto min-h-[80px] py-2 px-1 rounded-lg transition-colors duration-200">
                  {columns[stage.id]?.map((lead, index) => (
                    <LeadCard key={lead.id} lead={lead} index={index} onSelect={onLeadSelect} />
                  ))}
                </div>
              </SortableContext>
            </div>
          ))}
        </div>
      </DndContext>
    </div>
  );
} 