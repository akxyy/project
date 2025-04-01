import db from "../config/db.js";

export const createDestination = (req, res) => {
  const { name, country, description, image_url } = req.body;
  const query =
    "INSERT INTO destinations (name, country, description, image_url) VALUES (?, ?, ?, ?)";
  db.query(query, [name, country, description, image_url], (err) => {
    if (err) return res.json({ message: "Error creating destination" });
    res.json({ message: "Destination created successfully" });
  });
};

export const getDestinations = async (req, res) => {
  const query = "SELECT * FROM destinations";
  const promise = new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });

  try {
    const results = await promise;
    res.json({ data: results });
  } catch (err) {
    res.json({ err });
  }
};

export const updateDestination = (req, res) => {
  const { id } = req.params;
  const { name, country, description, image_url } = req.body;
  const query =
    "UPDATE destinations SET name = ?, country = ?, description = ?, image_url = ? WHERE id = ?";
  db.query(query, [name, country, description, image_url, id], (err) => {
    if (err) return res.json({ message: "Error updating destination" });
    res.json({ message: "Destination updated successfully" });
  });
};

export const deleteDestination = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM destinations WHERE id = ?";
  db.query(query, [id], (err) => {
    if (err) return res.json({ message: "Error deleting destination" });
    res.json({ message: "Destination deleted successfully" });
  });
};