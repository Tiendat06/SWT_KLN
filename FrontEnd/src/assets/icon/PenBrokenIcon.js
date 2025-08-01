const PenBrokenIcon = ({
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
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={svgStroke}>
                <path
                    d="M2 12c0 4.714 0 7.071 1.464 8.535C4.93 22 7.286 22 12 22s7.071 0 8.535-1.465C22 19.072 22 16.714 22 12v-1.5M13.5 2H12C7.286 2 4.929 2 3.464 3.464c-.973.974-1.3 2.343-1.409 4.536"/>
                <path
                    d="m16.652 3.455l.649-.649A2.753 2.753 0 0 1 21.194 6.7l-.65.649m-3.892-3.893s.081 1.379 1.298 2.595c1.216 1.217 2.595 1.298 2.595 1.298m-3.893-3.893L10.687 9.42c-.404.404-.606.606-.78.829q-.308.395-.524.848c-.121.255-.211.526-.392 1.068L8.412 13.9m12.133-6.552l-2.983 2.982m-2.982 2.983c-.404.404-.606.606-.829.78a4.6 4.6 0 0 1-.848.524c-.255.121-.526.211-1.068.392l-1.735.579m0 0l-1.123.374a.742.742 0 0 1-.939-.94l.374-1.122m1.688 1.688L8.412 13.9"/>
            </g>
        </svg>
    )
}

export default PenBrokenIcon;