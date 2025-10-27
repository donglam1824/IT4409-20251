function getStudentInfo(studentId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Tìm thông tin sinh viên ', studentId);
        }, 1000)
    })
}

function getCourseInfo(courseId) {
    return new Promise((resolve) => {
        setTimeout(() => {

        }, 1000)
    })
}

function getStudentGrades(studentId) {
    
}

const form = document.querySelector('form');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const studentId = document.getElementById('student_id').value;
    alert('Searching for student ID: ' + studentId);
})

