import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Sparkles, Trash2 } from 'lucide-react';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [selectedEmp, setSelectedEmp] = useState(null);

  const token = localStorage.getItem('token');

  const fetchEmployees = async (searchQuery = '') => {
    try {
      setLoading(true);
      const url = searchQuery 
        ? `http://localhost:5000/api/employees/search?department=${searchQuery}`
        : 'http://localhost:5000/api/employees';
      
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchEmployees(search);
  };

  const deleteEmployee = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`http://localhost:5000/api/employees/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchEmployees(search);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const generateAIRecommendation = async (employee) => {
    setAiLoading(true);
    setSelectedEmp(employee.name);
    setRecommendation(null);
    try {
      const res = await axios.post('http://localhost:5000/api/ai/recommend', 
        { employeeId: employee._id },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      setRecommendation(res.data.recommendation);
    } catch (err) {
      console.error(err);
      setRecommendation("Failed to generate recommendation. Check backend logs.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-5 rounded-xl shadow-sm border border-stone-200">
        <h1 className="text-2xl font-bold text-stone-800">Employee Directory</h1>
        
        <form onSubmit={handleSearch} className="flex gap-2">
          <input 
            type="text" 
            placeholder="Search by Department..." 
            className="px-4 py-2 border border-stone-200 bg-stone-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="bg-amber-100 p-2 rounded-lg hover:bg-amber-200 text-amber-700 transition-colors">
            <Search size={20} />
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: List */}
        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            <div className="text-center py-10 text-stone-500">Loading employees...</div>
          ) : employees.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-xl border border-stone-200 text-stone-500 shadow-sm">No employees found.</div>
          ) : (
            employees.map(emp => (
              <div key={emp._id} className="bg-white p-5 rounded-xl shadow-sm border border-stone-100 hover:shadow-md hover:border-amber-100 transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-stone-800">{emp.name}</h3>
                    <p className="text-sm text-stone-500">{emp.email} • {emp.department}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {emp.skills.map((skill, idx) => (
                        <span key={idx} className="bg-orange-50 text-orange-700 border border-orange-100 text-xs px-2.5 py-1 rounded-full font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <div className="text-sm font-semibold bg-stone-50 px-2 py-1 rounded border border-stone-100">
                      Score: <span className={emp.performanceScore >= 80 ? 'text-emerald-600' : 'text-amber-600'}>{emp.performanceScore}/100</span>
                    </div>
                    <div className="text-xs text-stone-500">{emp.experience} yrs exp</div>
                    <div className="flex gap-2 mt-2">
                      <button 
                        onClick={() => generateAIRecommendation(emp)}
                        className="flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-100 text-rose-700 px-3 py-1.5 rounded-lg text-sm transition-colors font-medium shadow-sm"
                        title="AI Recommend"
                      >
                        <Sparkles size={14} className="text-rose-500" /> AI Analysis
                      </button>
                      <button 
                        onClick={() => deleteEmployee(emp._id)}
                        className="text-stone-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Column: AI Output */}
        <div className="lg:col-span-1">
          <div className="bg-[#fffbeb] p-6 rounded-xl shadow-sm border border-amber-200 sticky top-4 min-h-[400px]">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-amber-800 border-b border-amber-200 pb-3">
              <Sparkles className="text-amber-600" /> 
              AI Assistant
            </h2>
            
            {aiLoading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-amber-100 rounded w-3/4"></div>
                <div className="h-4 bg-amber-100 rounded w-full"></div>
                <div className="h-4 bg-amber-100 rounded w-5/6"></div>
                <p className="text-sm text-amber-600 pt-4 text-center font-medium">Analyzing {selectedEmp}'s profile...</p>
              </div>
            ) : recommendation ? (
              <div className="prose prose-sm prose-amber">
                <h4 className="text-sm font-semibold text-amber-700/70 mb-2 uppercase tracking-wider">Analysis for {selectedEmp}</h4>
                <div className="whitespace-pre-wrap text-sm text-stone-700 leading-relaxed bg-white/60 p-4 rounded-lg border border-amber-100/50">
                  {recommendation}
                </div>
              </div>
            ) : (
              <div className="text-center text-amber-700/50 mt-20 text-sm font-medium">
                Click on "AI Analysis" on any employee card to generate performance insights and recommendations.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
