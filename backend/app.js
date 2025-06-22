const express = require("express");
const cors = require("cors");
const { finalWinningResult } = require("./battle");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post("/battle-plan", (req, res) => {
  const { myPlatoons, enemyPlatoons } = req.body;

  if (!myPlatoons || !enemyPlatoons) {
    return res.status(400).json({ error: "Missing input data" });
  }

  const result = finalWinningResult(myPlatoons, enemyPlatoons);

  if (result === "There is no chance of winning") {
    return res.status(200).json({ message: result });
  }

  res.status(200).json({ winningResult: result });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


