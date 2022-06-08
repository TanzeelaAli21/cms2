import React from "react";

interface IDimensions {
    width: number,
    height: number
}

const useGetHeight = () => {
    const [dimensions, setDimensions] = React.useState<IDimensions>({
        width: window.innerWidth,
        height: window.innerHeight
    });
    React.useEffect(()=>{
        const handleResize = () => setDimensions({width: window.innerWidth, height: window.innerHeight});
        window.addEventListener('resize', handleResize);
        return ()=> window.removeEventListener('resize', handleResize);
    },[dimensions])

  return dimensions;
}

export default useGetHeight;