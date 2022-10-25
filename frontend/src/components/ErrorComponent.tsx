type ErrorComponentProps = {
    error: string;
};

const ErrorComponent = ({ error }: ErrorComponentProps) => {
    return (
        <p className='text-red-400'>{error}</p>
    )
}

export default ErrorComponent;