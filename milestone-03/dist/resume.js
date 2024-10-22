const container = document.querySelector('.container');
const resumeForm = document.getElementById('resumeForm');
const profilePic = document.getElementById('profilePic');
const getUserData = () => {
    // Helper function to get the value of an input field and trim it
    const $ = (id) => document.getElementById(id)?.value.trim() ?? '';
    const user = {
        profilePic: profilePic.files?.[0] || undefined,
        name: $('name'),
        phone: $('phone'),
        email: $('email'),
        city: $('city'),
        country: $('country'),
        profession: $('profession'),
        about: $('about'),
        education: $('education'),
        skills: $('skills').split(','),
        githubUrl: $('githubUrl'),
        linkedinUrl: $('linkedinUrl'),
        websiteUrl: $('websiteUrl'),
        job1: {
            title: $('job1-title'),
            company: $('job1-company'),
            city: $('job1-location'),
            start: $('job1-start'),
            end: $('job1-end'),
            details: $('job1-details'),
        },
        job2: {
            title: $('job2-title'),
            company: $('job2-company'),
            city: $('job2-location'),
            start: $('job2-start'),
            end: $('job2-end'),
            details: $('job2-details'),
        },
    };
    return user;
};
const loadUserData = (user) => {
    const image = URL.createObjectURL(user.profilePic);
    const skills = user.skills.map(skill => {
        skill = skill.trim();
        console.log(skill);
        return `<li>${skill}</li>`;
    }).join('');
    const data = `
    <div class="content">
        <section class="left-column">

        <div class="logo">
            <img src="${image}" alt="${user.name}">
        </div>

        <div class="contact">
            <h2>Contact</h2>
            <div>
                <p>Email: <span>${user.email}</span></p>
                <p>Phone: <span>${user.phone}</span></p>
                <p>Location: <span>${user.city}, ${user.country}</span></p>
            </div>
        </div>

        <div class="skills">
            <h2>Skills</h2>
            <ul>
                ${skills}
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
                <h3>${user.job1.title}</h3>
                <p>${user.job1.company}, ${user.job1.city}</p>
                <p>${user.job1.start} to ${user.job1.end}</p>
                <p>${user.job1.details}</p>
            </div>

            <div class="job">
                <h3>${user.job2.title}</h3>
                <p>${user.job2.company}, ${user.job2.city}</p>
                <p>${user.job2.start} to ${user.job2.end}</p>
                <p>${user.job2.details}</p>
            </div>
        </div>


        <div class="education">
            <h2>Education</h2>
            <div>
                <p>${user.education}</p>
            </div>
        </div>
        </section>
        </div>`;
    container.classList.remove('hidden');
    container.innerHTML = data;
};
const onPictureUpload = () => {
    const picture = document.querySelector('.picture');
    if (!profilePic.files)
        return;
    const userImage = profilePic.files[0];
    picture.src = URL.createObjectURL(userImage);
    picture.classList.remove('hidden');
};
const onSubmit = (e) => {
    e.preventDefault();
    const user = getUserData();
    loadUserData(user);
};
resumeForm.addEventListener('submit', onSubmit);
profilePic.addEventListener('change', onPictureUpload);
export {};
