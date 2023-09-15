import React, { useState } from "react"
import { Photo } from "./Photo"

export const PhotoManager = () => {
	const [dataUrl, setDataUrl] = useState<string[]>([]);

	const fileToDataUrl = (file: Blob): Promise<string> => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
		
			fileReader.addEventListener('load', (evt: ProgressEvent<FileReader>) => {
				if (evt.currentTarget && "result" in evt.currentTarget) {
					const result = evt.currentTarget.result as string;
					resolve(result);
				}
			});
			
			fileReader.addEventListener('error', (evt: ProgressEvent<FileReader>) => {
				if (evt.currentTarget && "error" in evt.currentTarget) {
					const error = evt.currentTarget.error as string;
					reject(new Error(error));
				}
			});
			
			fileReader.readAsDataURL(file);
		});
	}

	const handleSelect = async (evt: React.ChangeEvent<HTMLInputElement>) => {
		if (evt.target.files?.length) {
			const files = [...evt.target.files];
			const urls: string[] = await Promise.all(files.map(o => fileToDataUrl(o)));
			// У вас в массиве - dataUrl, можете использовать в качестве значения атрибута src тега img
			setDataUrl([...dataUrl, ...urls]);
		}
	}

	const handlePhotoRemove = (url: string) => {
		setDataUrl(prev => prev.filter(item => item !== url))
	}

	return (
		<>
			<form>
				<label className="form-label" htmlFor="formFile">Click to select</label>
				<input className="form-input" type="file" id="formFile"
					name="files" onChange={handleSelect} multiple />
			</form>
			<div className="photo">
				{dataUrl.map(url => <Photo key={crypto.randomUUID()} url={url} remove={handlePhotoRemove} />)}	
			</div>
		</>
	)
}
