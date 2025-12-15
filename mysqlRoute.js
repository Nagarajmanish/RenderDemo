import connection from "./Dec_3_3.js";

export const getUsers = (req, res) => {
  connection.query("select * from users", (err, row) => {
    if (err) {
      throw err;
    } else {
      res.send(row);
    }
  });
};

export const getUserById = (req, res) => {
  const id = req.params.id;
  connection.query("select * from users where id=?", [id], (err, row) => {
    if (err) {
      res.send("No user found with given id", err.message);
    } else {
      if (row.length != 0) {
        res.send(row);
      } else {
        res.send("No such user found");
      }
    }
  });
};

// get data of users according to city
export const getUserByCity = (req, res) => {
  const city = req.params.city;
  connection.query("select * from users where city=?", [city], (err, row) => {
    if (err) {
      throw err;
    } else {
      if (row.length === 0) {
        res.send("No user found from given city: ", city);
      } else {
        res.send(row);
      }
    }
  });
};

export const AddUser = (req, res) => {
  const body = req.body;
  console.log(body);
  connection.beginTransaction((err) => {
    if (err) console.log("Cannot Insert");
  });
  connection.query(
    "insert into users (first_name, last_name, city, phone_number) values(?,?,?,?)",
    Object.values(body),
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
  connection.commit((err) => {
    if (err) {
      console.log(err);
    }
    res.send("User Added Successfully");
  });
};

export const updatePhone = (req, res) => {
  const id = req.params.id;
  const { phone_number } = req.body;

  const query = `UPDATE users SET phone_number = ? WHERE id = ?`;

  connection.query(query, [phone_number, id], (err, results) => {
    if (err) {
      return res.status(500).send("Failed to update phone number");
    }

    if (results.affectedRows === 0) {
      return res.status(404).send("User not found");
    }

    res.json({
      message: `Phone number updated successfully for user ID ${id}`,
    });
  });
};

export const DeleteUser = (req, res) => {
  const id = req.params.id;

  connection.query("DELETE FROM users WHERE id = ?", [id], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error deleting user");
    }
    res.send("User removed");
  });
};
