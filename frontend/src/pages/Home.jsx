import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Users, Award, BookOpen, Star, Send } from 'lucide-react';

const Home = () => {
  const token = localStorage.getItem('token');
  const [feedback, setFeedback] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate successful feedback submission
    setSubmitted(true);
    setTimeout(() => {
      setFeedback({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "VP of HR at TechNova",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      quote: "ElevateHR has completely transformed how we evaluate our engineering team. The AI recommendations for promotions are incredibly insightful and bias-free.",
      rating: 5
    },
    {
      name: "Marcus Chen",
      role: "Chief Talent Officer at Solaria",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      quote: "The skills mapping and automated training suggestions saved our L&D team dozens of hours. A must-have tool for any modern growing organization.",
      rating: 5
    },
    {
      name: "Elena Rostova",
      role: "HR Director at Innovate Ltd",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
      quote: "With ElevateHR's intuitive dashboard and session tracking, our talent analytics has reached a whole new level of efficiency.",
      rating: 5
    }
  ];

  return (
    <div className="space-y-20 pb-16 font-sans">
      {/* Hero Section */}
      <section className="relative text-center py-20 px-6 bg-gradient-to-b from-amber-50/50 to-transparent rounded-3xl border border-amber-100/30 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(251,191,36,0.15),rgba(255,255,255,0))]"></div>
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-1.5 bg-amber-100/80 border border-amber-200 text-amber-800 text-xs px-3.5 py-1.5 rounded-full font-semibold tracking-wide uppercase">
            <Sparkles size={14} className="text-amber-600 animate-pulse" /> Next-Gen Talent Management
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-stone-900 leading-tight">
            Unlock the Real Potential of <br />
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Your Workforce</span>
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            ElevateHR uses advanced AI analytics to track performance metrics, identify skill gaps, and provide actionable recommendations for promotion and training.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to={token ? "/dashboard" : "/login"}
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-amber-600/20 transition-all text-center"
            >
              {token ? "Go to Dashboard" : "Get Started Now"}
            </Link>
            <a
              href="#about"
              className="bg-white hover:bg-stone-50 text-stone-700 font-semibold px-8 py-3.5 rounded-xl border border-stone-200 shadow-sm transition-all text-center"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-6xl mx-auto px-4 scroll-mt-24 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold text-stone-900 tracking-tight">About ElevateHR</h2>
          <p className="text-stone-600">
            We bridge the gap between employee performance data and intelligent talent strategies. ElevateHR empowers HR administrators to make fast, informed, data-backed talent decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-md transition-all space-y-4 group hover:border-amber-200">
            <div className="w-12 h-12 bg-amber-50 rounded-xl border border-amber-100 flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-bold text-stone-900">Talent Profiles</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Maintain clean, accurate records of team skills, experience levels, and historical performance scores on a unified, easy-to-use directory.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-md transition-all space-y-4 group hover:border-amber-200">
            <div className="w-12 h-12 bg-rose-50 rounded-xl border border-rose-100 flex items-center justify-center text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-all">
              <Award size={24} />
            </div>
            <h3 className="text-xl font-bold text-stone-900">AI-Powered Evaluations</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Instantly generate intelligent growth analyses, bias-free promotion recommendations, and potential organizational ranking forecasts.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-md transition-all space-y-4 group hover:border-amber-200">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <BookOpen size={24} />
            </div>
            <h3 className="text-xl font-bold text-stone-900">L&D Recommendations</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Identify skill deficits automatically and let our generative AI provide personalized, targeted training recommendations for every employee.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-b from-stone-50 to-stone-100/50 py-16 px-4 rounded-3xl border border-stone-200/40">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl font-bold text-stone-900 tracking-tight">Loved by People Leaders</h2>
            <p className="text-stone-600">
              See how modern organizations are leveraging ElevateHR to cultivate top-tier, highly engaged workforces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-stone-600 text-sm italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-2 border-t border-stone-100">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-amber-100"
                  />
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">{t.name}</h4>
                    <p className="text-stone-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="max-w-3xl mx-auto px-4 space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-stone-900 tracking-tight">We'd Love Your Feedback</h2>
          <p className="text-stone-600 text-sm">
            Have questions or suggestions about ElevateHR? Drop us a line below and help us elevate the product.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm relative overflow-hidden">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full flex items-center justify-center mx-auto text-2xl animate-bounce">
                ✓
              </div>
              <h3 className="text-xl font-bold text-stone-900">Thank you!</h3>
              <p className="text-stone-500 text-sm">Your feedback was successfully submitted. We appreciate your insights!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-stone-700 mb-1.5 text-sm font-medium">Your Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2.5 border border-stone-200 bg-stone-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-sm"
                    value={feedback.name}
                    onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-stone-700 mb-1.5 text-sm font-medium">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2.5 border border-stone-200 bg-stone-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-sm"
                    value={feedback.email}
                    onChange={(e) => setFeedback({ ...feedback, email: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-stone-700 mb-1.5 text-sm font-medium">Message / Feedback</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share your thoughts with us..."
                  className="w-full px-4 py-2.5 border border-stone-200 bg-stone-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-sm"
                  value={feedback.message}
                  onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 shadow-md shadow-amber-600/10 transition-all font-semibold flex items-center justify-center gap-2"
              >
                <Send size={16} /> Send Feedback
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
