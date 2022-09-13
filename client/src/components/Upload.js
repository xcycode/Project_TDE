import React from 'react'

const Upload = () => {
	const onChange = (e) => {
		const files = e.target.files;
		console.log(files)
		const file = files[0];
		getBase64(file);
	};
	// const onLoad = (fileString) => {
	// 	console.log(fileString);
	// };
	const getBase64 = (file) => {
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			console.log(reader.result)
		};
	};
	return (
		<div className="App">
			<h2>Input file and Show it by Base64 in console.log</h2>
			<form>
				<input type="file" accept="image/*" onChange={onChange} />
			</form>
		</div>
	)
}

export default Upload
