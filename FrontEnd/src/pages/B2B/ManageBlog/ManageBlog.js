import { BlogLayouts } from '~/features/B2B/ManageBlog';
import { ManageBlogProvider } from '~/context/B2B/ManageBlog/ManageBlogContext';
import { Helmet } from 'react-helmet-async';

const ManageBlog = () => (
    <ManageBlogProvider>
        <Helmet>
            <title>Quản lý blog</title>
        </Helmet>
        <BlogLayouts />
    </ManageBlogProvider>
);

export default ManageBlog; 