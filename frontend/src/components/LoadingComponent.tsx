import { Spinner } from "flowbite-react";


const LoadingComponent = () => {
    return (
        <p className="text-4xl">
            <Spinner size="lg"/>
            <span className="align-middle pl-3 text-gray-400">Loading...</span>
        </p>
    )
}

export default LoadingComponent;
