import {SHEET_DB_URL} from "../constants.ts";

export const saveFormData = async (formData) => {
    try {
        const response = await fetch(SHEET_DB_URL, {
            method : "POST",
            body: formData,
        }).then((res) => res.json());

        if (response.error) {
            return {
                type: "error",
                message: response.error || "General server error",
            };
        }
        return {
            type: "success",
            message: "Success!",
        };
    } catch (e) {
        if (e instanceof SyntaxError) {
            return {
                type: "error",
                message: "There was a SyntaxError",
            };
        } else {
            return {
                type: "error",
                message: e.message || "General server error",
            };
        }
    }

}
