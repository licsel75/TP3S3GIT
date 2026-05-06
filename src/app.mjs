import express from 'express';
import { connectDB } from './config/dbConfig.mjs';
import superHeroRoutes from './routes/SuperHeroRoutes.mjs';



import path from 'path';              
import { fileURLToPath } from 'url';  

const app = express();
const PORT = process.env.PORT || 3005; //cambié al puerto 3005 porque nada andaba en el 3000






//  CONFIGURACIÓN DE EJS 
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));




// Middleware para parsear JSON
//sin esto no funciona body post y put
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //  para formularios

// Archivos estáticos (CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, 'public')));




// Conexión a MongoDB
connectDB();

// Configuración de rutas
app.use('/api', superHeroRoutes);



//ruta temporal
app.get('/prueba', (req, res) => {
    res.render('prueba');
});






// Ruta principal del dashboard (redirige al dashboard)
app.get('/', (req, res) => {
    res.redirect('/api/heroes/dashboard');
});






// Manejo de errores para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ mensaje: "Ruta no encontrada" });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});