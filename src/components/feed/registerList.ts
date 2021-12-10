type registerListProps = {
    registerKey: `payload`;
    placeholder: string;
    type: string;
    clearErrors: boolean;
}[];

const registerList: registerListProps = [
    {
        registerKey: `payload`,
        placeholder: 'Write a comment...',
        type: 'text',
        clearErrors: true
    }
];

export default registerList;
