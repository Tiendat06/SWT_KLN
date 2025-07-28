import { EditBlogLayout } from '~/features/B2B/ManageBlog';
import { ManageBlogProvider } from '~/context/B2B/ManageBlog/ManageBlogContext';
import { Helmet } from 'react-helmet-async';

const EditBlog = () => {
    return (
        <ManageBlogProvider>
            <Helmet>
                <title>Chỉnh sửa Blog</title>
            </Helmet>
            <EditBlogLayout />
        </ManageBlogProvider>
    );
};

export default EditBlog; 