import { Employee } from './employee';
import { Assignment } from './assignment';
export class Project{

    id?: number;
    client: string;
    maxcapacity: number;
    pname: string;
    status: number;
    assignment: Array<Assignment>;
    
}