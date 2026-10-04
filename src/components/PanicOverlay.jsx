import React, { useEffect } from 'react';
import { FileText } from 'lucide-react';

export const PanicOverlay = ({ isOpen, onClose }) => {
  useEffect(() => {
    const originalTitle = document.title;
    if (isOpen) {
      document.title = 'AP World History: Unit 4 Industrialization Analysis - Google Docs';
    } else {
      document.title = originalTitle;
    }
    return () => {
      document.title = originalTitle;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-white text-slate-900 select-text overflow-y-auto">
      {/* Google Docs style top toolbar */}
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-2 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded bg-blue-600 text-white font-bold">
              <FileText className="h-4 w-4" />
            </span>
            <div>
              <div className="font-semibold text-slate-800 text-sm">
                Unit 4: Economic Systems & Technological Advancements (Research Notes)
              </div>
              <div className="flex items-center gap-3 text-[11px] text-slate-500">
                <span>File</span>
                <span>Edit</span>
                <span>View</span>
                <span>Insert</span>
                <span>Format</span>
                <span>Tools</span>
                <span className="text-emerald-600 font-medium">Saved to Drive</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            title="Press [ to return"
            className="rounded border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-100"
          >
            Resume firestudeo (or press [ key)
          </button>
        </div>
      </div>

      {/* Realistic Document Paper Page */}
      <div className="mx-auto my-8 w-full max-w-3xl rounded border border-slate-200 bg-white p-12 shadow-sm font-serif text-slate-800 leading-relaxed text-sm">
        <h1 className="text-2xl font-bold text-slate-900 mb-4 font-sans">
          The Second Industrial Revolution: Technological and Societal Paradigm Shifts
        </h1>
        <p className="text-xs text-slate-500 font-sans mb-6">
          Course: AP European History · Period 3 · Section B
        </p>

        <h2 className="text-base font-bold text-slate-800 mt-6 mb-2 font-sans">
          1. Introduction & Primary Catalysts
        </h2>
        <p className="mb-4">
          Between roughly 1870 and 1914, the Second Industrial Revolution (often termed the Technological Revolution) represented a phase of rapid industrialization characterized by the expansion of electricity, petroleum, and steel production. Unlike the first phase, which was dominated by textile manufacturing and steam power in Great Britain, the second phase was multi-polar, with rapid advancements occurring simultaneously across Western Europe, the United States, and Japan.
        </p>

        <h2 className="text-base font-bold text-slate-800 mt-6 mb-2 font-sans">
          2. Steel Refining: The Bessemer and Open-Hearth Processes
        </h2>
        <p className="mb-4">
          The development of the Bessemer converter and the subsequent Siemens-Martin open-hearth process drastically decreased the production cost of steel while elevating tensile strength. This directly stimulated the expansion of rail transport networks, maritime steamships, and skyscraper architecture in booming metropolitan centers.
        </p>

        <div className="my-6 p-4 bg-slate-50 border-l-4 border-blue-500 text-xs font-sans text-slate-700">
          <strong>Key Takeaway for Exam:</strong> Compare and contrast the energy infrastructure of the First (coal, steam) versus Second (petroleum, electric grids, internal combustion) Industrial Revolutions.
        </div>

        <h2 className="text-base font-bold text-slate-800 mt-6 mb-2 font-sans">
          3. Electrification and Factory Modernization
        </h2>
        <p className="mb-4">
          Electrification eliminated the architectural constraint of placing machines adjacent to centralized central steam shafts. Electric motors permitted decentralized floor layouts, introducing the modern assembly line pioneered by automotive manufacturers.
        </p>
      </div>
    </div>
  );
};
