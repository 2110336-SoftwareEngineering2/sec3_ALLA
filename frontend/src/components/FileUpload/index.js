import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const FileUploadForm = (props) => {
    const AuthState = useSelector((state) => state.Auth);
    const [message, setMessage] = useState("")
    const [files, setFiles] = useState([])
    
    const handleInputChange = (e) => {
        const files = e.target.files;
        if (files.length) {
            setMessage(files.item(0).name)
            setFiles(files)
        }
    }
    const handleSendFiles = async (e) => {
        console.log(files[0]);
        e.preventDefault();
        let formData = new FormData();
        formData.append("file", files[0])
        console.log('file',files)
        await axios
            .post(`http://127.0.0.1:8300/student/upload/resume/` + props.sid, formData,{
                headers: {Authorization: "Bearer " + AuthState.token,
                  'Content-Type': 'multipart/form-data'
                }
            })
        .then((response) => {
            console.log("response", response);
            // setImagePreviewUrl(response.data.url)
            // setMessage('Image uploaded')
            setMessage('Portfolio uploaded!')
            return response;
            })
            .catch((error) => {
                console.log(error);
                setMessage('error')
                return error;
            });
    }
    return (
        <div className="FileUploadForm">
            <label className="InputFile">
                Portfolio:{' '}
                <input type="file" accept = "application/pdf" onChange={handleInputChange} />
            </label>

            {(message.length > 0)
                ? (
                    <div className="MessageBox">{message}</div>
                ) : <></>}

            {(files.length > 0)
                ? (
                    <div className="ActionBar">
                        <button onClick={handleSendFiles}>Upload Portfolio</button>
                    </div>
                ) : <></>}
        </div>
    );
}

export default FileUploadForm;