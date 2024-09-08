import { User } from "./types";

const container = document.querySelector('.container') as HTMLDivElement;
const resumeForm = document.getElementById('resumeForm') as HTMLFormElement;
const resumeSection = document.querySelector('.resume-section') as HTMLEmbedElement;



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
                <p>Email: <span>${user.email}</span></p>
                <p>Phone: <span>${user.phone}</span></p>
                <p>Location: <span>${user.city}, Pakistan</span></p>
            </div>
        </div>

        <div class="skills">
            <h2>Skills</h2>
            <ul>
                <li>Next.js</li>
                <li>MERN Stack</li>
                <li>Python</li>
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
            <h1>${user.name}</h1>
            <p class="subtitle">${user.profession}</p>
        </header>

        <div class="summary">
            <h2>Summary</h2>
            <p>${user.about}</p>
        </div>

        <div class="experience">
            <h2>Experience</h2>

            <div class="job">
                <h3>Machine Learning Specialist</h3>
                <p>Panacloud, Karachi</p>
                <p>Jan 2021 - Present</p>
                <ul>
                    <li>Developing and deploying machine learning models to improve operational efficiency.</li>
                    <li>Collaborating with cross-functional teams to integrate AI solutions into existing systems.</li>
                </ul>
            </div>
        </div>


        <div class="education">
            <h2>Education</h2>
            <div>
                <p>Cloud Applied Gen-AI Engineer</p>
                <p>Governor Sindh IT Initiative, Karachi</p>
                <p>Learning: Feb 2024</p>
            </div>
        </div>
        </section>
        </div>`

    resumeSection.classList.add('hidden');
    container.classList.remove('hidden');
    container.innerHTML = data;
}


resumeForm.addEventListener('submit', onSubmit);
