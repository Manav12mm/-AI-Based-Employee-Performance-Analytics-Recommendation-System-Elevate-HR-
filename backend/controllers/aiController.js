const axios = require('axios');
const Employee = require('../models/Employee');

// @desc    Generate AI recommendations for an employee
// @route   POST /api/ai/recommend
// @access  Private
exports.generateRecommendation = async (req, res) => {
    try {
        const { employeeId } = req.body;

        if (!employeeId) {
            return res.status(400).json({ message: 'Employee ID is required' });
        }

        const trimmedId = String(employeeId).trim();
        const employee = await Employee.findById(trimmedId);

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const apiKey = process.env.OPENROUTER_API_KEY;

        if (!apiKey || apiKey === 'your_openrouter_api_key_here') {
            return res.status(500).json({ message: 'AI API Key is missing or invalid' });
        }

        const prompt = `
        Analyze the following employee data and provide a brief, professional AI recommendation.
        Consider promotion suitability, ranking insights, training suggestions, and improvement feedback.

        Employee Name: ${employee.name}
        Department: ${employee.department}
        Years of Experience: ${employee.experience}
        Performance Score (0-100): ${employee.performanceScore}
        Skills: ${employee.skills.join(', ')}

        Format your response nicely in Markdown with bullet points.
        Include sections:
        - Promotion Recommendation
        - Performance & Ranking Insights
        - Training Suggestions
        - General Feedback
        `;

        const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
            model: 'openai/gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }]
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.data && response.data.choices && response.data.choices.length > 0) {
            const aiRecommendation = response.data.choices[0].message.content;
            res.json({ recommendation: aiRecommendation });
        } else {
            throw new Error('Invalid response from AI API');
        }

    } catch (error) {
        console.error('AI API Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Failed to generate AI recommendation' });
    }
};
