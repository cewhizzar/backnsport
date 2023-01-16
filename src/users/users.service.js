const db = require("../models/index");
require("dotenv").config();

async function dbSearch(body) {
  let user = await db.users.findOne({
    where: {
      mail: body.mail,
    },
    atributtes: ["mail"],
  });
  if (user) {
    return {
      message: body.mail + " ya se encuentra asociado a una cuenta",
      status: 400,
    };
  } else {
    let nickname = await db.users.findOne({
      where: {
        nickname: body.nickname,
      },
      atributtes: ["nickname"],
    });
    if (nickname) {
      return {
        message: "@" + body.nickname + " ya existe",
        status: 400,
      };
    }
  }
}

async function register(body) {
  try {
    let exist = await dbSearch(body);
    if (exist) {
      return exist;
    }
    const users = new db.users({
      name: body.name,
      lastName: body.lastName,
      nickname: body.nickname,
      mail: body.mail,
      password: body.password,
      country: body.country,
      sex: body.sex,
      age: body.age,
    });

    await users.save();

    return {
      message: "Información registrada exitosamente",
      status: 201,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Algo salió mal",
      status: 500,
    };
  }
}

async function get() {
  try {
    let users = await db.users.findAll();

    if (Object.keys(users).length === 0)
      return {
        data: "No hay registros",
        status: 204,
      };

    return {
      data: users,
      status: 200,
    };
  } catch (error) {
    return {
      message: "Algo salió mal",
      status: 500,
    };
  }
}

async function _delete(id) {
  try {
    let users = await db.users.findOne({ where: { id: id } });

    if (!users || Object.keys(users).length === 0)
      return {
        data: "El usuario no existe",
        status: 404,
      };

    await users.destroy();

    return {
      data: "Datos eliminados exitosamente",
      status: 200,
    };
  } catch (error) {
    console.log("error: ", error);
    return {
      message: "Algo salió mal",
      status: 500,
    };
  }
}

async function update(body) {
  try {
    if (!body.id)
      return {
        data: "Cuerpo no válido",
        status: 400,
      };

    let users = await db.users.findOne({ where: { id: body.id } });

    if (!users || Object.keys(users).length === 0)
      return {
        data: "El usuario no existe",
        status: 404,
      };

    Object.assign(users, body);
    await users.save();

    return {
      data: "Datos actualizados exitosamente",
      status: 200,
    };
  } catch (error) {
    console.log("error: ", error);
    return {
      message: "Algo salió mal",
      status: 500,
    };
  }
}

module.exports = {
  register,
  get,
  _delete,
  update,
};
