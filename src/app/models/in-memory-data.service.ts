
import { InMemoryDbService } from 'angular-in-memory-web-api';


export class InMemoryDataService implements InMemoryDbService{
  createDb() {
    const employees = [
      { id: 11, name: 'Mr. Nice', email:'1@gmail.com', status:1},
      { id: 12, name: 'Narco' , email:'ads@gmail.com', status:1},
      { id: 13, name: 'Bombasto' , email:'asf@gmail.com', status:1},
      { id: 14, name: 'Celeritas' , email:'124@gmail.com', status:1},
      { id: 15, name: 'Magneta' , email:'fvs@gmail.com', status:0},
      { id: 16, name: 'RubberMan' , email:'adf@gmail.com', status:0},
      { id: 17, name: 'Dynama' , email:'efrfds@gmail.com', status:1},
      { id: 18, name: 'Dr IQ' , email:'1431@gmail.com', status:0},
      { id: 19, name: 'Magma' , email:'veorin@gmail.com', status:1},
      { id: 20, name: 'Tornado' , email:'wrlvjb@gmail.com', status:0}
    ]
    const projects = [
      { id: 1, client: 'e', maxCapacity:'1', pname:'a',status:1},
      { id: 2, client: 'ice', maxCapacity:'12', pname:'aadv',status:1},
      { id: 3, client: 'Mice', maxCapacity:'13', pname:'dva',status:0},
      { id: 4, client: 'Mr', maxCapacity:'14', pname:'grbd',status:0},
      { id: 5, client: ' Nice', maxCapacity:'15', pname:'npo',status:1},
      { id: 6, client: 'af', maxCapacity:'16', pname:'134',status:1},
    ]
    const assignments = [
      { id: 1, capacity: 13, duration:144, name:'adafs',  start_date:1, employee:11, project:12},
      { id: 2, capacity: 3,  duration:456, name:'aynutyr', start_date:4, employee:1,  project:3},
      { id: 3, capacity: 30, duration:1, name:'tjutnfd',  start_date:3, employee:41, project:4},
      { id: 4, capacity: 5, duration:120, name:'sghgnmt', start_date:2, employee:44, project:5},
    ];
    return {
      employees, projects, assignments
    };
  }
}
