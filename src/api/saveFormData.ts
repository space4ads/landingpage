import {SHEET_DB_URL} from "../constants.ts";

export const saveFormData = async (formData) => {
        await fetch(SHEET_DB_URL, {
            method : "POST",
            body: formData,
        }).then(
            response => response.json()
        )

}
