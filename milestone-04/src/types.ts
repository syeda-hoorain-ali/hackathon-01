export interface User {
    profilePic: File | undefined;
    name: string;
    phone: string;
    email: string;
    city: string;
    country: string;
    profession: string;
    about: string;
    education: string;
    skills: string[];
    githubUrl: string;
    linkedinUrl: string;
    websiteUrl: string;
    job1: Experience;
    job2: Experience;
}

interface Experience {
    title: string;
    company: string;
    city: string;
    start: string;
    end: string;
    details: string;
}
