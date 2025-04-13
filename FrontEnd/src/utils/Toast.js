export const showToast = ({toastRef, severity, summary, detail, life = 3000}) => {
    toastRef.current?.show({
        severity,
        summary,
        detail,
        life,
    });
};

