import {StatusTask} from './type';

export interface TaskItem {
    title: string;
    description: string;
    deadline: number;
    complete: boolean;
    status: StatusTask; // 3 статуса: есть время, мало времени, просроченно
}
