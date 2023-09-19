const e = require("express");
const myGroup = require("../models/mygroup");
const err = { error: "Not valid" };
const apiInf = { message: "Success" };

const getMyGroup = (req, res) => {
  res.status(200).json(myGroup);
};

const addMember = (req, res) => {
  const { id, name } = req.body;
  if (id && name) {
    if (myGroup.find((item) => item.id === id)) {
      res.status(200).json(err);
    }
    myGroup.push({ id, name });
    apiInf.message = `Member added successfully`;
    res.status(201).json(apiInf);
  } else {
    res.status(400).json(err);
  }
};

const findById = (req, res) => {
  const id = Number(req.params.id);
  const member = myGroup.find((item) => item.id === id);
  if (member && id) {
    res.status(200).json(member);
  } else {
    res.status(404).json(err);
  }
};

const message = (req, res) => {
  const id = Number(req.params.id);
  const member = myGroup.find((item) => item.id === id);
  if (member && id) {
    res.send(`<html><body><ul><li>${member.name}</li></ul></body></html>`);
  } else {
    res.status(404).json(err);
  }
};

const messageAll = (req, res) => {
  res.send(
    `<html><body><ul>${myGroup
      .map((item) => `<li>${item.name}</li>`)
      .join("")}</ul></body></html>`
  );
};
module.exports = { getMyGroup, addMember, findById, message, messageAll };
