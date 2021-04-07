import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const FileUploadForm = (props) => {
    const [message, setMessage] = useState("")
    const [files, setFiles] = useState([])
    
    const handleInputChange = (e) => {
        const files = e.target.files;
        if (files.length) {
            setMessage(files.item(0).name)
            setFiles(files)
        }
    }
    const handleSendFiles = () => {
        
        console.log(files[0]);
    }
    return (
        <div className="FileUploadForm">
            <label className="InputFile">
                Portfilio:{' '}
                <input type="file" name="image" onChange={handleInputChange} />
            </label>

            {(message.length > 0)
                ? (
                    <div className="MessageBox">{message}</div>
                ) : <></>}

            {(files.length > 0)
                ? (
                    <div className="ActionBar">
                        <button type='button' onClick={handleSendFiles}>Upload Portfolio</button>
                    </div>
                ) : <></>}
        </div>
    );
}

export default FileUploadForm;