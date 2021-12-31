import express from "express"

const main =async () => {
  
    const app = express()
    
    // App routes
    app.get("/", (_, res) => {
        res.send("I'm live!")
    });

    app.listen(5000., () => console.log("Server started @ localhost:5000."))

}

main().catch((err) => {
    console.error(err)
})