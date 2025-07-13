const KLNRenderIf = ({
                         renderIf = null,
                         children,
                     }) => {

    return (
        <>
            {(renderIf) && children}
        </>
    )
}

export default KLNRenderIf;