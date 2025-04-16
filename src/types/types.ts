export type Advocate = {
    id?: number;
    firstName: string;
    lastName: string;
    city: string;
    degree: string;
    specialties: Specialty[];
    yearsOfExperience: number;
    phoneNumber: string;
}

export type Specialty = {
    advocateId: number;
    specialtyId: number;
    specialty: {
        id: number;
        name: string;
    };
}

export type AdvocatesSearch = {
    searchTerm?: string
}