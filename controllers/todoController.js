const todoModel = require("../models/todoModel");

exports.listItems = async (req, res) => {
  let data = await todoModel.findOne({ id: "todoList" });
  res.json(data);
};
exports.createItem = async (req, res) => {
  const { item } = req.body;
  await todoModel.updateOne(
    { id: "todoList" },
    {
      $push: {
        items: {
          item,
          done: false
        }
      }
    }
  );
  let data = await todoModel.findOne({ id: "todoList" });
  res.json(data);
};

exports.deleteItem = async (req, res) => {
  const { id } = req.body;
  await todoModel.updateOne(
    { id: "todoList" },
    {
      $pull: {
        items: {
          _id: id
        }
      }
    }
  );
  let data = await todoModel.findOne({ id: "todoList" });
  res.json(data);
};

exports.updateItem = async (req, res) => {
  const { id, item } = req.body;
  await todoModel.updateOne(
    {
      "items._id": id
    },
    {
      $set: {
        "items.$.item": item
      }
    }
  );
  let data = await todoModel.findOne({ id: "todoList" });
  res.json(data);
};

exports.updateStatus = async (req, res) => {
  const { id, status } = req.body;
  await todoModel.updateOne(
    {
      "items._id": id
    },
    {
      $set: {
        "items.$.done": status
      }
    }
  );
  let data = await todoModel.findOne({
    items: {
      $elemMatch: {
        _id: id
      }
    }
  });
  res.json(data);
};

exports.dummyCollectionsMaker = async () => {
  todoModel.findOne({ id: "todoList" }).then(async data => {
    if (data == null) {
      const todoList = new todoModel({
        id: "todoList",
        items: [
          {
            item: "do home work",
            done: false
          },
          {
            item: "do prozect",
            done: false
          },
          {
            item: "watch video",
            done: false
          }
        ]
      });
      await todoList.save();
    }
  });
};
