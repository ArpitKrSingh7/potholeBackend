import app from "./app.js";
import config from "./config/config.js";
app.listen(config.port, () => {
    console.log(`Server is Running on Port ${process.env.PORT}`);
});
//# sourceMappingURL=server.js.map