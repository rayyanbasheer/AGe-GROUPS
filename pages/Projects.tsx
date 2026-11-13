import React, { useState, useEffect } from 'react';
import { db, OperationType, handleFirestoreError } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { X, Building2, ArrowUpRight } from 'lucide-react';
import { DEFAULT_PROJECTS } from '../constants';

interface ProjectsProps {
  embedded?: boolean;
}

const isPlaceholderUnsplash = (url?: string) =>
  Boolean(url && url.includes('images.unsplash.com'));

const Projects: React.FC<ProjectsProps> = ({ embedded = false }) => {
  const [filter, setFilter] = useState('All');
  const [firestoreProjects, setFirestoreProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});
  const categories = ['All', 'Residential', 'Commercial', 'Educational', 'Healthcare', 'Religious', 'Renovation'];

  useEffect(() => {
    const q = collection(db, 'projects');
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const projData = snapshot.docs.map((doc) => {
          const data = doc.data();
          // Filter out AI-hallucinated Unsplash URLs from images array so real project imageUrl is always used
          const cleanImages = Array.isArray(data.images)
            ? data.images.filter(
                (img: any) =>
                  img?.url &&
                  !isPlaceholderUnsplash(img.url) &&
                  img.url !== data.imageUrl
              )
            : [];
          return {
            id: doc.id,
            ...data,
            images: cleanImages
          };
        });
        setFirestoreProjects(projData);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'projects');
      }
    );
    return () => unsubscribe();
  }, []);

  const allProjects =
    firestoreProjects.length > 0
      ? [...firestoreProjects, ...DEFAULT_PROJECTS]
      : DEFAULT_PROJECTS;

  const filteredProjects =
    filter === 'All'
      ? allProjects
      : allProjects.filter((p) => p.category === filter);

  return (
    <div className={embedded ? 'py-20 lg:py-24 bg-slate-50 border-b border-slate-200' : 'pt-16 pb-20 bg-slate-50'}>
      {!embedded && (
        <section className="bg-slate-900 py-20 text-center border-b border-slate-800 mb-12">
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-sm font-medium text-blue-300 mb-2">Completed &amp; Ongoing Structures</p>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
              Project Portfolio
            </h1>
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <p className="text-sm font-semibold text-[#000080] mb-1">
              05. Proof of Execution
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight text-balance">
              Selected architectural &amp; civil works
            </h2>
          </div>

          {/* Interactive Filter Tabs (Segmented Control) */}
          <div
            role="tablist"
            aria-label="Filter projects by sector"
            className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/80 rounded-lg border border-slate-200"
          >
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={filter === c}
                onClick={() => setFilter(c)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 ${
                  filter === c
                    ? 'bg-white text-slate-900 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-lg p-12 text-center">
            <p className="text-slate-600 text-sm mb-4">
              No projects currently listed under the <strong className="text-slate-900">{filter}</strong> category.
            </p>
            <button
              type="button"
              onClick={() => setFilter('All')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#000080] hover:bg-blue-900 rounded-md transition-colors"
            >
              Show All Projects
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((p, i) => {
              const key = p.id || `proj-${i}`;
              const isBroken = brokenImages[key];
              return (
                <article
                  key={key}
                  onClick={() => setSelectedProject(p)}
                  className="group bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col justify-between cursor-pointer hover:border-slate-300 transition-colors"
                >
                  <div>
                    <div className="aspect-video w-full bg-slate-900 overflow-hidden relative border-b border-slate-100">
                      {!isBroken && p.imageUrl ? (
                        <img
                          src={p.imageUrl}
                          alt={p.title}
                          referrerPolicy="no-referrer"
                          onError={() => setBrokenImages((prev) => ({ ...prev, [key]: true }))}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-100">
                          <Building2 className="w-10 h-10 text-slate-400 mb-2" />
                          <span className="text-xs font-medium text-slate-600">{p.title}</span>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      {/* Zero-Pill Metadata: clean unboxed text with typographic separators */}
                      <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 mb-2">
                        <span className="font-medium text-[#000080]">{p.category}</span>
                        {p.location && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{p.location}</span>
                          </>
                        )}
                        {p.status && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono-tabular">{p.status}</span>
                          </>
                        )}
                      </div>

                      <h3 className="text-lg font-display font-bold text-slate-900 mb-2 group-hover:text-[#000080] transition-colors flex items-center justify-between gap-2">
                        <span>{p.title}</span>
                        <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#000080] shrink-0" />
                      </h3>

                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                        {p.description}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white max-w-4xl w-full rounded-lg border border-slate-200 shadow-xl relative my-8 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-[#000080]">{selectedProject.category}</span>
                {selectedProject.location && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{selectedProject.location}</span>
                  </>
                )}
                {selectedProject.status && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono-tabular">{selectedProject.status}</span>
                  </>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
                className="p-1.5 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 max-h-[82vh] overflow-y-auto space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mb-3">
                  {selectedProject.title}
                </h2>
                <p className="text-slate-600 text-base leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Always show the primary Exterior / Main Image first so card exterior and modal view match */}
              {selectedProject.imageUrl && (
                <div>
                  <h3 className="text-sm font-display font-semibold text-slate-900 mb-3 pb-2 border-b border-slate-100">
                    Exterior View
                  </h3>
                  <img
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto max-h-[540px] object-contain bg-slate-950 rounded-md border border-slate-200"
                  />
                </div>
              )}

              {/* Render any additional authentic uploaded views */}
              {selectedProject.images && selectedProject.images.length > 0 && (
                <div className="space-y-6">
                  {['exterior', 'interior', 'general'].map((type) => {
                    const imgs = selectedProject.images.filter(
                      (img: any) =>
                        img.type === type &&
                        img.url &&
                        img.url !== selectedProject.imageUrl &&
                        !isPlaceholderUnsplash(img.url)
                    );
                    if (imgs.length === 0) return null;
                    return (
                      <div key={type}>
                        <h3 className="text-sm font-display font-semibold text-slate-900 capitalize mb-3 pb-2 border-b border-slate-100">
                          Additional {type} Views
                        </h3>
                        <div className={`grid grid-cols-1 ${imgs.length > 1 ? 'md:grid-cols-2' : ''} gap-4`}>
                          {imgs.map((img: any, idx: number) => (
                            <img
                              key={idx}
                              src={img.url}
                              alt={`${selectedProject.title} ${type} view`}
                              referrerPolicy="no-referrer"
                              className="w-full h-auto max-h-[520px] object-contain bg-slate-950 rounded-md border border-slate-200"
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;