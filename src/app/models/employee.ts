import { Project } from './project';
import { Assignment } from './assignment';

export class Employee{

    id: number;
    name: string;
    email: string;
    status: number;
    assignment: Array<Assignment>;
}