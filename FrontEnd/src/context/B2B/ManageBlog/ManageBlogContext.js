import React, { createContext, useContext, useReducer } from 'react';
import manageBlogReducer from '~/store/B2B/ManageBlog/reducer';

const ManageBlogContext = createContext();

export const ManageBlogProvider = ({ children }) => {
    const [state, dispatch] = useReducer(manageBlogReducer, {
        blogs: [],
        blogDetail: null,
        selectedBlogs: [],
    });

    return (
        <ManageBlogContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ManageBlogContext.Provider>
    );
};

export const useManageBlogContext = () => {
    const context = useContext(ManageBlogContext);
    if (!context) throw new Error('useManageBlogContext must be used within a ManageBlogProvider');
    return context;
}; 