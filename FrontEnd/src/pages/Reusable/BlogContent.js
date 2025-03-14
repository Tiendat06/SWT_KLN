import KLNTitle from "~/components/KLNTitle/KLNTitle";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getBlogByIdService} from "~/services/MemorialService";

const BlogContent = () => {
    const {blogId} = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const getBlogById = async () => {
            const data = await getBlogByIdService(blogId);
            setBlog(data?.data);
        }
        getBlogById();
    }, []);

    return (
        <>
            <div style={{marginTop: 30}}>
                <KLNTitle>
                    {blog?.blogTitle}
                </KLNTitle>
                <div dangerouslySetInnerHTML={{ __html: blog?.blogContent }} />
            </div>
        </>
    );
}

export default BlogContent;