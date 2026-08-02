import React, { useState, useEffect } from 'react';
import { db, OperationType, handleFirestoreError } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { X } from 'lucide-react';

const Projects: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const categories = ['All', 'Residential', 'Commercial', 'Educational', 'Healthcare', 'Religious', 'Renovation'];
  
  useEffect(() => {
    const q = collection(db, 'projects');
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(projData);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'projects');
    });
    return () => unsubscribe();
  }, []);

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="pt-0 pb-20 bg-slate-50">
      <section className="bg-blue-950 pt-48 pb-32 text-center relative overflow-hidden border-b-8 border-slate-200">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '25px 25px'}}></div>
        </div>
        <h1 className="text-6xl font-black text-white mb-6 uppercase tracking-tighter relative z-10">PORTFOLIO</h1>
        <p className="text-slate-400 max-w-2xl mx-auto px-4 font-black tracking-[0.3em] uppercase text-[10px] relative z-10">
          Engineering Precision • Architectural Legacy
        </p>
      </section>

      {/* Filter */}
      <section className="max-w-7xl mx-auto px-4 -mt-10 relative z-20 mb-20">
        <div className="flex flex-wrap justify-center gap-2 bg-white p-6 shadow-2xl border border-slate-200 rounded-sm">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-8 py-4 rounded-sm text-[10px] font-black uppercase tracking-[0.3em] transition-all transform hover:scale-105 ${
                filter === c 
                  ? 'bg-blue-900 text-white shadow-xl' 
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4">
        {projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">No projects found. Please add projects from the admin dashboard.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((p, i) => (
              <div key={i} className="group relative bg-white border border-slate-200 rounded-sm overflow-hidden aspect-square shadow-sm hover:shadow-2xl transition-all duration-700 cursor-pointer" onClick={() => setSelectedProject(p)}>
                <img 
                  src={p.imageUrl} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                  alt={p.title}
                />
                <div className="absolute inset-0 bg-blue-950/0 group-hover:bg-blue-950/90 transition-all duration-500 flex flex-col justify-end p-10">
                  <div className="translate-y-12 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-white bg-blue-900 px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-4 inline-block">{p.category}</span>
                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none mb-2">{p.title}</h3>
                    <p className="text-slate-300 text-xs font-medium line-clamp-2">{p.description}</p>
                    <div className="mt-4 flex items-center space-x-4 text-xs text-slate-400">
                      <span>{p.location}</span>
                      <span>•</span>
                      <span>{p.status}</span>
                    </div>
                    <div className="w-16 h-1 bg-white mt-6 opacity-0 group-hover:opacity-100 transition-opacity delay-300"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] bg-blue-950/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white max-w-4xl w-full rounded-sm shadow-2xl relative my-8">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 bg-white p-2 rounded-sm shadow-md hover:bg-slate-100"
            >
              <X className="w-6 h-6 text-slate-700" />
            </button>
            <div className="p-8">
              <h2 className="text-3xl font-black text-blue-950 uppercase tracking-tight mb-2">{selectedProject.title}</h2>
              <div className="flex items-center space-x-4 mb-6 text-sm font-bold text-slate-500 uppercase tracking-widest">
                <span>{selectedProject.category}</span>
                <span>•</span>
                <span>{selectedProject.location}</span>
              </div>
              <p className="text-slate-600 mb-8 leading-relaxed">{selectedProject.description}</p>
              
              {selectedProject.images && selectedProject.images.length > 0 ? (
                <div className="space-y-8">
                  {['exterior', 'interior', 'general'].map(type => {
                    const imgs = selectedProject.images.filter((img: any) => img.type === type);
                    if (imgs.length === 0) return null;
                    return (
                      <div key={type}>
                        <h3 className="text-lg font-black text-blue-900 uppercase tracking-widest mb-4 border-b-2 border-slate-100 pb-2">{type} Views</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {imgs.map((img: any, idx: number) => (
                            <img key={idx} src={img.url} alt={`${type} view`} className="w-full h-64 object-cover rounded-sm shadow-md" />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <img src={selectedProject.imageUrl} alt={selectedProject.title} className="w-full h-96 object-cover rounded-sm shadow-md" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;