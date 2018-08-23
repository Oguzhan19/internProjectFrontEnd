import { Project } from './project';
import { Employee } from './employee';

export class Assignment{

    id?: number;
    capacity: number;
    duration: number;
    name: string;
    startDate: Date;
    employee: Employee;
    project: Project;

}