# 🔐 MERN Authentication System

Un sistema completo de autenticación MERN (MongoDB, Express, React, Node.js) con características avanzadas de seguridad, incluyendo refresh tokens, reset de contraseñas, OAuth con Google, y temporizadores visuales de sesión.

## ✨ Características

### 🔑 Autenticación Completa
- ✅ Registro e inicio de sesión con email/contraseña
- ✅ Autenticación OAuth con Google (Firebase)
- ✅ Sistema de refresh tokens para sesiones seguras
- ✅ Logout con limpieza completa de tokens

### 🔒 Seguridad Avanzada
- ✅ **Access Tokens**: 15 minutos de duración
- ✅ **Refresh Tokens**: 7 días de duración
- ✅ Refresh automático transparente para el usuario
- ✅ Cookies httpOnly para prevenir ataques XSS
- ✅ Hashing de contraseñas con bcryptjs
- ✅ Validación de tokens JWT

### 📧 Reset de Contraseñas
- ✅ Solicitud de reset por email
- ✅ Tokens seguros con expiración (1 hora)
- ✅ Verificación de tokens antes del reset
- ✅ Emails transaccionales con Brevo/Nodemailer
- ✅ Confirmación por email después del reset

### 👤 Gestión de Perfil
- ✅ Actualización de información personal
- ✅ Cambio de contraseña
- ✅ Upload de foto de perfil (Firebase Storage)
- ✅ Eliminación de cuenta

### ⏱️ Monitoreo de Sesión
- ✅ **Temporizador de Access Token**: Cuenta regresiva de 15 minutos
- ✅ **Temporizador de Refresh Token**: Cuenta regresiva de 7 días
- ✅ Notificaciones antes de expiración
- ✅ Refresh manual de tokens
- ✅ Modal de sesión expirada con redirección automática

### 🎨 Interfaz de Usuario
- ✅ Diseño moderno con Tailwind CSS
- ✅ Componentes responsivos
- ✅ Iconos con Lucide React
- ✅ Animaciones y transiciones suaves
- ✅ Feedback visual para todas las acciones

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - JSON Web Tokens
- **bcryptjs** - Hashing de contraseñas
- **Nodemailer** - Envío de emails
- **CORS** - Cross-Origin Resource Sharing
- **Cookie Parser** - Manejo de cookies

### Frontend
- **React 18** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **React Router DOM** - Enrutamiento
- **Tailwind CSS** - Framework de CSS
- **Lucide React** - Iconos
- **Firebase** - OAuth y Storage

### Servicios Externos
- **Brevo (Sendinblue)** - Servicio de email
- **Firebase Auth** - OAuth con Google
- **Firebase Storage** - Almacenamiento de imágenes

## 📦 Instalación

### Prerrequisitos
- Node.js (v16 o superior)
- MongoDB (local o Atlas)
- Cuenta de Firebase
- Cuenta de Brevo para emails

