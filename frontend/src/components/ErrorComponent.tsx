type ErrorComponentProps = {
    error: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
};

const ErrorComponent = ({ error, size }: ErrorComponentProps) => {
    const classes = `text-${size ? `${size}` : "md"} text-red-400`;

    return (
        <p className={classes}>{error}</p>
    )
}

export default ErrorComponent;