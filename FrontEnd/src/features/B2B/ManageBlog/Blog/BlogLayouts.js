import {KLNBreadCrumb, KLNButton, KLNCascadeSelect, KLNDataTable, KLNColumn, KLNReactPaginate, KLNTableAction} from "~/components";
import {faSquarePlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import React, {useCallback, useEffect, useState} from "react";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";
import {useAdminContext} from "~/context/AdminContext";
import {useManageBlogContext} from "~/context/B2B/ManageBlog/ManageBlogContext";
import {blogService} from "~/services/BlogService";
import KLNButtonEnum from "~/enum/Button/KLNButtonEnum";
import {getBlogsAction, deleteBlogAction, setSelectedBlogsAction} from '~/store/B2B/ManageBlog/actions';
import { showToast } from "~/utils/Toast";
import DeleteBlogModal from "./DeleteBlogModal";
import { useAppContext } from "~/context/AppContext";
import MediaType from '~/enum/MediaType/MediaType';
import { TEST_USER_ID, PRESIDENT_TDT_TITLE, MEMORIAL_TDT_TITLE, HANDIWORK_TDT_TITLE, MANAGE_BLOG_TITLE } from '~/utils/Constansts';
import { Link } from 'react-router-dom';

// Mock data nếu API không hoạt động
const mockBlogs = [
    {
        blogId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        blogTitle: PRESIDENT_TDT_TITLE,
        blogContent: 'Nội dung về Chủ tịch Tôn Đức Thắng...',
        blogImage: 'https://example.com/image1.jpg',
        mediaTypeId: MediaType.PresidentTDT,
        description: 'Mô tả về Chủ tịch Tôn Đức Thắng',
        createDate: '2025-01-23T10:30:00.000Z',
        userId: TEST_USER_ID,
    },
    {
        blogId: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
        blogTitle: MEMORIAL_TDT_TITLE,
        blogContent: 'Nội dung về Khu lưu niệm bác Tôn...',
        blogImage: 'https://example.com/image2.jpg',
        mediaTypeId: MediaType.TDTMemorial,
        description: 'Mô tả về Khu lưu niệm bác Tôn',
        createDate: '2025-01-24T09:15:00.000Z',
        userId: TEST_USER_ID,
    },
    {
        blogId: '3fa85f64-5717-4562-b3fc-2c963f66afa8',
        blogTitle: HANDIWORK_TDT_TITLE,
        blogContent: 'Nội dung về Công trình mang tên bác Tôn...',
        blogImage: 'https://example.com/image3.jpg',
        mediaTypeId: MediaType.TDTHandiwork,
        description: 'Mô tả về Công trình mang tên bác Tôn',
        createDate: '2025-01-25T14:45:00.000Z',
        userId: TEST_USER_ID,
    },
];

function getModuleNameByMediaTypeId(mediaTypeId) {
    switch (mediaTypeId) {
        case MediaType.None: return 'Không phân loại';
        case MediaType.TDTMemorial: return 'Khu lưu niệm bác Tôn';
        case MediaType.PresidentTDT: return 'Chủ tịch Tôn Đức Thắng';
        case MediaType.TDTHandiwork: return 'Công trình mang tên bác Tôn';
        default: return '';
    }
}

const BlogLayouts = () => {
    const {selectedPageOption, setDeleteAction} = useAdminContext();
    const {
        isUpdated,
        selectedBlogs, blogs, dispatch
    } = useManageBlogContext();
    
    const [allBlogs, setAllBlogs] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    // Thêm state quản lý visible cho modal
    const [visible, setVisible] = useState(false);
    const { toast } = useAppContext();

    const showDeleteModal = useCallback(() => {
        setDeleteAction(true);
        setVisible(true);
    }, [setVisible, setDeleteAction]);

    const hideModal = useCallback(() => {
        setVisible(false);
    }, [setVisible]);

    const handleDelete = useCallback(async (blogIds) => {
        try {
            const deleteResult = await blogService.deleteBlogsService(blogIds);
            if (deleteResult) {
                dispatch(deleteBlogAction(blogIds));
                showToast({ toastRef: toast, severity: 'success', summary: 'Xóa blog', detail: 'Xóa blog thành công!' });
            }
        } catch (error) {
            showToast({ toastRef: toast, severity: 'error', summary: 'Xóa blog', detail: 'Có lỗi xảy ra khi xóa blog!' });
        } finally {
            dispatch(setSelectedBlogsAction([]));
            setVisible(false);
        }
    }, [setDeleteAction, setVisible, dispatch, toast]);

    const handleDeleteMany = useCallback(async () => {
        const blogIds = selectedBlogs.map(blog => blog.blogId || blog);
        await handleDelete(blogIds);
    }, [selectedBlogs, handleDelete]);

    // Paginate blogs when data changes
    const paginateBlogs = useCallback((blogsData) => {
        const startIndex = (currentPage - 1) * selectedPageOption.code;
        const endIndex = startIndex + selectedPageOption.code;
        const paginatedData = blogsData.slice(startIndex, endIndex);
        dispatch(getBlogsAction(paginatedData));
    }, [currentPage, selectedPageOption.code, dispatch]);

    // Fetch blogs
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await blogService.getBlogListService(1000, 1);
                if (response?.data) {
                    const blogsData = response.data.items || [];
                    setAllBlogs(blogsData);
                    setPageCount(Math.ceil(blogsData.length / selectedPageOption.code));
                    paginateBlogs(blogsData);
                } else {
                    setAllBlogs(mockBlogs);
                    setPageCount(Math.ceil(mockBlogs.length / selectedPageOption.code));
                    paginateBlogs(mockBlogs);
                }
            } catch (error) {
                setAllBlogs(mockBlogs);
                setPageCount(Math.ceil(mockBlogs.length / selectedPageOption.code));
                paginateBlogs(mockBlogs);
            }
        };
        fetchBlogs();
    }, [selectedPageOption.code, isUpdated, paginateBlogs, dispatch]);

    // Handle pagination when page or pageSize changes
    useEffect(() => {
        paginateBlogs(allBlogs);
    }, [currentPage, selectedPageOption, allBlogs, paginateBlogs]);

    // Cập nhật pageCount khi allBlogs thay đổi
    useEffect(() => {
        const newPageCount = Math.ceil(allBlogs.length / selectedPageOption.code);
        setPageCount(newPageCount);
        if (currentPage > newPageCount && newPageCount > 0) {
            setCurrentPage(newPageCount);
        } else if (allBlogs.length === 0) {
            setCurrentPage(1);
        }
    }, [allBlogs.length, selectedPageOption.code, currentPage]);

    const handlePageClick = useCallback((event) => {
        setCurrentPage(event.selected + 1);
    }, []);

    // Table template functions
    const onDelete = (blog) => {
        dispatch(setSelectedBlogsAction([blog]));
        showDeleteModal();
    };

    const indexTemplate = (rowData, {rowIndex}) => {
        return <span>{((currentPage - 1) * selectedPageOption.code) + rowIndex + 1}</span>;
    };

    const nameBodyTemplate = (rowData) => {
        return (
            <span style={{ fontWeight: '500' }}>{rowData.blogTitle}</span>
        );
    };

    const moduleBodyTemplate = (rowData) => {
        return <span>{getModuleNameByMediaTypeId(rowData.mediaTypeId)}</span>;
    };

    const dateBodyTemplate = (rowData) => {
        return rowData.createDate ? new Date(rowData.createDate).toLocaleDateString() : '';
    };

    const actionBodyTemplate = (rowData) => (
        <KLNTableAction
            editActionLink={`${AppRoutesEnum.AdminRoute}/manage-blog/${rowData.blogId}/edit`}
            onClickDelete={() => onDelete(rowData)}
        />
    );

    // Breadcrumb items
    const items = [
        { template: () => <Link to={`${AppRoutesEnum.AdminRoute}/manage-blog`}>Blog</Link> },
        { template: () => <span>Danh sách blog</span> }
    ];

    return (
        <div className="container py-4">
            <h2 style={{ fontWeight: 'bold', fontSize: '24px' }}>{MANAGE_BLOG_TITLE}</h2>
            <KLNBreadCrumb items={items} />
            <div className="d-flex flex-wrap justify-content-between align-items-center">
                <div></div>
                <div className="">
                    <KLNButton
                        style={{
                            marginRight: 20,
                            fontWeight: "normal",
                            opacity: selectedBlogs.length > 0 ? 1 : 0.6,
                            cursor: selectedBlogs.length > 0 ? 'pointer' : 'not-allowed'
                        }}
                        options={KLNButtonEnum.secondDangerBtn}
                        icon={faTrash}
                        iconStyle={{
                            marginLeft: 10,
                            fontWeight: "normal"
                        }}
                        onClick={selectedBlogs.length > 0 ? showDeleteModal : undefined}
                        disabled={selectedBlogs.length === 0}
                    >Xóa {selectedBlogs.length > 0 && `(${selectedBlogs.length})`}</KLNButton>
                    <KLNButton
                        options={KLNButtonEnum.dangerBtn}
                        icon={faSquarePlus}
                        iconStyle={{
                            marginLeft: 10,
                            fontWeight: "normal"
                        }}
                        style={{
                            fontWeight: "normal",
                            boxShadow: '0 4px 8px rgba(173, 30, 50, 0.3)',
                            transition: 'all 0.3s ease'
                        }}
                        urlLink={`${AppRoutesEnum.AdminRoute}/manage-blog/create`}
                    >Thêm mới</KLNButton>
                </div>
            </div>
            <div style={{
                paddingLeft: 32
            }} className="">
                <div className={clsx('mt-4 mb-4 d-flex align-items-center')}>
                    <p style={{
                        marginRight: 15,
                        marginBottom: 0
                    }}>Số lượng hiển thị</p>
                    <KLNCascadeSelect/>
                </div>
                {/* Table */}
                <div className="">
                    <div style={{
                        borderRadius: 10
                    }} className="card overflow-hidden mb-5">
                        <KLNDataTable
                            value={blogs}
                            tableStyle={{minWidth: '60rem'}}
                            selectionMode="multiple"
                            selection={selectedBlogs}
                            onSelectionChange={(e) => dispatch(setSelectedBlogsAction(e.value))}
                            dataKey="blogId"
                        >
                            <KLNColumn selectionMode="multiple" headerStyle={{width: '3rem'}}></KLNColumn>
                            <KLNColumn body={indexTemplate} header="#" headerStyle={{width: '3rem'}}></KLNColumn>
                            <KLNColumn 
                                field="blogTitle" 
                                header="Tiêu đề blog"
                                body={nameBodyTemplate}
                            />
                            <KLNColumn 
                                field="moduleName" 
                                header="Module"
                                body={moduleBodyTemplate}
                                style={{ minWidth: 200 }}
                            />
                            <KLNColumn 
                                field="createDate" 
                                header="Ngày tạo"
                                body={dateBodyTemplate}
                                headerStyle={{width: '12rem'}}
                            />
                            <KLNColumn 
                                headerStyle={{width: 150}} bodyStyle={{
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    alignItems: 'center'
                                }} 
                                header="Thao tác" 
                                body={actionBodyTemplate}
                            />
                        </KLNDataTable>
                    </div>
                    <KLNReactPaginate
                        pageCount={pageCount}
                        handlePageClick={handlePageClick}
                    />
                </div>
            </div>
            <DeleteBlogModal 
                visible={visible}
                setVisible={setVisible}
                btnSaveOnClick={handleDeleteMany}
                btnCancelOnClick={hideModal}
                onDelete={handleDelete}
            />
        </div>
    );
}

export default BlogLayouts; 