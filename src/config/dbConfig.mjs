import mongoose from 'mongoose';

import dns from 'dns/promises'; // agregué esto basándome en el práctico anterior para conectarme
dns.setServers(["8.8.8.8", "1.1.1.1"]);// agregué esto basándome en el práctico anterior para conectarme

export async function connectDB() { 
  try { 
      await mongoose.connect('mongodb+srv://grupo-15:grupo-15@cluster0.blryo.mongodb.net/NodeMod3Cohorte5');
        console.log('Conexión exitosa a MongoDB');
  } catch (error) { 
    console.error('Error al conectar a MongoDB:', error); 
    process.exit(1); 
  } 
}
