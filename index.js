import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/result", async (req, res) => {
  try {
    const result = await axios.get(
      `https://restcountries.com/v3.1/name/${req.body.countryname}?fullText=true`
    );
    res.render("index.ejs", {
      data: (result.data[0]),
    });
  } catch (error) {
    console.log(error.response.data);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
