document.getElementById('stressForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let data = {
        sr: parseFloat(document.getElementById('sr').value),
        rr: parseFloat(document.getElementById('rr').value),
        t: parseFloat(document.getElementById('t').value),
        lm: parseFloat(document.getElementById('lm').value),
        bo: parseFloat(document.getElementById('bo').value),
        rem: parseFloat(document.getElementById('rem').value),
        sh: parseFloat(document.getElementById('sh').value),
        hr: parseFloat(document.getElementById('hr').value)
    };

    fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        // Determine stress category
        let categoryText = '';
        let suggestions = '';

        if (data.stress_category === 0) {
            categoryText = 'Not Stressed';
            suggestions = `
                <h3>General Advice:</h3>
                <p>You're doing well! Keep maintaining a balanced lifestyle and continue with your current routines.</p>
                <h3>Lifestyle Tips:</h3>
                <ul>
                    <li>Continue regular physical activity.</li>
                    <li>Maintain a healthy diet.</li>
                    <li>Keep up with good sleep habits.</li>
                    <li>Stay hydrated and take breaks when needed.</li>
                </ul>
                <h3>Additional Suggestions:</h3>
                <ul>
                    <li>Consider practicing mindfulness or meditation to keep stress levels low.</li>
                    <li>Engage in hobbies and activities that bring you joy.</li>
                </ul>
            `;
        } else if (data.stress_category === 1) {
            categoryText = 'Stressed';
            suggestions = `
                <h3>General Advice:</h3>
                <p>It looks like you're experiencing some stress. It's important to address it to avoid long-term effects.</p>
                <h3>Lifestyle Tips:</h3>
                <ul>
                    <li>Try incorporating relaxation techniques such as deep breathing exercises or meditation.</li>
                    <li>Make time for physical exercise to relieve tension.</li>
                    <li>Ensure you're getting adequate sleep and maintain a consistent sleep schedule.</li>
                    <li>Eat a balanced diet and avoid excessive caffeine and sugar.</li>
                </ul>
                <h3>Additional Suggestions:</h3>
                <ul>
                    <li>Identify and manage stressors; consider talking to a counselor or therapist if needed.</li>
                    <li>Set aside time for self-care and relaxation activities.</li>
                    <li>Practice time management to avoid feeling overwhelmed.</li>
                </ul>
            `;
        } else {
            categoryText = 'Overly Stressed';
            suggestions = `
                <h3>General Advice:</h3>
                <p>You may be experiencing high levels of stress. It's crucial to take immediate action to manage it effectively.</p>
                <h3>Lifestyle Tips:</h3>
                <ul>
                    <li>Seek professional help from a mental health professional if you haven't already.</li>
                    <li>Practice stress management techniques regularly, such as mindfulness, meditation, or yoga.</li>
                    <li>Make sure to incorporate physical activity into your routine and consider gentle exercises like walking or stretching.</li>
                    <li>Focus on getting quality sleep and try to improve your sleep environment.</li>
                </ul>
                <h3>Additional Suggestions:</h3>
                <ul>
                    <li>Reevaluate your workload and prioritize tasks to reduce stress.</li>
                    <li>Explore stress-reducing activities like journaling or engaging in creative outlets.</li>
                    <li>Consider support groups or stress management workshops for additional assistance.</li>
                </ul>
            `;
        }

        // Add or update the result panel
        const container = document.querySelector('.container');
        let resultPanel = document.querySelector('.result-panel');

        if (!resultPanel) {
            resultPanel = document.createElement('div');
            resultPanel.classList.add('panel', 'result-panel');
            container.appendChild(resultPanel);
        }

        // Update the result panel content
        resultPanel.innerHTML = `
            <h1>Result</h1>
            <p><strong>Predicted Stress Level:</strong> ${data.predicted_stress_level.toFixed(2)}</p>
            <p><strong>Stress Category:</strong> ${categoryText}</p>
            ${suggestions}
        `;

        // Apply the class to shift panels
        container.classList.add('shifted');
    })
    .catch(error => console.error('Error:', error));
});
