const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

//connecting database
const connect = () => {
  return mongoose.connect("mongodb://127.0.0.1:27017/relationships");
};

const sectionSchema = new mongoose.Schema(
  {
    section_name: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const Section = mongoose.model("section", sectionSchema);

const authorSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const Author = mongoose.model("author", authorSchema);

const bookSchema = new mongoose.Schema(
  {
    section_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "section",
      required: true,
    },
    book_name: { type: String, required: true },
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "author",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
  //book author ids:
  //   622b9278187b86c64a4b8a27
  //   622b92ae187b86c64a4b8a29
  //   622b921094d9cbe7cace402f

  //sections
  //622b88b3ae67d8de43d111df
  //622b8868ae67d8de43d111dc
  //622b8845ae67d8de43d111d8
  //622b8856ae67d8de43d111da
);
const Book = mongoose.model("book", bookSchema);

app.get("/sections", async (req, res) => {
  try {
    const sections = await Section.find().lean().exec();
    return res.status(200).send({ sections: sections });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});
app.post("/sections", async (req, res) => {
  try {
    const section = await Section.create(req.body);
    return res.status(201).send(section);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});
app.put("/sections/:id", async (req, res) => {
  try {
    const section = await Section.findOneAndReplace(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    return res.status(200).send(section);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

app.delete("/sections/:id", async (req, res) => {
  try {
    const section = await Section.findByIdAndDelete(req.params.id)
      .lean()
      .exec();
    res.status(200).send(section);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
app.get("/authors", async (req, res) => {
  try {
    const authors = await Author.find().lean().exec();
    res.status(200).send(authors);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
app.post("/authors", async (req, res) => {
  try {
    const author = await Author.create(req.body);
    res.status(201).send(author);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find().populate("author_id").lean().exec();
    res.status(200).send(books);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
app.get("/books/:author", async (req, res) => {
  try {
    const books = await Book.find({ author_id: req.params.author })
      .lean()
      .exec();
    res.status(200).send(books);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

app.post("/books", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).send(book);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});
//listening to port
app.listen(5000, async () => {
  try {
    await connect();
    console.log("listening on port 5000");
  } catch (err) {
    console.log(err);
  }
});
