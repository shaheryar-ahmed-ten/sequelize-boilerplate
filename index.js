const app = require("./server/app");

const PORT = process.env.PORT || 7000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)) 
