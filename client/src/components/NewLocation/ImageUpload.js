import React, {Component} from 'react';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import PropTypes from "prop-types";
import fs from 'fs';
import {selectUserSuccess} from "../../actions/userActions";
import axios from "axios";

const tempFolder = '~/static/temp';

class ImageUpload extends Component {

    constructor(props, context) {
        super(props, context);
        this.onLoadStart = this.onLoadStart.bind(this);
        this.onLoadEnd = this.onLoadEnd.bind(this);

        this.getTempFiles();

        this.state ={
            uploaded:[],
            temp:[]
        }
        //TODO:delete temp images file on create form


    }
    getTempFiles(){
        const url= "http://localhost:9090/gettempfiles";
        axios.get(url, {
            params: {},
        }).then(response => {
            let tempImages = [];
            response.data.map(tmp=>{
                tempImages.push(`http://localhost:9090/temp/${tmp}`);
            });
            this.setState({temp:tempImages});
        }).catch((error) => {
            this.setState({temp:[]});
        });
    }
    onLoadStart(info){
    }

    onLoadEnd(info){
        console.log(this);
        console.log(this.refs.imgUp.state.imagePreviewUrls);
        let urls = Object.assign([], this.state.uploaded, this.refs.imgUp.state.imagePreviewUrls);
        this.setState({uploaded:urls});
        this.props.uploadSuccess(this.state.uploaded);
    }
    render() {

        return (
            <ImagesUploader
                ref="imgUp"
                url="http://localhost:9090/multiple"
                max={2}
                // images={this.state.temp}
                optimisticPreviews
                onLoadEnd={this.onLoadEnd}
                onLoadStart={this.onLoadStart}
                label="Upload multiple images"
            />
        );
    }
}

ImageUpload.propTypes = {
    uploadSuccess: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    currentImages: PropTypes.array.isRequired
};

export default ImageUpload