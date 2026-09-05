import React, { useState } from 'react';
import {
  X,
  Briefcase,
  Search,
  MapPin,
  Clock,
  Building2,
  CheckCircle2,
  Send,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { SAMPLE_JOBS } from '../data/appsData';
import type { EthiopianJob } from '../types';

interface JobsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string | null;
}

export const JobsModal: React.FC<JobsModalProps> = ({
  isOpen,
  onClose,
  userEmail,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedJob, setSelectedJob] = useState<EthiopianJob | null>(SAMPLE_JOBS[0]);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [showApplySuccess, setShowApplySuccess] = useState(false);
  const [applicantPhone, setApplicantPhone] = useState('+251 9');

  if (!isOpen) return null;

  const categories = ['All', 'Tech', 'NGO', 'Finance', 'Healthcare'];

  const filteredJobs = SAMPLE_JOBS.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || job.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleApply = (jobId: string) => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs((prev) => [...prev, jobId]);
      setShowApplySuccess(true);
      setTimeout(() => setShowApplySuccess(false), 3500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl h-[88vh] bg-white border border-slate-200 rounded-2xl shadow-xl flex flex-col overflow-hidden text-slate-800">
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg text-slate-900">Omniscope Jobs</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  ACTIVE PORTAL
                </span>
              </div>
              <p className="text-xs text-slate-500">Ethiopian Career & Professional Opportunity Pipeline</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://omniscope-jobs-app.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs"
            >
              <span>Open Deployed App</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              id="close-jobs-modal"
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 p-2 rounded-lg hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Filter Strip */}
        <div className="p-4 sm:px-6 sm:py-3 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search Telebirr, CBE, UNDP, Tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-xs"
            />
          </div>

          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Main 2-Column Split: Jobs List + Detail View */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          {/* Left: Job List */}
          <div className="md:col-span-5 border-r border-slate-200 overflow-y-auto p-4 space-y-2.5 bg-slate-50/50">
            <div className="text-xs font-bold text-slate-500 mb-2 px-1 uppercase tracking-wider">
              {filteredJobs.length} Verified Openings in Ethiopia
            </div>

            {filteredJobs.map((job) => {
              const isSelected = selectedJob?.id === job.id;
              const hasApplied = appliedJobs.includes(job.id);

              return (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className={`p-3.5 rounded-xl border transition cursor-pointer ${
                    isSelected
                      ? 'bg-white border-blue-500 shadow-xs ring-1 ring-blue-500/20'
                      : 'bg-white hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-semibold text-sm text-slate-900 line-clamp-1">
                      {job.title}
                    </div>
                    {hasApplied && (
                      <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Applied
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>{job.organization}</span>
                  </div>

                  <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 text-slate-600">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {job.location}
                    </span>
                    <span>•</span>
                    <span className="text-blue-600 font-semibold">{job.salaryETB}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Job Details */}
          <div className="md:col-span-7 overflow-y-auto p-6 bg-white flex flex-col justify-between">
            {selectedJob ? (
              <div className="space-y-6">
                {showApplySuccess && (
                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Application successfully submitted with your verified Omniscope Profile!</span>
                  </div>
                )}

                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-semibold mb-3 border border-slate-200">
                    <span>{selectedJob.category}</span>
                    <span>•</span>
                    <span>{selectedJob.type}</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {selectedJob.title}
                  </h2>

                  <div className="mt-2 text-sm text-blue-600 font-semibold flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>{selectedJob.organization}</span>
                  </div>
                </div>

                {/* Key metadata grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <div>
                    <div className="text-slate-400 text-[10px] uppercase font-bold">Location</div>
                    <div className="text-slate-800 font-medium mt-0.5">{selectedJob.location}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px] uppercase font-bold">Salary Range</div>
                    <div className="text-blue-600 font-bold mt-0.5">{selectedJob.salaryETB}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px] uppercase font-bold">Deadline</div>
                    <div className="text-slate-800 font-medium mt-0.5">{selectedJob.deadline}</div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Role Summary</h4>
                  <p>
                    {selectedJob.organization} is recruiting for this position in Ethiopia. Through the Omniscope Hub institutional network, verified applicants receive expedited review and direct HR coordination.
                  </p>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 pt-2">Qualifications</h4>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-slate-500">
                    <li>Relevant Ethiopian university degree or accredited professional qualification.</li>
                    <li>Strong professional proficiency in Amharic and English.</li>
                    <li>Demonstrated experience in Ethiopian corporate, banking, or NGO sector operations.</li>
                  </ul>
                </div>

                {/* Application Section */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="text-xs font-bold text-slate-800">1-Click Fast Application</div>
                  <div className="text-[11px] text-slate-500">
                    Applying as: <span className="text-blue-600 font-semibold">{userEmail || 'Active Omniscope Member'}</span>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      placeholder="+251 9..."
                      className="w-48 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-blue-500 shadow-xs"
                    />
                    <button
                      id="apply-job-btn"
                      onClick={() => handleApply(selectedJob.id)}
                      disabled={appliedJobs.includes(selectedJob.id)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition cursor-pointer disabled:opacity-50 shadow-xs"
                    >
                      {appliedJobs.includes(selectedJob.id) ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Application Submitted</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Ethiopian Application</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                Select a job from the list to view requirements.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
