
import * as React from "react";
import {useQuery} from "@tanstack/react-query";
import {toast} from "react-toastify";

interface ImageLoaderProps {
    url: string
}

const fetchImage = async (url: string): Promise<string> => {

    const response = await fetch(url)
    const blob = await response.blob()
    return URL.createObjectURL(blob)

}

export const ImageLoader: React.FC<ImageLoaderProps> = ({url}) => {
    const {data, isLoading, isError} = useQuery({
        queryKey: ["image", url],
        queryFn: () => fetchImage(url),
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 30,
        retry: 2
    })
    if (isLoading) return <div>Загрузка изображения</div>
    if (isError) {
        toast.error("Ошибка загрузки фото")
        return null
    }
    return <img src={data} alt={"Загруженно"} />
}