import { useRouter } from "next/navigation";
import { useState } from "react";

export const usePageNavigation = (page) => {
    const router = useRouter();
    const [totalPage, setTotalPage] = useState();
    const [numberPage, setNumberPage] = useState(page ? page : 1);

    const handleNextPage = async () => {
        const newPage = numberPage ? numberPage : 1;

        if (parseInt(newPage) <= totalPage.length - 1) {
        
            const nextPage = parseInt(newPage) + 1;
            await setNumberPage(nextPage);
            router.push(`/pokedex/${nextPage}`);    
        }
    };

    const handleBackPage = async () => {

        if (parseInt(numberPage) > 1) {
            const previousPage = parseInt(numberPage) - 1;
            setNumberPage(previousPage);
            router.push(`/pokedex/${previousPage}`);
        }
    
    };

    const handleSelectPage = async (newPage) => {
        if (newPage >= 1 && newPage <= totalPage.length) {
            router.push(`/pokedex/${newPage}`);
        }
    };

    return {
        handleBackPage,
        handleNextPage,
        handleSelectPage,
        setTotalPage,
        totalPage,
        numberPage
    }
};
