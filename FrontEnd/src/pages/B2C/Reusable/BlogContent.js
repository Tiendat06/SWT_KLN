import KLNTitle from "~/components/KLNTitle/KLNTitle";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getBlogByIdService} from "~/services/BlogService";
import {Helmet} from "react-helmet-async";
import { capitalCase } from 'change-case';
import {BLOG_TDT_TITLE} from "~/utils/Constansts";

const BlogContent = () => {
    const {blogId} = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const getBlogById = async () => {
            const data = await getBlogByIdService(blogId);
            setBlog(data?.data);
        }
        getBlogById();
    }, [blogId]);

    return (
        <>
            <Helmet>
                <title>{capitalCase(blog?.blogTitle || BLOG_TDT_TITLE)}</title>
            </Helmet>
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