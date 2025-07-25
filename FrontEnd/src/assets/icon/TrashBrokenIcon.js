const TrashBrokenIcon = ({
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
            <g fill="none" stroke="currentColor" strokeWidth={svgStroke}>
                <path strokeLinecap="round" d="M20.5 6h-17m6 5l.5 5m4.5-5l-.5 5"/>
                <path
                    d="M6.5 6h.11a2 2 0 0 0 1.83-1.32l.034-.103l.097-.291c.083-.249.125-.373.18-.479a1.5 1.5 0 0 1 1.094-.788C9.962 3 10.093 3 10.355 3h3.29c.262 0 .393 0 .51.019a1.5 1.5 0 0 1 1.094.788c.055.106.097.23.18.479l.097.291A2 2 0 0 0 17.5 6"/>
                <path strokeLinecap="round"
                      d="M18.374 15.4c-.177 2.654-.266 3.981-1.131 4.79s-2.195.81-4.856.81h-.774c-2.66 0-3.99 0-4.856-.81c-.865-.809-.953-2.136-1.13-4.79l-.46-6.9m13.666 0l-.2 3"/>
            </g>
        </svg>
    )
}

export default TrashBrokenIcon;