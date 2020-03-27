
const initialData = {
    tasks: {
        // 'task-1': { id: 'task-1', taskName: 'Garbage', assignedTo: 'AU', details: 'loremlpsum', dueDate: '2020-03-03' },
        // 'task-2': { id: 'task-2', taskName: 'Cook dinner', assignedTo: 'YT', details: 'loremlpsum', dueDate: '2020-03-03' },
        // 'task-3': { id: 'task-3', taskName: 'Watch movie', assignedTo: 'AU', details: 'loremlpsum', dueDate: '2020-03-03' },
        // 'task-4': { id: 'task-4', taskName: 'Sleep', assignedTo: 'YT', details: 'loremlpsum', dueDate: '2020-03-03' },
        // 'task-5': { id: 'task-5', taskName: 'Groceries', assignedTo: 'BK', details: 'loremlpsum', dueDate: '2020-03-03' },
        // 'task-6': { id: 'task-6', taskName: 'Laundary', assignedTo: 'AU', details: 'loremlpsum', dueDate: '2020-03-03' },
        // 'task-7': { id: 'task-7', taskName: 'Party', assignedTo: 'YT', details: 'loremlpsum', dueDate: '2020-03-03' },
        // 'task-8': { id: 'task-8', taskName: 'Others', assignedTo: 'YT', details: 'loremlpsum', dueDate: '2020-03-03' },
        // 'task-9': { id: 'task-9', taskName: 'well', assignedTo: 'AU', details: 'loremlpsum', dueDate: '2020-03-03' },
        // 'task-10': { id: 'task-10', taskName: 'this', assignedTo: 'YT', details: 'loremlpsum', dueDate: '2020-03-03' },
        // 'task-11': { id: 'task-11', taskName: 'is', assignedTo: 'YT', details: 'loremlpsum', dueDate: '2020-03-03' },
        // 'task-12': { id: 'task-12', taskName: 'great', assignedTo: 'AU', details: 'loremlpsum', dueDate: '2020-03-03' },
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'New Tasks',
            taskIds: []
        },
        'column-2': {
            id: 'column-2',
            title: 'In Progress',
            taskIds: [],
        },
        'column-3': {
            id: 'column-3',
            title: 'Completed',
            taskIds: [],
        }
    },
    columnOrder: ['column-1', 'column-2', 'column-3']
};


export { initialData };