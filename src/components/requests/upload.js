import {
    createFileAddedToQueue as addToQueue,
    createAddInProgress as addInProgress,
    createSubInProgress as subInProgress,
    uploadDone,
    uploadError,
    uploadStarted,
    uploadQueuing,
} from "../../redux/upload";

export const uploadFile = myFile => (dispatch, getState) => {
    const {inProgress} = getState().upload;
    dispatch(addToQueue(myFile));
    dispatch(uploadQueuing(myFile.id));
    if (inProgress < 2) {
        dispatch(addInProgress());
        dispatch(uploadStarted(myFile.id));
        const formData = new FormData();

        formData.append('file', myFile.data);
        fetch('http://localhost:8000/upload', {
            method: 'POST',
            body: formData,
        })
            .then(response =>
            {
                dispatch(subInProgress());
                if (response.ok)
                    dispatch(uploadDone(myFile.id));
                else
                    dispatch(uploadError(myFile.id))
                const { files } = getState().upload;
                const fileToUpload = files.find(file => (file.status === 'queuing'));
                if (fileToUpload)
                    dispatch(uploadFile(fileToUpload));
            });
    }
};

