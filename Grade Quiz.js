function gradeQuiz() {
    let score = 0;
    let resultsHTML = "<h2>Results</h2>";

    // Answer key
    const answers = {
        q1: "Wireless Fidelity",
        q2: "B",
        q3: "B",
        q4: "A",
        q5: ["A", "B"]
    };

    // Q1 - fill in
    let q1 = document.getElementById("q1").value.trim();
    if (q1.toLowerCase() === answers.q1.toLowerCase()) {
        score++;
        resultsHTML += formatResult(1, true, answers.q1);
    } else {
        resultsHTML += formatResult(1, false, answers.q1);
    }

    // Q2-4 Multiple choice
    for (let i = 2; i <= 4; i++) {
        let selected = document.querySelector(`input[name=q${i}]:checked`);
        if (selected && selected.value === answers[`q${i}`]) {
            score++;
            resultsHTML += formatResult(i, true, answers[`q${i}`]);
        } else {
            resultsHTML += formatResult(i, false, answers[`q${i}`]);
        }
    }

    // Q5 Multi-select
    let selected = [...document.querySelectorAll("input[name=q5]:checked")].map(c => c.value);
    if (arraysMatch(selected, answers.q5)) {
        score++;
        resultsHTML += formatResult(5, true, answers.q5.join(", "));
    } else {
        resultsHTML += formatResult(5, false, answers.q5.join(", "));
    }

    // Final overall score
    resultsHTML =
        `<h2>Total Score: ${score}/5</h2>` +
        `<h3>${score >= 3 ? "✅ Pass" : "❌ Fail"}</h3>` +
        resultsHTML;

    document.getElementById("results").innerHTML = resultsHTML;
}

function arraysMatch(arr1, arr2) {
    return arr1.length === arr2.length &&
           arr1.every(v => arr2.includes(v));
}

function resetQuiz() {
    document.getElementById("quizForm").reset();
    document.getElementById("results").innerHTML = "";
}

// Helper for formatting
function formatResult(num, correct, answer) {
    return `<p style="color:${correct ? 'green' : 'red'}">
            Question ${num}: ${correct ? 'Correct' : 'Incorrect'}  
            (Correct Answer: ${answer})
        </p>`;
}
