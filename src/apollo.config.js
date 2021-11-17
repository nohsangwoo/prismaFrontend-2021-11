module.exports = {
    client: {
        includes: ['./src/**/*.ts'],
        tagName: 'gql',
        service: {
            name: 'prisma-backend',
            url: 'http://localhost:4000/graphql'
        }
    }
};
