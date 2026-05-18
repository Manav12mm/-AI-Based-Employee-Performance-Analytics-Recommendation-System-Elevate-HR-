import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    skills: '', // will be comma separated string in form, array in backend
    performanceScore: '',
    experience: ''
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const payload = {
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
        performanceScore: Number(formData.performanceScore),
        experience: Number(formData.experience)
      };

      await axios.post(`${API_BASE_URL}/api/employees`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setSuccess('Employee added successfully!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add employee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-stone-200 mt-6">
      <h2 className="text-2xl font-bold mb-6 text-stone-800">Add New Employee</h2>
      
      {error && <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 text-sm border border-red-100">{error}</div>}
      {success && <div className="bg-emerald-50 text-emerald-700 p-3 rounded-lg mb-4 text-sm border border-emerald-100">{success}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-stone-700 mb-1.5 text-sm font-medium">Full Name</label>
            <input 
              type="text" 
              name="name"
              className="w-full px-4 py-2 border border-stone-200 bg-stone-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-stone-700 mb-1.5 text-sm font-medium">Email</label>
            <input 
              type="email" 
              name="email"
              className="w-full px-4 py-2 border border-stone-200 bg-stone-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-stone-700 mb-1.5 text-sm font-medium">Department</label>
            <input 
              type="text" 
              name="department"
              className="w-full px-4 py-2 border border-stone-200 bg-stone-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-stone-700 mb-1.5 text-sm font-medium">Experience (Years)</label>
            <input 
              type="number" 
              name="experience"
              min="0"
              className="w-full px-4 py-2 border border-stone-200 bg-stone-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow"
              value={formData.experience}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-stone-700 mb-1.5 text-sm font-medium">Skills (comma separated)</label>
          <input 
            type="text" 
            name="skills"
            placeholder="e.g. React, Node.js, MongoDB"
            className="w-full px-4 py-2 border border-stone-200 bg-stone-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow"
            value={formData.skills}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label className="block text-stone-700 mb-1.5 text-sm font-medium">Performance Score (0-100)</label>
          <input 
            type="number" 
            name="performanceScore"
            min="0"
            max="100"
            className="w-full px-4 py-2 border border-stone-200 bg-stone-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow"
            value={formData.performanceScore}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="pt-6 flex gap-4">
          <button 
            type="button"
            onClick={() => navigate('/dashboard')}
            className="w-full bg-stone-100 text-stone-700 py-2.5 rounded-lg hover:bg-stone-200 transition-colors font-medium border border-stone-200"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-amber-600 text-white py-2.5 rounded-lg hover:bg-amber-700 shadow-md shadow-amber-600/20 transition-all disabled:opacity-50 font-medium"
          >
            {loading ? 'Adding...' : 'Add Employee'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
