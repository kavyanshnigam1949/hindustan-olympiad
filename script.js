let currentClass = null;

// Initialize Dashboard
const grid = document.getElementById('class-grid');
for (let i = 1; i <= 12; i++) {
    let btn = document.createElement('button');
    btn.innerText = `Class ${i}`;
    btn.onclick = () => {
        currentClass = i;
        if (i >= 11) showScreen('stream-select');
        else startExam('General');
    };
    grid.appendChild(btn);
}

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

async function startExam(stream) {
    showScreen('exam');
    const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            type: "exam", 
            studentClass: currentClass, 
            stream: stream, 
            level: 1 
        })
    });
    const result = await response.json();
    document.getElementById('question-container').innerText = result.data;
}

function askAI() {
    const query = prompt("What is your doubt?");
    // Call the same /api/generate with type: "chat"
}
