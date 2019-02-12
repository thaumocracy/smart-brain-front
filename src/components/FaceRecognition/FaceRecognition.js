import React from 'react'
import './faceRecognition.css'

const FaceRecognition = (props) => {
    const { imageUrl , box} = props

    return (
        <div className="center ma form-background">
            <div className="absolute mt2">
                <img id="input-image" src={imageUrl} alt="" width="500px" height="auto"/>
                <div className="bounding-box" style={{
                    top:box.topRow,
                    right:box.rightCol,
                    bottom:box.bottomRow,
                    left:box.leftCol 
                }}></div>
            </div>
        </div>
    )
}

export default FaceRecognition;