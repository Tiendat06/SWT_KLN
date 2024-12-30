import UseFetchAPI from "~/hooks/UseFetchAPI";

export const getTestData = (count) => {

    const {data, error, loading} = UseFetchAPI('api/User/v1', {
        dependency: [count]
    });
    return data;
}