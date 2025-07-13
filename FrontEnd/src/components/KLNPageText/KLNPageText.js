const KLNPageText = ({...props}) => {

    return (
        <i
            {...props}
            style={{
                fontSize: '14px',
                ...props.style
            }}
        >
            --N/A--
        </i>
    )
}

export default KLNPageText;