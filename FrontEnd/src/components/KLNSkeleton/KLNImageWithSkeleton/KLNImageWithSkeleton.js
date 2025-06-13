const KLNImageWithSkeleton = ({
                                  width = "100%",
                                  height = "auto",
                                  parentClassName = '',
                                  imgClassName = '',
                                  loading,
                                  ...props
                              }) => {

    return (
        <div className={parentClassName} style={{width, height, position: "relative"}}>
            {/* Skeleton placeholder */}
            {!loading && (
                <div
                    style={{
                        backgroundColor: "#f0f0f0",
                        width: "100%",
                        height: "100%",
                        borderRadius: 8,
                    }}
                />
            )}

            {/* Real image */}
            <img
                className={imgClassName}
                {...props}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: loading ? "block" : "none",
                    ...props.style
                }}
            />
        </div>
    );
}

export default KLNImageWithSkeleton;