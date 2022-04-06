import {useState, useEffect} from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const[isPending, setIsPanding] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {

        const abortCont = new AbortController();

        setTimeout(() => {

            fetch(url, { signal : abortCont.signal })
                .then(res => {
                    if(!res.ok){
                        throw Error("Couden't ftch the data ");
                    }
                    return res.json();
                    })
                .then(data => {
                        setData(data);
                        setIsPanding(false);
                        setError(false);
                    })
                .catch(err => {
                    if (err.name === "AbortError") {
                        console.log('fetch Aborted');
                    } else{
                        console.log(err.message);
                        setIsPanding(false);
                    }
                    
                })
        },1000)

        return () => abortCont.abort();
    }, [url])
    
    return {data, isPending, error}
} 

export default useFetch;