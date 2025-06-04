import { Code2, Server, Database, Shield } from "lucide-react"

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      <div className="px-4 py-16 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-800 to-purple-600 bg-clip-text text-transparent">
            Acerca de este proyecto
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Conocé más sobre el stack tecnológico y la arquitectura detrás de este sistema de autenticación.
          </p>
        </div>

        {/* Tech Stack */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-200">
            <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-4">
              <Database className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">MongoDB</h3>
            <p className="text-sm text-slate-600">NoSQL Database</p>
          </div>

          <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-200">
            <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-4">
              <Server className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">Express</h3>
            <p className="text-sm text-slate-600">Backend Framework</p>
          </div>

          <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-200">
            <div className="p-3 bg-cyan-100 rounded-full w-fit mx-auto mb-4">
              <Code2 className="h-8 w-8 text-cyan-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">React</h3>
            <p className="text-sm text-slate-600">Frontend Library</p>
          </div>

          <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-200">
            <div className="p-3 bg-purple-100 rounded-full w-fit mx-auto mb-4">
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">Node.js</h3>
            <p className="text-sm text-slate-600">Runtime Environment</p>
          </div>
        </div>

        {/* Description Cards */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Autenticación Full-Stack</h2>
            <p className="text-slate-700 leading-relaxed">
              Esta es una aplicación con stack MERN (MongoDB, Express, React, Node.js) con funciones completas de autenticación. Permite a los usuarios registrarse, iniciar sesión y cerrar sesión, además de brindar acceso a rutas protegidas sólo para usuarios autenticados.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Arquitectura Moderna</h2>
            <p className="text-slate-700 leading-relaxed">
              El front-end está construido con React y utiliza React Router para el enrutamiento del lado del cliente. El back-end funciona con Node.js y Express, con MongoDB como base de datos. La autenticación se implementa usando JSON Web Tokens (JWT) para una autenticación segura y sin estado.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
            <h2 className="text-2xl font-semibold mb-4">Punto de partida perfecto</h2>
            <p className="text-blue-100 leading-relaxed">
              Esta aplicación funciona como una base ideal para desarrollar aplicaciones web full-stack con autenticación usando el stack MERN. ¡Sentite libre de usarla como plantilla para tus propios proyectos y personalizarla según tus requerimientos!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
