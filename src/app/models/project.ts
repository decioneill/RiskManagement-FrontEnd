import { TeamMember } from "./team";

/* Basic model class for a Project */
export class Project {

    // Unique identifier
    id: number;

    // Name
    name: string;

    // An Array of Team Members
    team: TeamMember[];
}
