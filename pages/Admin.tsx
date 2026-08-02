import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { collection, getDocs, addDoc, deleteDoc, doc, Timestamp, query, orderBy } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { parseProjectFromText } from '../services/gemini';
import { Loader2, Plus, Trash2, LogOut, Sparkles, LayoutDashboard, MessageSquare } from 'lucide-react';
import { GALLERY_IMAGES } from '../constants';

const Admin: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [aiInput, setAiInput] = useState('');
  const [aiImageUrl, setAiImageUrl] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'leads'>('projects');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        fetchProjects();
        fetchLeads();
      }
    });
    return () => unsubscribe();
  }, []);

  
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error: any) {
      console.error("Auth failed:", error);
      setAuthError(error.message || "Authentication failed.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const fetchProjects = async () => {
    try {
      const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetchedProjects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(fetchedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchLeads = async () => {
    try {
      const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetchedLeads = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLeads(fetchedLeads);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteDoc(doc(db, 'projects', id));
        fetchProjects();
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Failed to delete project.");
      }
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      try {
        await deleteDoc(doc(db, 'leads', id));
        fetchLeads();
      } catch (error) {
        console.error("Error deleting lead:", error);
        alert("Failed to delete lead.");
      }
    }
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [authError, setAuthError] = useState('');

  const [manualProject, setManualProject] = useState({
    title: '',
    category: 'Residential',
    status: 'Completed',
    location: '',
    description: '',
    imageUrl: '',
    images: [] as { url: string, type: 'interior' | 'exterior' | 'general' }[]
  });
  
  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'projects'), {
        ...manualProject,
        createdAt: Timestamp.now()
      });
      setManualProject({
        title: '',
        category: 'Residential',
        status: 'Completed',
        location: '',
        description: '',
        imageUrl: '',
        images: []
      });
      fetchProjects();
      alert("Project added successfully manually!");
    } catch (error) {
      console.error("Error adding project manually:", error);
      alert("Failed to add project.");
    }
  };

  const handleAddImageField = () => {
    setManualProject(prev => ({
      ...prev,
      images: [...prev.images, { url: '', type: 'general' }]
    }));
  };

  const handleImageChange = (index: number, field: 'url' | 'type', value: string) => {
    const newImages = [...manualProject.images];
    newImages[index] = { ...newImages[index], [field]: value } as any;
    setManualProject({ ...manualProject, images: newImages });
  };

  const handleRemoveImageField = (index: number) => {
    const newImages = manualProject.images.filter((_, i) => i !== index);
    setManualProject({ ...manualProject, images: newImages });
  };

  const handleAiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    setIsAiLoading(true);
    try {
      const projectData = await parseProjectFromText(aiInput);
      if (aiImageUrl.trim()) {
        projectData.imageUrl = aiImageUrl;
      }
      await addDoc(collection(db, 'projects'), {
        ...projectData,
        createdAt: Timestamp.now()
      });
      setAiInput('');
      setAiImageUrl('');
      fetchProjects();
      alert("Project added successfully via AI!");
    } catch (error) {
      console.error("AI Error:", error);
      alert("Failed to process request. Please try again.");
    } finally {
      setIsAiLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white p-8 rounded-sm shadow-2xl max-w-md w-full text-center border-t-4 border-blue-900">
          <h2 className="text-2xl font-black text-blue-950 mb-6 uppercase tracking-tight">Admin Portal</h2>
          <p className="text-slate-500 mb-6 text-sm">Sign in to manage website content.</p>
          
          <form onSubmit={handleAuth} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Email</label>
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className="w-full bg-slate-50 border border-slate-200 rounded-sm py-2 px-3 text-sm"
                required 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className="w-full bg-slate-50 border border-slate-200 rounded-sm py-2 px-3 text-sm"
                required 
              />
            </div>
            
            {authError && <p className="text-red-500 text-xs font-bold">{authError}</p>}
            
            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-3 rounded-sm font-black uppercase tracking-widest text-xs hover:bg-blue-800 transition-colors shadow-lg mt-4"
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>
          
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            className="mt-6 text-xs text-blue-600 hover:text-blue-800 font-bold"
          >
            {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
          </button>
        </div>
      </div>
    );
  }

  // Frontend authorization check
  const ADMIN_EMAIL = 'rayyanbasheer02@gmail.com';
  if (user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white p-8 rounded-sm shadow-2xl max-w-md w-full text-center border-t-4 border-red-600">
          <h2 className="text-2xl font-black text-red-600 mb-4 uppercase tracking-tight">Access Denied</h2>
          <p className="text-slate-600 mb-2">You do not have permission to access the admin portal.</p>
          <p className="text-slate-400 text-xs mb-8">Logged in as: {user.email}</p>
          <button
            onClick={handleLogout}
            className="w-full bg-slate-200 text-slate-800 py-3 rounded-sm font-black uppercase tracking-widest text-xs hover:bg-slate-300 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-blue-950 uppercase tracking-tight">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-500 font-medium">{user.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-slate-500 hover:text-red-600 transition-colors text-sm font-bold uppercase tracking-wider"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        <div className="flex space-x-4 mb-8 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('projects')}
            className={`pb-4 px-2 text-sm font-black uppercase tracking-widest flex items-center space-x-2 transition-colors ${
              activeTab === 'projects' ? 'text-blue-900 border-b-2 border-blue-900' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Projects</span>
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`pb-4 px-2 text-sm font-black uppercase tracking-widest flex items-center space-x-2 transition-colors ${
              activeTab === 'leads' ? 'text-blue-900 border-b-2 border-blue-900' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Leads</span>
          </button>
        </div>

        {activeTab === 'projects' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* AI Content Manager */}
              <div className="bg-white p-6 rounded-sm shadow-sm border border-slate-200">
                <div className="flex items-center space-x-2 mb-4">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-black text-blue-950 uppercase tracking-tight">AI Content Manager</h2>
                </div>
                <form onSubmit={handleAiSubmit} className="space-y-4">
                  <textarea
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder="e.g., Add a completed residential villa project in Tanjore..."
                    className="w-full h-32 bg-slate-50 border border-slate-200 rounded-sm py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 resize-none"
                    disabled={isAiLoading}
                  />
                  <input 
                    type="url"
                    value={aiImageUrl}
                    onChange={(e) => setAiImageUrl(e.target.value)}
                    placeholder="Optional: Main Image URL for AI Project"
                    className="w-full bg-slate-50 border border-slate-200 rounded-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
                    disabled={isAiLoading}
                  />
                  <button
                    type="submit"
                    disabled={isAiLoading || !aiInput.trim()}
                    className="w-full bg-blue-900 text-white px-6 py-3 rounded-sm font-black uppercase tracking-widest text-xs hover:bg-blue-800 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {isAiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                    <span>Generate & Add</span>
                  </button>
                </form>
              </div>

              {/* Manual Entry */}
              <div className="bg-white p-6 rounded-sm shadow-sm border border-slate-200">
                <h2 className="text-lg font-black text-blue-950 uppercase tracking-tight mb-4">Manual Entry</h2>
                <form onSubmit={handleManualSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Project Title" required className="bg-slate-50 border border-slate-200 rounded-sm py-2 px-3 text-sm" value={manualProject.title} onChange={e => setManualProject({...manualProject, title: e.target.value})} />
                    <input type="text" placeholder="Location" required className="bg-slate-50 border border-slate-200 rounded-sm py-2 px-3 text-sm" value={manualProject.location} onChange={e => setManualProject({...manualProject, location: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <select className="bg-slate-50 border border-slate-200 rounded-sm py-2 px-3 text-sm" value={manualProject.category} onChange={e => setManualProject({...manualProject, category: e.target.value})}>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Educational">Educational</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Religious">Religious</option>
                      <option value="Renovation">Renovation</option>
                    </select>
                    <select className="bg-slate-50 border border-slate-200 rounded-sm py-2 px-3 text-sm" value={manualProject.status} onChange={e => setManualProject({...manualProject, status: e.target.value})}>
                      <option value="Completed">Completed</option>
                      <option value="Ongoing">Ongoing</option>
                    </select>
                  </div>
                  <textarea placeholder="Description" required className="w-full bg-slate-50 border border-slate-200 rounded-sm py-2 px-3 text-sm resize-none h-20" value={manualProject.description} onChange={e => setManualProject({...manualProject, description: e.target.value})} />
                  
                  <input type="url" placeholder="Main Image URL" required className="w-full bg-slate-50 border border-slate-200 rounded-sm py-2 px-3 text-sm" value={manualProject.imageUrl} onChange={e => setManualProject({...manualProject, imageUrl: e.target.value})} />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Additional Images</span>
                      <button type="button" onClick={handleAddImageField} className="text-xs text-blue-600 hover:text-blue-800 font-bold">+ Add Image</button>
                    </div>
                    {manualProject.images.map((img, idx) => (
                      <div key={idx} className="flex space-x-2">
                        <input type="url" placeholder="Image URL" required className="flex-1 bg-slate-50 border border-slate-200 rounded-sm py-2 px-3 text-sm" value={img.url} onChange={e => handleImageChange(idx, 'url', e.target.value)} />
                        <select className="w-28 bg-slate-50 border border-slate-200 rounded-sm py-2 px-2 text-sm" value={img.type} onChange={e => handleImageChange(idx, 'type', e.target.value)}>
                          <option value="interior">Interior</option>
                          <option value="exterior">Exterior</option>
                          <option value="general">General</option>
                        </select>
                        <button type="button" onClick={() => handleRemoveImageField(idx)} className="p-2 text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    ))}
                  </div>

                  <button type="submit" className="w-full bg-blue-900 text-white px-6 py-3 rounded-sm font-black uppercase tracking-widest text-xs hover:bg-blue-800 transition-colors">
                    Add Project Manually
                  </button>
                </form>
              </div>
            </div>

            {/* Project List */}
            <div className="bg-white p-6 rounded-sm shadow-sm border border-slate-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-black text-blue-950 uppercase tracking-tight">Live Projects</h2>
              </div>
              
              {projects.length === 0 ? (
                <p className="text-slate-500 text-sm py-8 text-center">No projects found. Add one using the AI manager above or manual entry.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="py-3 px-4 text-xs font-black text-slate-500 uppercase tracking-widest">Image</th>
                        <th className="py-3 px-4 text-xs font-black text-slate-500 uppercase tracking-widest">Details</th>
                        <th className="py-3 px-4 text-xs font-black text-slate-500 uppercase tracking-widest">Category</th>
                        <th className="py-3 px-4 text-xs font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((project) => (
                        <tr key={project.id} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="py-3 px-4">
                            <img src={project.imageUrl} alt={project.title} className="w-16 h-16 object-cover rounded-sm" />
                          </td>
                          <td className="py-3 px-4">
                            <p className="font-bold text-blue-950 text-sm">{project.title}</p>
                            <p className="text-xs text-slate-500">{project.location} • {project.status}</p>
                          </td>
                          <td className="py-3 px-4">
                            <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider">
                              {project.category}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => handleDeleteProject(project.id)}
                              className="text-red-500 hover:text-red-700 p-2"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="bg-white p-6 rounded-sm shadow-sm border border-slate-200">
            <h2 className="text-lg font-black text-blue-950 uppercase tracking-tight mb-6">Customer Leads</h2>
            {leads.length === 0 ? (
              <p className="text-slate-500 text-sm py-8 text-center">No leads found yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-3 px-4 text-xs font-black text-slate-500 uppercase tracking-widest">Date</th>
                      <th className="py-3 px-4 text-xs font-black text-slate-500 uppercase tracking-widest">Contact</th>
                      <th className="py-3 px-4 text-xs font-black text-slate-500 uppercase tracking-widest">Message</th>
                      <th className="py-3 px-4 text-xs font-black text-slate-500 uppercase tracking-widest">Source</th>
                      <th className="py-3 px-4 text-xs font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 px-4 text-xs text-slate-500">
                          {lead.createdAt?.toDate().toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <p className="font-bold text-blue-950 text-sm">{lead.name}</p>
                          <p className="text-xs text-slate-500">{lead.phone}</p>
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-600 max-w-xs truncate">
                          {lead.message}
                        </td>
                        <td className="py-3 px-4">
                          <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider">
                            {lead.source}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="text-red-500 hover:text-red-700 p-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
