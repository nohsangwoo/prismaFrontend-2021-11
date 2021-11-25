type registerListType = {
    registerKey: `firstName` | `lastName` | `email` | `userName` | `password`;
    placeholder: string;
    type: string;
    clearErrors: boolean;
}[];

const registerList: registerListType = [
    {
        registerKey: `firstName`,
        placeholder: 'First Name',
        type: 'text',
        clearErrors: true
    },
    {
        registerKey: `lastName`,
        placeholder: 'Last Name',
        type: 'text',
        clearErrors: true
    },
    {
        registerKey: `email`,
        placeholder: 'Email',
        type: 'email',
        clearErrors: true
    },
    {
        registerKey: `userName`,
        placeholder: 'User Name',
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
