let body = document.body;

let highlight_btn = document.getElementById("btn-highlight");

highlight_btn.addEventListener("click", () => {
    let rows = document.querySelectorAll(".study-record-table tbody tr");
    //Kiem tra da highlight chua
    const isHighlighted = Array.from(rows).some(row => row.classList.contains("highlighted"));
    //Xoa highlight hien co
    rows.forEach(row => {
        row.classList.remove("highlight-a", "highlight-f", "highlighted");
    });
    if (!isHighlighted) {
        rows.forEach(row => {
            const cells = row.cells;
            if (!cells || cells.length < 6) return; // Kiem tra so o trong hang
            const gradeCell = cells[5];
            const grade = gradeCell.textContent.trim();
            if (grade === "A" || grade === "A+") {
                row.classList.add("highlight-a", "highlighted");
            } else if (grade === "F") {
                row.classList.add("highlight-f", "highlighted");
            }
        })
    }
});

let cal_gpa_btn = document.getElementById("btn-cal-gpa");

cal_gpa_btn.addEventListener("click", () => {
    let rows = document.querySelectorAll(".study-record-table tbody tr");
    let totalCredits = 0;   // Tong so tin chi
    let totalPoints = 0;    // Tinh diem trung binh
    rows.forEach(row => {
        const cells = row.cells;
        if (!cells || cells.length < 6) return;
        const creditCell = cells[3];
        const gradeCell = cells[4];
        const credit = parseFloat(creditCell.textContent) || 0;
        const grade = parseFloat(gradeCell.textContent) || 0;

        totalCredits += credit;
        totalPoints += grade * credit;
    });

    if (totalCredits > 0) {
        const gpa = totalPoints / totalCredits;
        alert("GPA: " + gpa.toFixed(2));
    } else {
        alert("No credits found to calculate GPA.");
    }
});

let filter_btn = document.getElementById("btn-filter");

filter_btn.addEventListener("click", () => {
    let rows = document.querySelectorAll(".study-record-table tbody tr");

    rows.forEach(row => {
        const cells = row.cells;
        if (!cells || cells.length < 6) return; // Kiem tra so o trong hang
        const gradeCell = cells[5];
        const grade = gradeCell.textContent.trim();
        if (grade !== "A" && grade !== "A+") {
            row.style.display = row.style.display === "none" ? "" : "none";
        }
    });
});

let sort_btn = document.getElementById("btn-sort");
let sortOrder = 'desc';

sort_btn.addEventListener("click", () => {
    const tbody = document.querySelector(".study-record-table tbody");
    if (!tbody) return;

    const rowsArray = Array.from(tbody.rows);
    
    const rank = (gradeText) => {
        const g = (gradeText || '').trim().toUpperCase();
        const map = {
            "A+": 10,
            "A": 9,
            "B+": 8,
            "B": 7,
            "C+": 6,
            "C": 5,
            "D+": 4,
            "D": 3,
            "F": 0
        };
        return map[g] !== undefined ? map[g] : -1; // Neu khong tim thay, tra ve -1
    }

    rowsArray.sort((r1, r2) => {
        const g1 = r1.cells && r1.cells[5] ? r1.cells[5].textContent : '';
        const g2 = r2.cells && r2.cells[5] ? r2.cells[5].textContent : '';
        const v1 = rank(g1);
        const v2 = rank(g2);
        return sortOrder === 'desc' ? (v2 - v1) : (v1 - v2);
    });

    rowsArray.forEach(row => tbody.appendChild(row));

    // Dao nguoc thu tu sap xep
    sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
});