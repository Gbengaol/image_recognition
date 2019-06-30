import React from 'react';

const FaceRecognition = ({url, box}) => {
		return (
			<div className="center ma" style={{position: 'relative', textAlign: 'center'}}>
				<div className="absolute mt-2">
					<img src={url} id="image" alt="" height="100%" width="100%" />
					<div className="bounding-box" style={{top: box.topRow, left: box.leftCol, right: box.rightCol, bottom: box.bottomRow}}></div>
				</div>	
			</div>
		)
	}

export default FaceRecognition;