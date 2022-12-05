import app from "./app";
import AppDataSource from "./data-source";

(async () => {
    await AppDataSource.initialize().catch((err) => {
        console.error("Error during Data Source initialization", err);
    });
    app.listen(3330, () => {
        console.log("Servidor executando");
    });
})();
