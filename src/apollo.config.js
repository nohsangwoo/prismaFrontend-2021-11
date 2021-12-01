module.exports = {
    client: {
        includes: ['./src/**/*.{tsx,ts}'],
        tagName: 'gql',
        service: {
            name: 'prisma-client-js',
            url: 'http://localhost:4000/graphql'
        }
    }
};
