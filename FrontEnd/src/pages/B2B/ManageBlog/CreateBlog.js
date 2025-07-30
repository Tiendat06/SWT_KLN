import { CreateBlogLayout } from '~/features/B2B/ManageBlog';
import { ManageBlogProvider } from '~/context/B2B/ManageBlog/ManageBlogContext';
import { Helmet } from 'react-helmet-async';

const CreateBlog = () => {
    return (
        <ManageBlogProvider>
            <Helmet>
                <title>Thêm Blog</title>
            </Helmet>
            <CreateBlogLayout />
        </ManageBlogProvider>
    );
};

export default CreateBlog; 