const initialData = {
    tasks:{
        'task-1': {id: 'task-1', content: 'Garbage', assignedTo: 'AU'},
        'task-2': {id: 'task-2', content: 'Cook dinner', assignedTo: 'YT'},
        'task-3': {id: 'task-3', content: 'Watch movie', assignedTo: 'BS'},
        'task-4': {id: 'task-4', content: 'Sleep', assignedTo: 'NA'},
        'task-5': {id: 'task-5', content: 'Groceries', assignedTo: 'HT'},
        'task-6': {id: 'task-6', content: 'Laundary', assignedTo: 'AU'},
        'task-7': {id: 'task-7', content: 'Party', assignedTo: 'YT'},
        'task-8': {id: 'task-8', content: 'Others', assignedTo: 'YT'},
        'task-9': {id: 'task-9', content: 'well', assignedTo: 'AL'},
        'task-10': {id: 'task-10', content: 'this', assignedTo: 'MA'},
        'task-11': {id: 'task-11', content: 'is', assignedTo: 'YT'},
        'task-12': {id: 'task-12', content: 'great', assignedTo: 'AU'},
    }, 
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'All tasks',
            taskIds : ['task-1', 'task-2', 'task-3', 'task-4',]
        },
        'column-2': {
            id: 'column-2',
            title: 'My tasks',
            taskIds : ['task-5', 'task-6', 'task-7', 'task-8'],
        },
        'column-3': {
            id: 'column-3',
            title: 'Archive',
            taskIds : ['task-9', 'task-10', 'task-11', 'task-12'],
        }
    },
    columnOrder: ['column-1', 'column-2', 'column-3']
};

export default initialData;