import React from 'react';
import { useApp } from '../context/AppContext';
import { COLLEGE_INFO } from '../data/mockData';
import { X, Printer, Award, CheckCircle, ShieldCheck, QrCode } from 'lucide-react';

export const CertificateModal: React.FC = () => {
  const { selectedCertificate, setSelectedCertificate, events } = useApp();

  if (!selectedCertificate) return null;

  const event = events.find(e => e.id === selectedCertificate.eventId);
  const certId = selectedCertificate.certificateId || `DYP-CERT-2026-${selectedCertificate.ticketCode.slice(-4)}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-3xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Controls Bar (hidden during print) */}
        <div className="no-print bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-300">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Digital Verified E-Certificate</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Download PDF</span>
            </button>
            <button
              onClick={() => setSelectedCertificate(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Surface (Print-Ready) */}
        <div className="p-8 sm:p-12 bg-white text-slate-900 relative border-8 border-double border-slate-300 m-2 sm:m-4 rounded-lg print:border-none print:m-0 print:p-8">
          
          {/* Subtle watermark background crest symbol */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
            <Award className="w-96 h-96 text-slate-900" />
          </div>

          <div className="relative z-10 text-center space-y-6">
            
            {/* Institution Header */}
            <div>
              <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-1">
                D Y PATIL GROUP OF INSTITUTIONS
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-blue-900 tracking-tight">
                {COLLEGE_INFO.name}
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                {COLLEGE_INFO.location}
              </p>
              <p className="text-[11px] text-slate-500 italic mt-0.5 font-medium">
                {COLLEGE_INFO.accreditation}
              </p>
            </div>

            {/* Department Lead */}
            <div className="border-t border-b border-slate-200 py-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Department of {selectedCertificate.department}
              </span>
            </div>

            {/* Certificate Title */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-wide uppercase">
                Certificate of Participation
              </h1>
              <div className="w-24 h-0.5 bg-amber-500 mx-auto mt-2" />
            </div>

            {/* Certificate Body Text */}
            <div className="space-y-4 max-w-xl mx-auto text-sm sm:text-base leading-relaxed text-slate-700 font-serif">
              <p>
                This is to officially certify that
              </p>
              
              <div className="py-1">
                <span className="text-xl sm:text-2xl font-bold text-blue-950 border-b-2 border-slate-400 px-4 inline-block font-sans">
                  {selectedCertificate.studentName}
                </span>
                <div className="text-xs font-mono text-slate-600 mt-1 font-sans">
                  PRN: {selectedCertificate.studentPrn} · {selectedCertificate.studentYear} Engineering
                </div>
              </div>

              <p>
                has actively participated in and successfully completed the departmental event
              </p>

              <div className="text-base sm:text-lg font-bold text-slate-900 font-sans italic px-2">
                "{selectedCertificate.eventTitle}"
              </div>

              <p className="text-xs sm:text-sm text-slate-600 font-sans">
                Conducted on <strong>{selectedCertificate.eventDate}</strong> at {selectedCertificate.eventVenue}.
              </p>
            </div>

            {/* Signatures & Seal */}
            <div className="pt-8 grid grid-cols-3 gap-4 text-center items-end border-t border-slate-200 mt-8">
              <div>
                <div className="font-serif italic text-slate-800 text-sm font-semibold mb-1">
                  {event?.facultyCoordinator.name || 'Faculty Coordinator'}
                </div>
                <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">
                  Event Coordinator
                </div>
              </div>

              {/* Verified College Seal */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-2 border-amber-600/60 flex items-center justify-center p-1 bg-amber-50/40">
                  <ShieldCheck className="w-8 h-8 text-amber-700" />
                </div>
                <div className="text-[10px] text-amber-800 font-semibold uppercase mt-1">
                  Official Record Seal
                </div>
              </div>

              <div>
                <div className="font-serif italic text-slate-800 text-sm font-semibold mb-1">
                  {COLLEGE_INFO.principal}
                </div>
                <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">
                  Principal, DYPCET
                </div>
              </div>
            </div>

            {/* Certificate ID & QR Verification footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-slate-100 text-[11px] text-slate-500 gap-2">
              <div className="flex items-center gap-2">
                <QrCode className="w-4 h-4 text-slate-700" />
                <span>Certificate ID: <strong className="font-mono text-slate-800">{certId}</strong></span>
              </div>
              <div className="text-slate-400">
                Verified via EventMate Academic Portal · Shivaji University, Kolhapur
              </div>
            </div>

          </div>
        </div>

        {/* Modal Bottom note */}
        <div className="no-print bg-slate-50 p-4 border-t border-slate-200 text-center text-xs text-slate-500">
          This digital certificate is permanently stored on the EventMate server and complies with NBA Criterion 8 and NAAC Criterion 5 documentation.
        </div>
      </div>
    </div>
  );
};
