import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        email,
        password
      });
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('loginTime', Date.now());
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-stone-200 rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold text-center mb-6 text-stone-800">Register for ElevateHR</h2>
      {error && <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 text-sm border border-red-100">{error}</div>}
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-stone-700 mb-1 text-sm font-medium">Email</label>
          <input 
            type="email" 
            className="w-full px-4 py-2 border border-stone-200 bg-stone-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-stone-700 mb-1 text-sm font-medium">Password (Min 6 chars)</label>
          <input 
            type="password" 
            className="w-full px-4 py-2 border border-stone-200 bg-stone-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-emerald-600 text-white py-2.5 rounded-lg hover:bg-emerald-700 shadow-md shadow-emerald-600/20 transition-all disabled:opacity-50 font-medium"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <div className="mt-6 text-center text-sm text-stone-500">
        Already have an account? <Link to="/login" className="text-amber-600 hover:text-amber-700 font-medium ml-1 hover:underline">Login here</Link>
      </div>
    </div>
  );
};

export default Register;
