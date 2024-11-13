import { useState, useMemo, useCallback } from 'react';

import { saveFormData } from '../../api/saveFormData';

import Toast from "../Toast/Toast";

import styles from './index.module.css';

const DEFAULT_FORM_DATA = {
	Name: '',
	Email: '',
	Phone: '',
	Message: '',
}
const INITIAL_TOAST_DATA = {
	type: '',
	message: ''
}
const pattern =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-z]{2,}))$/;

const Form = () => {
const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
const [toastData, setToastData] = useState(INITIAL_TOAST_DATA);

const onFormChange = (field, value) => {
	setFormData(prev => ({...prev, [field]: value}));
}
const submit = async (e) => {
	    e.preventDefault();
		const data = new FormData();
		Object.keys(formData).forEach(key => {
			data.append(key, formData[key]);
		})
		const result = await saveFormData(data);
		if (result.type === "error") {
			setToastData({ type: "error", message: result.message });
		}
		if (result.type === "success") {
			setToastData({ type: "success", message: "Success" });
		}

}

const resetToastData = useCallback(() => {
		setToastData(INITIAL_TOAST_DATA);
		}, []);

const isDisabled = useMemo(() => {
	if(!formData.Name || !formData.Email) {
		return true
	}
	if(formData.Name && formData.Email) {
		return !pattern.test(formData.Email);
	}
	return false
}, [formData]);

	return (
		<div className={styles.card}>
			<Toast callback={resetToastData} type={toastData.type} message={toastData.message} />
			<form className={styles['my-form']}>
				<div className={styles.container}>
					<ul>
						<li>
							<div className={styles.grid}>
								<input
									onChange={(e) => onFormChange('Name', e.target.value)}
									type="text" name="Name" placeholder="Name" required/>
							</div>
						</li>
						<li>
							<div className={styles.grid}>
								<input
									onChange={(e) => onFormChange('Email', e.target.value)}
									type="email" name="Email" placeholder="Email" required/>
							</div>
						</li>
						<li>
							<div  className={`${styles.grid} ${styles['grid-2']}`}>
								<input
									onChange={(e) => onFormChange('Phone', e.target.value)}
									type="tel" name="Phone" placeholder="Phone"/>
							</div>
						</li>
						<li>
							<div className={styles.grid}>
								<textarea
									onChange={(e) => onFormChange('Message', e.target.value)}
									name="Message" placeholder="Message"/>
							</div>
						</li>
						<li>
							<div className={`${styles.grid} ${styles['grid-3']}`}>
								<button onClick={submit} disabled={isDisabled}>
									<span className={styles["btn-conversion"]}>Submit</span>
								</button>
							</div>
						</li>
					</ul>
				</div>
			</form>
		</div>
)
}

export default Form;
