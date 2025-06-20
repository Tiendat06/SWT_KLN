import UseFetchAPI from "~/hooks/UseFetchAPI";

const authRoute = 'api/Auth';

const loginService = async (email, password) => {
    return await UseFetchAPI({
        api: `${authRoute}/Login`,
        method: "POST",
        body: {email, password}
    });
};

export const authService = {
    loginService,
}