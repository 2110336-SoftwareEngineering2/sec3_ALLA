import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import './style.scss'

const ImageUpload = (props) => {
    const AuthState = useSelector((state) => state.Auth);
    const [file, setFile] = useState('')
    const [imagePreviewUrl, setImagePreviewUrl] = useState('')
    const [message, setMessage] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("file", file)
        console.log('file',file)
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', imagePreviewUrl);
        console.log('file FormData',formData)
        await axios
            .post(`http://127.0.0.1:8300/user/upload/profile_pic/` + AuthState.id, formData,{
                headers: {Authorization: "Bearer " + AuthState.token,
                  'Content-Type': 'multipart/form-data'
                }
            })
                /* , {
                headers: {
                    Authorization: "Bearer " + AuthState.token,
                    'Content-Type': 'multipart/form-data'
                }, */
            .then((response) => {
                console.log("response", response);
                setImagePreviewUrl(response.data.url)
                setMessage('Image uploaded')
                alert('Image uploaded')
                return response;
            })
            .catch((error) => {
                console.log(error);
                
                return error;
            });
    }

    const handleImageChange = (e) => {
        e.preventDefault();
        console.log("file detail")
        console.log(e.target)

        let reader = new FileReader();
        let file = e.target.files[0];
        setFile(file)
        reader.onloadend = () => {
            // setFile(file)
            setImagePreviewUrl(reader.result)
        }

        reader.readAsDataURL(file)
    }


    // let { imagePreviewUrl } = this.state;
    // let $imagePreview = null;
    const getPreview = () => {
        console.log('URLLLLLL',imagePreviewUrl)
        if (imagePreviewUrl) {
            return (<div className="imgPreview"><img src={imagePreviewUrl} /><span>{message}</span></div>);
        } else {
            return (<div className="previewText">Please select an Image for Preview</div>);
        }
    }

    return (
        <div className=" previewComponent">
            <form onSubmit={(e) => handleSubmit(e)}>
                <input className="fileInput"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={(e) => handleImageChange(e)} />

                <div className="imgPreview">
                    {getPreview()}
                </div>
                <button className="submitButton"
                    type="submit"
                    onClick={(e) => handleSubmit(e)}>Upload Image</button>
            </form>
        </div>
    )
}

export default ImageUpload