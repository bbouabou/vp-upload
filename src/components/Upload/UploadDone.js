import React from 'react';
import {connect} from "react-redux";
import {createSelectByStatus, createSelectByString, filteredFile, searchFilterSelector} from "../../redux/upload";


const UploadDoneComponent = ({files, selectByStatus, selectByString, searchFilter, uploadFile, uploadFiles}) => {

    const shouldRenderButton = files.find(file => file.status === "error");
    const listUpload = files.map(file =>
        (
            <div key={file.id}>
                {file.name} -- {file.status} {file.status === 'error' ? <button onClick={() => uploadFile(file)}>Retry</button>:''}
            </div>
        )
    );
    const uploadFailed = files.filter(file => (file.status === 'error' ));

    return (
        <div>
            <input type="text" value={searchFilter} onChange={(event) => selectByString(event.target.value)}/>
            <button onClick={() => {selectByStatus()}}>Reset Filter</button>
            <button onClick={() => selectByStatus("uploading")}>Uploading</button>
            <button onClick={() => selectByStatus("error")}>Error</button>
            <button onClick={() => selectByStatus("done")}>Done</button>
            { shouldRenderButton && <button onClick={() => uploadFiles(uploadFailed)}>RetryAll</button> }
            { listUpload }
        </div>
    )
};


const ConnectedUploadDone = connect(
    state => ({
        files: filteredFile(state),
        searchFilter: searchFilterSelector(state),
    }),
    {
        selectByStatus: createSelectByStatus,
        selectByString: createSelectByString,
    }
)(UploadDoneComponent);

export const UploadDone = ConnectedUploadDone;
