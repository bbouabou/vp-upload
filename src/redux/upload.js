import {createSelector} from 'reselect'


const initialState = {
    files: [],
    filter: null,
    searchFilter: "",
    inProgress: 0,
    maxUpload: 2
};

export const FILE_ADDED_TO_QUEUE = 'FILE_ADDED_TO_QUEUE';

export const STATUS_DONE = 'STATUS_DONE';
export const STATUS_QUEUING = 'STATUS_QUEUING';
export const STATUS_ERROR = 'STATUS_ERROR';
export const STATUS_STARTED = 'STATUS_STARTED';

export const SELECT_BY_STATUS = 'SELECT_BY_STATUS';
export const SELECT_BY_STRING = 'SELECT_BY_STRING';
export const ADD_IN_PROGRESS = 'ADD_IN_PROGRESS';
export const SUB_IN_PROGRESS = 'SUB_IN_PROGRESS';

export const filesSelector = state => state.upload.files;
export const filterSelector = state => state.upload.filter;
export const searchFilterSelector = state => state.upload.searchFilter;

export const filteredFile = createSelector(
    filesSelector,
    filterSelector,
    searchFilterSelector,
    (files, filter, searchFilter) => files.filter(file => (file.status === filter || !filter)
        && (file.name.search(searchFilter) !== -1 || !searchFilter))
);

export const createFileAddedToQueue = (file) => ({
    type: FILE_ADDED_TO_QUEUE,
    payload: {
        file,
    }
});

export const createAddInProgress = () => ({
    type: ADD_IN_PROGRESS,
});


export const createSubInProgress = () => ({
    type: SUB_IN_PROGRESS,
});

export const createSelectByStatus = (filter) => ({
    type: SELECT_BY_STATUS,
    payload: {
        filter,
    }
});
export const createSelectByString = (searchFilter) => ({
    type: SELECT_BY_STRING,
    payload: {
        searchFilter,
    }
});


const changeStatus = status => (state, action) =>
    ({
        ...state,
        files: state.files.map(elem => elem.id === action.payload.id ? {...elem, status: status} : elem),
    })

const createStatusAction = action => (id) =>
    (
        {
            type: action,
            payload: {
                id
            }
        }
    );

export const uploadDone = createStatusAction(STATUS_DONE);
export const uploadError = createStatusAction(STATUS_ERROR);
export const uploadStarted = createStatusAction(STATUS_STARTED);
export const uploadQueuing = createStatusAction(STATUS_QUEUING);


function addFileToQueue(state, action) {
    console.log(state);
    console.log(action.payload);
    let {files} = state;
    const find = files.find((file) => (
        file.id === action.payload.file.id
    ));
    if (find === undefined)
        files = [...state.files, action.payload.file];
    return {...state, files: files}
}

const actionHandlers = {
    FILE_ADDED_TO_QUEUE     : addFileToQueue,

    STATUS_DONE             : changeStatus("done"),
    STATUS_ERROR            : changeStatus("error"),
    STATUS_STARTED          : changeStatus("uploading"),
    STATUS_QUEUING          : changeStatus("queuing"),

    SELECT_BY_STATUS        : (state, action) => ({...state, filter: action.payload.filter}),
    SELECT_BY_STRING        : (state, action) => ({...state, searchFilter: action.payload.searchFilter}),

    ADD_IN_PROGRESS  : (state) => ({...state, inProgress: state.inProgress + 1}),
    SUB_IN_PROGRESS  : (state) => ({...state, inProgress: state.inProgress - 1})

}

function reducer(state = initialState, action) {
    const handler = actionHandlers[action.type]
    return handler ? handler(state, action) : state
}

export const upload = reducer;
