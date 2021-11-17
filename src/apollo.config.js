module.exports = {
    client: {
        includes: ['./**/*.ts'],
        tagName: 'gql',
        service: {
            name: 'prisma-client-js',
            url: 'http://localhost:4000/specialUrl'
        }
    }
};
