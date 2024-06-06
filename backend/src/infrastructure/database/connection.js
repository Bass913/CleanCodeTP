const connection = async () => {
    try {
        await mongoose.connect(process.env.DB_NOSQL_HOST, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected');
    } catch (err) {
        console.error('Database connection error:', err);
    }
};

module.exports = connection;