import React, { Component } from 'react';
import {UploadDefault} from "./UploadDefault";
import {UploadDone} from "./UploadDone";
import {connect} from "react-redux";
import { uploadFile } from "../requests/upload";

class UploadComponent extends Component {

    uploadFiles = (files) => {
        files.forEach((fileToUpload) => {
            this.props.uploadFile(fileToUpload);
        })
    };

    render() {
        return (
            <div>
                <UploadDefault uploadFiles={this.uploadFiles} uploadFile={this.props.uploadFile}/>
                <UploadDone uploadFiles={this.uploadFiles} uploadFile={this.props.uploadFile}/>
            </div>
        )
    }
}


const ConnectedUpload = connect(
    state => ({
        inProgress: state.upload.inProgress,
    }),
    {
        uploadFile : file => uploadFile(file)
    }
)(UploadComponent);

export const Upload = ConnectedUpload;
