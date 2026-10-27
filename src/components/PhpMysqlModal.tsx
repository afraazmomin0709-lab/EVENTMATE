import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SQL_SCHEMA, PHP_SAMPLE_CODE } from '../data/backendArchitecture';
import { X, Database, Code, Download, Copy, Check, Server } from 'lucide-react';

export const PhpMysqlModal: React.FC = () => {
  const { showPhpMysqlModal, setShowPhpMysqlModal, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'sql' | 'php-config' | 'php-register' | 'php-attendance'>('sql');
  const [copied, setCopied] = useState(false);

  if (!showPhpMysqlModal) return null;

  const currentContent = activeTab === 'sql' 
    ? SQL_SCHEMA 
    : activeTab === 'php-config' 
    ? PHP_SAMPLE_CODE.db_config 
    : activeTab === 'php-register' 
    ? PHP_SAMPLE_CODE.register_event 
    : PHP_SAMPLE_CODE.mark_attendance;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentContent);
    setCopied(true);
    showToast('Copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSql = () => {
    const blob = new Blob([SQL_SCHEMA], { type: 'text/sql;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'eventmate_dypcet.sql');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Downloaded eventmate_dypcet.sql for XAMPP / phpMyAdmin', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-950 text-slate-100 rounded-xl shadow-2xl border border-slate-800 max-w-4xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-900 px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                PHP & MySQL Backend Architecture (XAMPP / phpMyAdmin)
              </h3>
              <p className="text-xs text-slate-400">
                Complete relational database schema & PHP backend API scripts for DYPCET EventMate
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadSql}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .SQL</span>
            </button>
            <button
              onClick={() => setShowPhpMysqlModal(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Controls Bar */}
        <div className="bg-slate-900/60 px-6 py-2 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2 shrink-0">
          <div className="flex items-center gap-1 text-xs">
            <button
              onClick={() => setActiveTab('sql')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                activeTab === 'sql' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              MySQL Schema (.sql)
            </button>
            <button
              onClick={() => setActiveTab('php-config')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                activeTab === 'php-config' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              db_config.php
            </button>
            <button
              onClick={() => setActiveTab('php-register')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                activeTab === 'php-register' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              api/register_event.php
            </button>
            <button
              onClick={() => setActiveTab('php-attendance')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                activeTab === 'php-attendance' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              api/mark_attendance.php
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs text-slate-300 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Code'}</span>
          </button>
        </div>

        {/* Code Viewport */}
        <div className="p-6 overflow-y-auto font-mono text-xs text-slate-200 bg-slate-950 flex-1 leading-relaxed selection:bg-blue-700 selection:text-white">
          <pre className="whitespace-pre-wrap">{currentContent}</pre>
        </div>

        {/* Quick Instructions Banner */}
        <div className="bg-slate-900 p-4 border-t border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>XAMPP Setup:</strong> Start Apache & MySQL in XAMPP → Open <code>http://localhost/phpmyadmin</code> → Import <code>eventmate_dypcet.sql</code>.
            </span>
          </div>
          <button
            onClick={() => setShowPhpMysqlModal(false)}
            className="px-4 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-white font-medium"
          >
            Dismiss
          </button>
        </div>

      </div>
    </div>
  );
};
