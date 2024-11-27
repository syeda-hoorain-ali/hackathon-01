export interface IUser {
    profilePic: File | undefined;
    name: string;
    phone: string;
    email: string;
    city: string;
    country: string;
    profession: string;
    about: string;
    education: string;
    skills: ISkills[];
    githubUrl: string;
    linkedinUrl: string;
    websiteUrl: string;
    job1: IExperience;
    job2: IExperience;
}

export interface ISkills {
    name: string;
    rating: number;
}

export interface IExperience {
    title: string;
    company: string;
    city: string;
    start: string;
    end: string;
    details: string;
}
