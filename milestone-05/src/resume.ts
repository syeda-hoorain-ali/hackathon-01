import { storeResume } from "./firebase.js";
import { User } from "./types";

const container = document.querySelector('.container') as HTMLDivElement;
const resumeForm = document.getElementById('resumeForm') as HTMLFormElement;
const resumeSection = document.querySelector('.resume-section') as HTMLElement;
const downloadBtn = document.getElementById('download') as HTMLButtonElement;
const shareBtn = document.getElementById('share') as HTMLButtonElement;



const generateUniqueID = (): string => {
    return '_' + Math.random().toString(36).substr(2, 9);
}

const storeUserData = (userData: User) => {
    const uniqueID = generateUniqueID();
    localStorage.setItem(uniqueID, JSON.stringify(userData));
    return uniqueID;
}

const onSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    // Helper function to get the value of an input field and trim it
    const getInputValue = (id: string): string =>
        (document.getElementById(id) as HTMLInputElement)?.value.trim() ?? '';

    const user: User = {
        username: getInputValue('username'),
        email: getInputValue('email'),
        name: getInputValue('name'),
        profilePic: getInputValue('profilePic'),
        about: getInputValue('about'),
        city: getInputValue('city'),
        phone: getInputValue('phone'),
        profession: getInputValue('profession'),
        githubUrl: getInputValue('githubUrl'),
        linkedinUrl: getInputValue('linkedinUrl'),
        websiteUrl: getInputValue('websiteUrl'),
    };

    // Array of required fields with their respective names for error messages
    const requiredFields = [
        { field: user.username, name: 'username' },
        { field: user.email, name: 'email' },
        { field: user.name, name: 'name' },
        { field: user.profilePic, name: 'profile picture URL' },
        { field: user.about, name: 'about your self' },
        { field: user.phone, name: 'phone no' },
        { field: user.city, name: 'city' },
        { field: user.profession, name: 'profession' },
        { field: user.githubUrl, name: 'GitHub URL' },
        { field: user.linkedinUrl, name: 'LinkedIn URL' },
        { field: user.websiteUrl, name: 'website URL' }
    ];

    // Validate all required fields
    for (const { field, name } of requiredFields) {
        if (!field) {
            alert(`Please enter your ${name}`);
            return;
        }
    }

    const uniqueID = storeUserData(user);
    loadUserData(uniqueID)
}

const loadUserData = (uniqueID: string) => {

    const jsonData = localStorage.getItem(uniqueID);
    if (!jsonData) return

    const user: User = JSON.parse(jsonData);

    const data = `
    <div class="content">
        <section class="left-column">

        <div class="logo">
            <img src="${user.profilePic}" alt="${user.name}">
        </div>

        <div class="contact">
            <h2>Contact</h2>
            <div>
                <p>Email: <span contenteditable="true">${user.email}</span></p>
                <p>Phone: <span contenteditable="true">${user.phone}</span></p>
                <p>Location: <span contenteditable="true">${user.city}, Pakistan</span></p>
            </div>
        </div>

        <div class="skills">
            <h2>Skills</h2>
            <ul>
                <li contenteditable="true">Next.js</li>
                <li contenteditable="true">MERN Stack</li>
                <li contenteditable="true">Python</li>
            </ul>
        </div>

        <div class="socials">
          <h2>Social</h2>
          <ul>
            <li><a href="${user.linkedinUrl}"><i class="fa-brands fa-linkedin"></i>LinkedIn</a></li>
            <li><a href="${user.githubUrl}"><i class="fa-brands fa-github"></i>GitHub</a></li>
            <li><a href="${user.websiteUrl}"><i class="fa-solid fa-globe"></i>Website</a></li>
          </ul>
        </div>
        </section>

        <section class="right-column">

        <header class="header">
            <h1 contenteditable="true">${user.name}</h1>
            <p class="subtitle" contenteditable="true">${user.profession}</p>
        </header>

        <div class="summary">
            <h2>Summary</h2>
            <p contenteditable="true">${user.about}</p>
        </div>

        <div class="experience">
            <h2>Experience</h2>

            <div class="job">
                <h3 contenteditable="true">Machine Learning Specialist</h3>
                <p contenteditable="true">Panacloud, Karachi</p>
                <p contenteditable="true">Jan 2021 - Present</p>
                <ul>
                    <li contenteditable="true">Developing and deploying machine learning models to improve operational efficiency.</li>
                    <li contenteditable="true">Collaborating with cross-functional teams to integrate AI solutions into existing systems.</li>
                </ul>
            </div>
        </div>


        <div class="education">
            <h2>Education</h2>
            <div>
                <p contenteditable="true">Cloud Applied Gen-AI Engineer</p>
                <p contenteditable="true">Governor Sindh IT Initiative, Karachi</p>
                <p contenteditable="true">Learning: Feb 2024</p>
            </div>
        </div>
        </section>
    </div>`

    resumeSection.classList.add('hidden');
    container.classList.remove('hidden');
    downloadBtn.classList.remove('hidden');
    container.innerHTML = data;
}

const getUrl = async () => {
    try {
        const uniqueID = await storeResume(container.innerHTML);
        const shareableUrl = `${window.location.origin}/resume?id=${uniqueID}`;

        navigator.clipboard.writeText(shareableUrl).then(() => {
            alert('URL copied to clipboard!');
        });

        window.location.href = `/resume?id=${uniqueID}`;
    } catch (error) {
        console.error("Error storing user data:", error);
        alert("Failed to save your resume. Please try again.");
    }
}


resumeForm.addEventListener('submit', onSubmit);
downloadBtn.addEventListener('click', () => window.print());
shareBtn.addEventListener('click', getUrl)