### 1. Clonar el repositorio
\`\`\`bash
git clone https://github.com/tu-usuario/mern-auth-complete.git
cd mern-auth-complete
\`\`\`

### 2. Configurar el Backend
\`\`\`bash
cd api
npm install
\`\`\`

Crear archivo \`.env\` en la carpeta \`api\`:
\`\`\`env
# Base de datos
MONGO=mongodb://localhost:27017/mern-auth
# o para MongoDB Atlas:
# MONGO=mongodb+srv://usuario:password@cluster.mongodb.net/mern-auth

# JWT
JWT_SECRET=tu_jwt_secret_muy_seguro_aqui

# Email (Brevo)
SMTP_USER=tu_email_brevo@smtp-brevo.com
SMTP_PASSWORD=tu_password_brevo
SENDER_EMAIL=tu_email_verificado@dominio.com

# URLs
FRONTEND_URL=http://localhost:5173
NODE_ENV=development

# Puerto
PORT=3000
\`\`\`

### 3. Configurar el Frontend
\`\`\`bash
cd ../client
npm install
\`\`\`

Crear archivo \`.env\` en la carpeta \`client\`:
\`\`\`env
# Firebase
VITE_FIREBASE_API_KEY=tu_firebase_api_key
\`\`\`

### 4. Configurar Firebase

1. Crear proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilitar Authentication → Google
3. Habilitar Storage
4. Obtener la configuración y actualizar \`client/src/firebase.js\`

### 5. Configurar Brevo

1. Crear cuenta en [Brevo](https://www.brevo.com/)
2. Verificar dominio de email
3. Obtener credenciales SMTP
4. Actualizar variables de entorno

## 🚀 Ejecución

### Desarrollo
\`\`\`bash
# Terminal 1 - Backend
cd api
npm run dev

# Terminal 2 - Frontend  
cd client
npm run dev
\`\`\`

### Producción
\`\`\`bash
# Backend
cd api
npm start

# Frontend (build)
cd client
npm run build
npm run preview
\`\`\`

## 📁 Estructura del Proyecto

\`\`\`
mern-auth-complete/
├── api/                          # Backend
│   ├── controllers/              # Controladores
│   │   ├── auth.controller.js    # Autenticación
│   │   └── user.controller.js    # Usuarios
│   ├── models/                   # Modelos de datos
│   │   └── user.model.js         # Modelo de usuario
│   ├── routes/                   # Rutas de API
│   │   ├── auth.route.js         # Rutas de auth
│   │   └── user.route.js         # Rutas de usuario
│   ├── services/                 # Servicios
│   │   └── email.service.js      # Servicio de email
│   ├── utils/                    # Utilidades
│   │   ├── error.js              # Manejo de errores
│   │   ├── tokenUtils.js         # Utilidades de tokens
│   │   └── verifyUser.js         # Middleware de verificación
│   ├── .env                      # Variables de entorno
│   ├── index.js                  # Punto de entrada
│   └── package.json              # Dependencias backend
├── client/                       # Frontend
│   ├── src/
│   │   ├── components/           # Componentes React
│   │   │   ├── Header.jsx        # Navegación
│   │   │   ├── OAuth.jsx         # Google OAuth
│   │   │   ├── PrivateRoute.jsx  # Rutas protegidas
│   │   │   ├── TokenTimers.jsx   # Temporizadores
│   │   │   └── ...
│   │   ├── context/              # Context API
│   │   │   └── UserContext.jsx   # Estado global de usuario
│   │   ├── hooks/                # Hooks personalizados
│   │   │   └── useUser.jsx       # Hook de usuario
│   │   ├── pages/                # Páginas
│   │   │   ├── SignIn.jsx        # Inicio de sesión
│   │   │   ├── SignUp.jsx        # Registro
│   │   │   ├── Profile.jsx       # Perfil
│   │   │   ├── ForgotPassword.jsx # Olvidé contraseña
│   │   │   └── ResetPassword.jsx # Reset contraseña
│   │   ├── utils/                # Utilidades
│   │   │   └── apiInterceptor.js # Interceptor de API
│   │   ├── App.jsx               # Componente principal
│   │   ├── main.jsx              # Punto de entrada
│   │   ├── firebase.js           # Configuración Firebase
│   │   └── index.css             # Estilos globales
│   ├── .env                      # Variables de entorno
│   ├── package.json              # Dependencias frontend
│   └── vite.config.js            # Configuración Vite
└── README.md                     # Este archivo
\`\`\`

## 🔌 API Endpoints

### Autenticación
\`\`\`
POST   /api/auth/signup              # Registro
POST   /api/auth/signin              # Inicio de sesión
POST   /api/auth/google              # OAuth Google
GET    /api/auth/signout             # Cerrar sesión
POST   /api/auth/refresh-token       # Refrescar tokens
POST   /api/auth/request-password-reset  # Solicitar reset
GET    /api/auth/verify-reset-token/:token  # Verificar token
POST   /api/auth/reset-password      # Restablecer contraseña
\`\`\`

### Usuario
\`\`\`
GET    /api/user/                    # Test endpoint
POST   /api/user/update/:id          # Actualizar perfil
DELETE /api/user/delete/:id          # Eliminar cuenta
\`\`\`

## 🔒 Configuración de Seguridad

### Duración de Tokens
- **Access Token**: 15 minutos ⏱️
- **Refresh Token**: 7 días 📅

### ¿Son estos valores estándar?

**SÍ**, estos valores siguen las mejores prácticas de seguridad:

#### Access Tokens (15 minutos)
- ✅ **Estándar de la industria**: 5-30 minutos
- ✅ **Balance perfecto**: Seguridad vs UX
- ✅ **Recomendación OAuth 2.0**: Tokens de corta duración
- ✅ **Usado por**: Google (1 hora), GitHub (8 horas), Auth0 (24 horas)

#### Refresh Tokens (7 días)
- ✅ **Estándar web**: 1-30 días para aplicaciones web
- ✅ **Recomendación OWASP**: Máximo 30 días
- ✅ **Usado por**: Spotify (1 hora), Instagram (60 días), Discord (7 días)

#### Alternativas según el contexto:
- **Aplicaciones bancarias**: Access 5 min, Refresh 1 día
- **Aplicaciones sociales**: Access 1 hora, Refresh 30 días
- **Aplicaciones empresariales**: Access 30 min, Refresh 7 días

### Medidas de Seguridad Implementadas
- 🔒 Cookies httpOnly (previene XSS)
- 🔒 Tokens JWT firmados
- 🔒 Hashing bcrypt (salt rounds: 10)
- 🔒 Validación de entrada
- 🔒 Rate limiting implícito
- 🔒 CORS configurado
- 🔒 Limpieza de tokens en logout

## 🌐 Deployment

### Backend (Render/Railway)
1. Conectar repositorio
2. Configurar variables de entorno
3. Comando de build: \`npm install\`
4. Comando de start: \`npm start\`

### Frontend (Vercel/Netlify)
1. Conectar repositorio
2. Directorio de build: \`client\`
3. Comando de build: \`npm run build\`
4. Directorio de output: \`dist\`

### Variables de Entorno en Producción
Asegúrate de configurar todas las variables de entorno en tu plataforma de deployment.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (\`git checkout -b feature/AmazingFeature\`)
3. Commit tus cambios (\`git commit -m 'Add some AmazingFeature'\`)
4. Push a la rama (\`git push origin feature/AmazingFeature\`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo \`LICENSE\` para más detalles.

## 🙏 Agradecimientos

- [React](https://reactjs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/)
- [Brevo](https://www.brevo.com/)

## 📞 Soporte

Si tienes alguna pregunta o problema, por favor abre un issue en GitHub.

---

⭐ Si este proyecto te fue útil, ¡dale una estrella en GitHub!
\`\`\`
