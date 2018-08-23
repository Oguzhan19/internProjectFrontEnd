import { Project } from './project';
import { Assignment } from './assignment';

export class Employee{

    empID?: number;
    name: string;
    email: string;
    status: number;
    password: string;
    empType: number;
    assignment: Array<Assignment>;
}