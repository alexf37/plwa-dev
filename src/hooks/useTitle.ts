import { useEffect, useRef } from "react"

export function useTitle(title: string) {
    const previousTitle = useRef(window.document.title);
    useEffect(()=>{
            window.document.title = title;
            return ()=> {
                window.document.title = previousTitle.current;
            }
    }, [title]);
}