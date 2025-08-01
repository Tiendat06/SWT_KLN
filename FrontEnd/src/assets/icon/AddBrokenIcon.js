const AddBrokenIcon = ({
                           width = 25,
                           height = 25,
                           fontWeight = 'normal',
                           ...props
                       }) => {
    const svgStroke = {
        'normal': 1.5,
        'bold': 2,
        'bolder': 2.5,
    }[fontWeight] ?? 1.5;
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width={width} height={height}
             viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={svgStroke}
                  d="M15 12h-3m0 0H9m3 0V9m0 3v3m10-3c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464c.974.974 1.3 2.343 1.41 4.536"/>
        </svg>
    )
}

export default AddBrokenIcon;