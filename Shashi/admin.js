// Admin Dashboard logic

// Check if user is logged in as admin
window.onload = function() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser !== 'shashi@gmail.com') {
        window.location.href = 'login.html';  // Redirect to login if not admin
    } else {
        loadFeedbackData();
    }
};

// Function to load feedback data into the table from localStorage
function loadFeedbackData() {
    const tbody = document.querySelector('#feedbackTable tbody');
    tbody.innerHTML = '';  // Clear the table body

    const feedbackData = JSON.parse(localStorage.getItem('feedbackData')) || [];

    feedbackData.forEach(feedback => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${feedback.id}</td>
            <td>${feedback.feedback}</td>
            <td>${feedback.date}</td>
            <td>
                <button onclick="viewFeedback(${feedback.id})">View</button>
                <button onclick="editFeedback(${feedback.id})">Edit</button>
                <button onclick="deleteFeedback(${feedback.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Function to view feedback
function viewFeedback(id) {
    const feedback = getFeedbackById(id);
    alert(`Feedback ID: ${id}\nFeedback: ${feedback.feedback}\nDate: ${feedback.date}`);
}

// Function to edit feedback
function editFeedback(id) {
    const feedback = getFeedbackById(id);
    const newFeedback = prompt("Edit feedback:", feedback.feedback);
    if (newFeedback) {
        feedback.feedback = newFeedback;  // Update the feedback data
        saveFeedbackData(feedback);
        loadFeedbackData();  // Reload the table
    }
}

// Function to delete feedback
function deleteFeedback(id) {
    const feedbackData = JSON.parse(localStorage.getItem('feedbackData')) || [];
    const index = feedbackData.findIndex(f => f.id === id);
    if (index > -1) {
        if (confirm("Are you sure you want to delete this feedback?")) {
            feedbackData.splice(index, 1);  // Remove feedback
            localStorage.setItem('feedbackData', JSON.stringify(feedbackData)); // Update localStorage
            loadFeedbackData();  // Reload the table
        }
    }
}

// Function to get feedback by ID
function getFeedbackById(id) {
    const feedbackData = JSON.parse(localStorage.getItem('feedbackData')) || [];
    return feedbackData.find(f => f.id === id);
}

// Save updated feedback data to localStorage
function saveFeedbackData(updatedFeedback) {
    const feedbackData = JSON.parse(localStorage.getItem('feedbackData')) || [];
    const index = feedbackData.findIndex(f => f.id === updatedFeedback.id);
    if (index > -1) {
        feedbackData[index] = updatedFeedback; // Update feedback data
        localStorage.setItem('feedbackData', JSON.stringify(feedbackData)); // Save to localStorage
    }
}

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';  // Redirect to login page after logout
});
