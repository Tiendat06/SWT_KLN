import {useEffect, useState} from "react";
import {useHandiworkContext} from "~/context/B2C/Handiwork/HandiworkContext";
import {getBlogByIdService} from "~/services/BlogService";
import clsx from "clsx";

const HandiworkContent = () => {
    const {blogId} = useHandiworkContext();
    const [blog, setBlog] = useState([]);

    useEffect(() => {
        const getBlogById = async () => {
            const data = await getBlogByIdService(blogId);
            setBlog(data?.data);
        }
        getBlogById();
    }, [blogId]);

    return (
        <div className={clsx('col-lg-9 col-md-9 col-sm-9')} dangerouslySetInnerHTML={{ __html: blog?.blogContent }} />
    );
}

export default HandiworkContent;