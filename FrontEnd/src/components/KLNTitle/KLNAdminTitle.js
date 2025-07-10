const KLNAdminTitle = ({
                           children,
                           ...props
                       }) => {
    return (
        <>
            <h2
                {...props}
                style={{
                    marginLeft: 15,
                    fontWeight: "bold",
                    ...props.style,
                }}>
                {children}
            </h2>
        </>
    )
}

export default KLNAdminTitle;