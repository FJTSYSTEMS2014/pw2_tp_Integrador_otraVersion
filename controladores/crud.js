const conexion = require ('../database/db');
// aca preguntamos o verificamos si exist el
// usuario y contraseña.

// para guardar el metodo es salvar lo podemos ver en crear.ejs
exports.salvar = (req, res) => {
  console.log ('entro a salvar usuario');
  // capturamos los campos del usuario.
  // para invocar a estos valores los tenemos que configurar en rutas.js.
  const user = req.body.user;

  const sql = 'INSERT INTO usuarios SET ?';
  const info = {
    dni_usuario: user[0],
    nombre_apellido: user[1],
    fecha_nacimiento: user[2],
    domicilio: user[3],
    localidad: user[4],
    telefono: user[5],
    username: user[6],
    pass: user[7],
  };
  conexion.query (sql, info, err => {
    if (err) {
      console.log (err);
    } else {
      console.log (' usuario agregado');
      res.redirect ('/usuarios/listar');
    }
  });
  console.log (info);
};

// para guardar el metodo es salvar lo podemos ver en crear_tarea.ejs
exports.salvar_tarea = (req, res) => {
  console.log ('entro a salvar_tarea');
  // capturamos los campos de la tarea.
  // para invocar a estos valores los tenemos que configurar en rutas.js.
  const user = req.body.user;
  const id = req.body.getID;
  //const dni_usuario= 'DNI33.333.333'
  /*
 <%= dni_usuario  %>  */
  const today = new Date ();
  const today1 = today.toISOString ();
  const created = today1.substring (0, 10);

  const sql = 'INSERT INTO tareas SET ?';
  const info = {
    dni_usuario: user[0],
    titulo: user[1],
    descripcion: user[2],
    estado: user[3],
    created,
  };
  conexion.query (sql, info, err => {
    if (err) {
      console.log (err);
    } else {
      console.log (' tarea agregada');
      res.redirect ('/usuarios/tareas');
    }
  });
  console.log (user);
};

// para guardar el metodo es salvar lo podemos ver en index.ejs

exports.verify = (req, res) => {
  // capturamos los campos del usuario.
  // para invocar a estos valores los tenemos que configurar en rutas.js.
  const user = req.body.user;
  console.log (user + ' ');
  const username = user[0];
  const pass = user[1];

  if (username && pass) {
    console.log ('entro a verify');
    conexion.query (
      'SELECT * FROM usuarios WHERE username = ?',
      [username],
      (error, results, fields) => {
        console.log (results);
        console.log (results[0].pass);
        if (results.length == 0 || pass != results[0].pass) {
          console.log ('usuario invalido');
          res.render ('404');
        } else {
          console.log ('usuario correcto');
          res.redirect ('/usuarios/listar');
        }
        console.log ('esta por aca ');
      }
    );
  } else {
    console.log ('usuario invalido');
    res.render ('404');
  }
};

// actualizar ver edit.ejs y rutas
exports.update = (req, res) => {
  // capturo el dni old
  const dni_usuario_old = req.body.id;
  // en user vendria con el dni nuevo
  const usuario = req.body.user;
  const dni_usuario = usuario[0];
  const nombre_apellido_ = usuario[1];
  const fecha_nacimiento0 = usuario[2];
  const today = new Date (fecha_nacimiento0);
  //console.log (today.toISOString ()); // info que mando EDU por chat 2021-06-07T03:00:00.000Z
  const fecha_nacimiento3 = today.toISOString ();
  const fecha_nacimiento = fecha_nacimiento3.substring (0, 10);
  const domicilio = usuario[3];
  const localidad = usuario[4];
  const telefono = usuario[5];
  const username = usuario[6];
  const pass = usuario[7];
  // fuunciona ok

  /*     'UPDATE `usuarios` SET nombre_apellido= ? ,fecha_nacimiento=?, domicilio= ? WHERE `dni_usuario` = ? ',
    [nombre_apellido_,fecha_nacimiento,domicilio, dni_usuario], */
  conexion.query (
    'UPDATE `usuarios` SET dni_usuario =?, nombre_apellido= ? ,fecha_nacimiento=?, domicilio= ? , localidad= ?, telefono= ?, username= ?, pass= ? WHERE `dni_usuario` = ? ',
    [
      dni_usuario,
      nombre_apellido_,
      fecha_nacimiento,
      domicilio,
      localidad,
      telefono,username,pass,
      dni_usuario_old,
    ],
    (error, results) => {
      if (error) {
        console.log (error);
      } else {
        res.redirect ('/usuarios/listar');
      }
    }
  );

  // ir al enrutador para decirle que actualice con /update
};

// actualizar ver edit.ejs y rutas
exports.update_tareas = (req, res) => {
  // capturo el id de la tareas
  // const id = req.body.id;
  // en usuario vienen los datos
  const usuario = req.body.user;
  const id = usuario[0];
  const titulo = usuario[1];
  const descripcion = usuario[2];
  const estado = usuario[3];
  const today = new Date ();
  const today1 = today.toISOString ();
  const updated = today1.substring (0, 10);

  //console.log(`${id}, ${titulo},${descripcion},${estado},${updated}`)

  conexion.query (
    'UPDATE `tareas` SET titulo =?, descripcion= ? ,estado=?,updated=? WHERE `id` = ? ',
    [titulo, descripcion, estado, updated, id],
    (error, results) => {
      if (error) {
        console.log (error);
      } else {
        res.redirect ('/usuarios/tareas');
      }
    }
  );
};

