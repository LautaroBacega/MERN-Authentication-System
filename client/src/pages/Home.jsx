import { Shield, Code, Database, Zap } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="px-4 py-16 max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Bienvenido a Autenticación!
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Una solución de autenticación moderna, segura y escalable, desarrollada con el stack MERN.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800">Autenticación Segura</h3>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Autenticación basada en JWT con registro de usuarios, inicio de sesión y cierre de sesión seguros.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Code className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800">Stack Moderno</h3>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Desarrollado con React, Node.js, Express y MongoDB para un rendimiento y escalabilidad óptimos.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Database className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800">Rutas Protegidas</h3>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Control de acceso mediante rutas protegidas que garantizan que sólo usuarios autenticados puedan acceder a áreas sensibles.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Zap className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800">Listo para usar</h3>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Punto de partida perfecto para tu próximo proyecto con todas las funciones de autenticación ya integradas.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Comenzá hoy a desarrollar</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Usá esta aplicación como plantilla para tus propios proyectos y ahorrá horas de desarrollo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://github.com/LautaroBacega/mern-auth-working---MODIFICADO.git" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 inline-block"
            >
              Ver código fuente
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
