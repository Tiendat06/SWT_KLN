const PlayBrokenIcon = ({
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
                <path
                    d="M13.888 9.935C14.963 10.812 15.5 11.25 15.5 12s-.537 1.188-1.612 2.065c-.297.242-.591.47-.862.66c-.237.167-.506.339-.784.508c-1.073.652-1.609.978-2.09.617c-.48-.36-.524-1.116-.612-2.628c-.024-.427-.04-.846-.04-1.222s.016-.795.04-1.222c.088-1.512.132-2.267.612-2.628c.481-.361 1.018-.035 2.09.617c.278.169.547.341.784.508c.27.19.565.418.862.66Z"/>
                <path strokeLinecap="round"
                      d="M7 3.338A9.95 9.95 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-1.821.487-3.53 1.338-5"/>
            </g>
        </svg>
    )
}

export default PlayBrokenIcon;