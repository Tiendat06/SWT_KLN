import UseFetchAPI from "~/hooks/UseFetchAPI";

export const loginService = async (email, password) => {
    return await UseFetchAPI({
        api: "api/Auth/Login",
        method: "POST",
        body: { email, password }
    });
};
