import { useEffect } from "react"

// Dynamic title 
const useTitle = title => {
    useEffect(() => {
        document.title = `${title}-Find Home BD`;
    }, [title])
}

export default useTitle;