import { Person } from 'app/model/person.model';

export interface IAppState {
  userName: string;
  error: boolean;
  people: Array<Person>;
}

export const INITIAL_STATE: IAppState = {
  userName: 'Paul',
  error: false,
  people: []
}
