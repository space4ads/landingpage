import { useEffect, useMemo, useState } from "react";

import styles from "./index.module.css";

const Toast= ({ type, message, callback }) => {
    const [show, setShow] = useState(false);

    const source = useMemo(() => {
        if (type === "error") {
            return {
                src: "/error-circle.svg",
                style: styles["toast-border-error"],
            };
        }
        if (type === "success") {
            return {
                src: "/check-circle.svg",
                style: styles["toast-border-success"],
            };
        }
        return {
            src: "",
            style: "",
        };
    }, [type]);

    useEffect(() => {
        if (type) {
            setShow(true);
            setTimeout(() => {
                setShow(false);
                callback()
            }, 3000);
        }
    }, [type, callback]);

    return (
        <>
            {show && (
                <div className={styles.toast + " " + source.style + " " + styles.active}>
                    <div className={styles["toast-content"]}>
                        <img src={source.src} alt="icon" />
                        <div className={styles.message}>
                            <span className={styles["text-1"]}>{type === "success" ? "Success" : "Error"}</span>
                            <span className={styles["text-2"]}>{message}</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Toast;
