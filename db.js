const {Pool} = require("pg")

// CONEXION A LA BASE DE DATOS
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "*********",
    database: "cursos",
    port: 5432
})


// (GET) LECTURA DE LOS CURSOS REGISTRADOS
module.exports.getCursos= async () => {
    const client = await pool.connect()
    try {
        const respuesta = await client.query("SELECT * FROM cursos;")
        return respuesta.rows
    } catch (error) {
        console.log(error)
        return error
    } finally {
        client.release()
    }
}

// (POST) INSERCION DE NUEVOS CURSOS
module.exports.postCanal = async (nombre, nivel, fecha, duracion) => {
    const client = await pool.connect()

    const query = {
        text: "INSERT INTO cursos (nombre, nivel, fecha, duracion) values ($1, $2, $3, $4) RETURNING *",
        values: [nombre, nivel, fecha, duracion]
    }

    try {
        const respuesta = await client.query(query)
        return respuesta.rows
    } catch (error) {
        console.log(error)
        return error
    } finally {
        client.release()
    }
}


// (PUT) ACTUALIZACION DE LOS REGISTROS DE LOS CURSOS
module.exports.editCurso = async (nombre, nivelTecnico, fechaInicio, duracion, id) => {
    const client = await pool.connect()

    const query = {
        text: "UPDATE cursos SET nombre = $1, nivel = $2, fecha = $3, duracion = $4 WHERE id = $5 RETURNING *",
        values: [nombre, nivelTecnico, fechaInicio, duracion, id]
    }

    try {
        const respuesta = await client.query(query)
        return respuesta.rows
    } catch (error) {
        console.log(error)
        return error
    } finally {
        client.release()
    }
}


// (DELETE) ELIMINACION DE LOS REGISTROS DE LOS CURSOS
module.exports.deleteCurso = async (id) => {
    const client = await pool.connect()

    const query = {
        text: "DELETE FROM cursos WHERE id = $1 RETURNING *",
        values: [id]
    }

    try {
        const respuesta = await client.query(query)
        return respuesta.rows
    } catch (error) {
        console.log(error)
        return error
    } finally {
        client.release()
    }
}