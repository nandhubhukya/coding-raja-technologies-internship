document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#resume-form');
    const preview = document.querySelector('#resume-preview');
    const downloadBtn = document.querySelector('#download-btn');

    // Function to update resume preview
    function updatePreview() {
        const data = new FormData(form);
        const name = data.get('name') || 'Your Name';
        const contact = data.get('contact') || 'Your Contact Info';
        const education = data.get('education') || 'Your Education';
        const experience = data.get('experience') || 'Your Work Experience';
        const skills = data.get('skills') || 'Your Skills';

        let resumeHtml = <h2>${name}</h2>;
        resumeHtml += <p><strong>Contact:</strong> ${contact}</p>;
        resumeHtml += <h3>Education</h3><p>${education}</p>;
        resumeHtml += <h3>Work Experience</h3><p>${experience}</p>;
        resumeHtml += <h3>Skills</h3><p>${skills}</p>;

        preview.innerHTML = resumeHtml;
    }

    // Event listener for form input
    form.addEventListener('input', updatePreview);

    // Function to download resume as PDF
    async function downloadResume() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const resumeHtml = preview.innerText || 'No content available';
        doc.text(resumeHtml, 10, 10);
        doc.save('resume.pdf');
    }

    // Event listener for download button
    downloadBtn.addEventListener('click', downloadResume);

    // Function to select a template
    window.selectTemplate = function(templateId) {
        // You can add logic to change the appearance based on the selected template
        alert(Template ${templateId} selected!);
    };
});