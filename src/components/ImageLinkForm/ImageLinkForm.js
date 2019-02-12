import React from 'react'
import './ImageLinkForm.css'


const ImageLinkForm = (props) => {
    const { onInputChange , onSubmit }  = props;
    return (
        <div className="ma4 mt0 ">
            <p className="f3 white">
                This magic API will detect faces on your pictures
            </p>
            <div className="center">
                <div className="form center pa4 br3 shadow-5">
                    <input  
                        onChange={event => onInputChange(event)}
                        className="f4 pa2 w-70 center" 
                        type="text"
                    />
                    <button 
                        onClick={event => onSubmit(event)}
                        className="w-30 grow f4 link ph3 pv2 dib black bg-light-purple">Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm