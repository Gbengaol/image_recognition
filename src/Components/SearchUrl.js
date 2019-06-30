import React from 'react';

const SearchUrl = ({onChange, submitImage, value}) => {
		return (
			<div className="mt-4">
				<form>
					<div className="form-group">
						<input 
							className="form-control form-control-lg" 
							type="text" 
							placeholder="Enter Image URL"
							name="url"
							onChange = {onChange}
							value={value}
						/>
					</div>
					<button type="button" onClick={submitImage} className="btn btn-warning">Submit</button>
				</form>
			</div>
		)
	}

export default SearchUrl;