const initialData = {
    tasks:{
        'task-1': {id: 'task-1', content: 'Garbage'},
        'task-2': {id: 'task-2', content: 'Cook dinner'},
        'task-3': {id: 'task-3', content: 'Watch movie'},
        'task-4': {id: 'task-4', content: 'Sleep'},
        'task-5': {id: 'task-5', content: 'Groceries'},
        'task-6': {id: 'task-6', content: 'Laundary'},
        'task-7': {id: 'task-7', content: 'Party'},
        'task-8': {id: 'task-8', content: 'Others'},
        'task-9': {id: 'task-9', content: 'well'},
        'task-10': {id: 'task-10', content: 'this'},
        'task-11': {id: 'task-11', content: 'is'},
        'task-12': {id: 'task-12', content: 'great'},
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