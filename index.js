const express = require("express")
const { getCursos, postCanal, editCurso, deleteCurso } = require("./db")
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(express.static(__dirname + "/public"))


// RUTA GET CURSOS PARA LA LECTURA DE LA TABLA 
app.get("/cursos", async (req, res) => { 
    const respuesta = await getCursos()
    return res.json(respuesta)
 })


 // RUTA POST CURSO PARA EL REGISTRO DE NUEVOS CURSOS
 app.post("/curso", async (req, res) => { 
    const {nombre, nivelTecnico, fechaInicio, duracion} = req.body
    const respuesta = await postCanal(nombre, nivelTecnico, fechaInicio, duracion)
    return res.status(201).json(respuesta)
 })

 
 // RUTA PUT CURSO PARA LA ACTUALIZACION DE REGISTROS
 app.put("/curso", async(req, res) => { 
    const {nombre, nivelTecnico, fechaInicio, duracion, id} = req.body
    const respuesta = await editCurso(nombre, nivelTecnico, fechaInicio, duracion, id)
    if(respuesta.length === 0){
        return res.status(404).json({msg: "no se encuentra ese id"})
    }
    return res.json(respuesta) 
   })


// RUTA DELETE CURSOS PARA LA ELIMINACION DE REGISTROS
app.delete("/cursos/:id", async(req, res) => { 
    const {id} = req.params
    const respuesta = await deleteCurso(id)
    if(respuesta.length === 0){
        return res.status(404).json({msg: "no se encuentra ese id"})
    }
    return res.json(respuesta)
 })



app.listen(3000, () => console.log("SERVER ON"))