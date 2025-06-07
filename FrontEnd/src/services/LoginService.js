import UseFetchAPI from "~/hooks/UseFetchAPI";

const authRoute = 'api/Auth';
export const loginService = async (email, password) => {
    return await UseFetchAPI({
        api: `${authRoute}/Login`,
        method: "POST",
        body: { email, password }
    });
};
