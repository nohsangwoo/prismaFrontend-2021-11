type registerListProps = {
    registerKey: `username` | `password`;
    placeholder: string;
    type: string;
    clearErrors: boolean;
}[];

const registerList: registerListProps = [
    {
        registerKey: `username`,
        placeholder: 'Username',
        type: 'text',
        clearErrors: true
    },
    {
        registerKey: `password`,
        placeholder: 'Password',
        type: 'password',
        clearErrors: true
    }
];

export default registerList;
