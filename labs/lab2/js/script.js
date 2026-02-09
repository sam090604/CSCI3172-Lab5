// Data: [Name, C1, C2, C3, C4, [[Assigns], [Quizzes], [Exams]]]
// Sample student data
const studentData = [
    ["Rohit", 89, 79, 94, 90, [[90, 85, 95], [88, 92], [85, 90]]],
    ["Virat", 77, 81, 89, null, [[80, 75, 70], [85], [78, 82]]], 
    ["Shreyas", 73, null, 71, 85, [[70, 65], [75, 80], [72, 78]]],  
    ["Rahul", 80, 91, 63, 78, [[85, 80, 88], [90, 85], [80, 82]]],
    ["Hardik", 85, 88, 90, 92, [[90, 92, 94], [88, 90], [95, 92]]],
    ["Dhoni", 70, 75, 80, 85, [[70, 72, 74], [68, 70], [75, 78]]],
    ["Ashwin", 60, 65, 70, 75, [[60, 62, 58], [65, 60], [70, 68]]],
    ["Shami", 95, 92, 88, 91, [[98, 95, 96], [92, 94], [90, 92]]]
];
// Calculate average of available grades
const calculateAverage = (grades) => {
    let sum = 0, count = 0;
    for (let i = 1; i <= 4; i++) {
        if (grades[i] !== null) { sum += grades[i]; count++; }
    }
    return count > 0 ? Math.round(sum / count) : 0;
};
// Determine letter grade
const getLetterGrade = (num) => {
    if (num >= 80) return "A"; 
    if (num >= 70) return "B";
    return "C";
};
// Calculate weighted average for assessments
const calculateWeighted = (scores, weight) => {
    if (!scores.length) return 0;
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    return (avg * weight).toFixed(2);
};
// Detail view functionality
function showDetails(index) {
    const student = studentData[index];
    document.getElementById('grade-book-view').style.display = 'none';
    document.getElementById('detail-view').style.display = 'block';
    document.getElementById('back-btn').style.display = 'inline-block';
    document.getElementById('page-title').innerText = "Student Performance";
    document.getElementById('detail-student-name').innerText = student[0];

    const assessments = student[5];
    const aWeight = calculateWeighted(assessments[0], 0.30);
    const qWeight = calculateWeighted(assessments[1], 0.20);
    const eWeight = calculateWeighted(assessments[2], 0.50);

    document.getElementById('assessment-details').innerHTML = `
        <p>Assignments (30%): ${assessments[0].join(", ")} | Weighted: ${aWeight}</p>
        <p>Quizzes (20%): ${assessments[1].join(", ")} | Weighted: ${qWeight}</p>
        <p>Exams (50%): ${assessments[2].join(", ")} | Weighted: ${eWeight}</p>
        <h3>Final Term Weighted Average: ${(Number(aWeight) + Number(qWeight) + Number(eWeight)).toFixed(2)}</h3>
    `;
}
// Back button functionality
function showMainTable() {
    document.getElementById('grade-book-view').style.display = 'block';
    document.getElementById('detail-view').style.display = 'none';
    document.getElementById('back-btn').style.display = 'none';
    document.getElementById('page-title').innerText = "Class Grade Book";
}

// Populate the main table
const tableBody = document.getElementById('tableBody');
studentData.forEach((student, index) => {
    const avg = calculateAverage(student);
    const letter = getLetterGrade(avg);
    console.log(`Log: ${student[0]} | Avg: ${avg} | Letter: ${letter}`);

    const row = `<tr>
        <td><a href="#" onclick="showDetails(${index})">${student[0]}</a></td>
        <td>${student[1] ?? 'N/A'}</td>
        <td>${student[2] ?? 'N/A'}</td>
        <td>${student[3] ?? 'N/A'}</td>
        <td>${student[4] ?? 'N/A'}</td>
        <td>${avg}</td>
        <td>${letter}</td>
    </tr>`;
    tableBody.innerHTML += row;
});