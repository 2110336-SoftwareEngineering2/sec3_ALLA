import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const ImageUpload = (props) => {
    const AuthState = useSelector((state) => state.Auth);
    const [file, setFile] = useState('')
    const [imagePreviewUrl, setImagePreviewUrl] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("file", file[0]);
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', file[0]);
        await axios
            .post(`http://127.0.0.1:8300/user/upload/profile_pic/` + AuthState.id, {
                "file":imagePreviewUrl
            })
                /* , {
                headers: {
                    Authorization: "Bearer " + AuthState.token,
                    'Content-Type': 'multipart/form-data'
                }, */
            .then((response) => {
                console.log("response", response);
                setImagePreviewUrl(response.data)
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

        reader.onloadend = () => {
            setFile(file)
            setImagePreviewUrl(reader.result)
        }

        reader.readAsDataURL(file)
    }


    // let { imagePreviewUrl } = this.state;
    // let $imagePreview = null;
    const getPreview = () => {

        if (imagePreviewUrl) {
            return (<img src={imagePreviewUrl} />);
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