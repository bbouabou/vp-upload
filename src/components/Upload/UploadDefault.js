import uuid from "uuid/v1";
import Dropzone from 'react-dropzone'
import React, {Component} from 'react';

class UploadDefaultComponent extends Component {

    onDrop = (files) => {
        this.props.uploadFiles(files.map(file => ({
                name: file.name,
                id: uuid(),
                data: file
            })),
            files,
        )
    };

    render() {
        return (
            <Dropzone
                onDrop={this.onDrop}
                style={{height: 40}}
            >
                Drop files here...
            </Dropzone>
        )
    }
}

export const UploadDefault = UploadDefaultComponent;