module.exports = {
    client: {
        includes: ['./src/**/*.{tsx,ts,js}'],
        tagName: 'gql',
        service: {
            name: 'prisma-backend',
            url: 'http://localhost:4000/graphql'
        }
    }
};
