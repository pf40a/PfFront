const people = [
    {
      name: 'Jose Nicolas Villagra',
      role: 'Front-End Developer',
      email: 'villagrajosenicolas@gmail.com',
      imageUrl:
        '/developer1.JPG',
      linkedin:"https://www.linkedin.com/in/jose-nicolas-villagra-83332a242/",
      GitHub:"https://github.com/NicolasVillagra"
    },
    {
      name: 'TU NOMBRE AQUI',
      role: 'Front-End Developer',
      email: 'TU EMAIL AQUI',
      imageUrl:
        '/logo.jpg',
      linkedin:"TU LINKEDIN AQUI",
      GitHub:"TU GIT HUB AQUI"
    },
    {
      name: 'TU NOMBRE AQUI',
      role: 'Front-End Developer',
      email: 'TU EMAIL AQUI',
      imageUrl:
        '/logo.jpg',
      linkedin:"TU LINKEDIN AQUI",
      GitHub:"TU GIT HUB AQUI"
    },
    {
      name: 'TU NOMBRE AQUI',
      role: 'Front-End Developer',
      email: 'TU EMAIL AQUI',
      imageUrl:
        '/logo.jpg',
      linkedin:"TU LINKEDIN AQUI",
      GitHub:"TU GIT HUB AQUI"
    },
    {
      name: 'Juan Bautista María Beck',
      role: 'Back-End Developer',
      email: 'juanbautistabeck@gmail.com',
      imageUrl:
        '/FotodeperfilLinkedin.png',
      linkedin:"www.linkedin.com/in/juan-bautista-maría-beck",
      GitHub:"https://github.com/JBautistaBeck"
    },
    {
      name: 'TU NOMBRE AQUI',
      role: 'Back-End Developer',
      email: 'TU EMAIL AQUI',
      imageUrl:
        '/logo.jpg',
      linkedin:"TU LINKEDIN AQUI",
      GitHub:"TU GIT HUB AQUI"
    },
    {
      name: 'TU NOMBRE AQUI',
      role: 'Back-End Developer',
      email: 'TU EMAIL AQUI',
      imageUrl:
        '/logo.jpg',
      linkedin:"TU LINKEDIN AQUI",
      GitHub:"TU GIT HUB AQUI"
    },
    {
      name: 'TU NOMBRE AQUI',
      role: 'Back-End Developer',
      email: 'TU EMAIL AQUI',
      imageUrl:
        '/logo.jpg',
      linkedin:"TU LINKEDIN AQUI",
      GitHub:"TU GIT HUB AQUI"
    },

    // More people...
  ]
  
  export default function Developers() {
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Equipo de desarrolladores.</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
            Nuestro talentoso equipo de desarrollo está conformado por ocho apasionados profesionales de la tecnología, divididos equitativamente entre cuatro expertos en el desarrollo back-end y cuatro especialistas en el desarrollo front-end. Juntos, fusionamos la creatividad y la lógica para crear soluciones digitales innovadoras y altamente funcionales. Nuestra colaboración sinérgica garantiza que podamos diseñar y construir aplicaciones web y sistemas robustos que no solo cautivan visualmente, sino que también funcionan de manera eficiente en su núcleo. Estamos comprometidos con la excelencia en cada línea de código y en cada detalle de diseño, con el objetivo de superar las expectativas de nuestros clientes y usuarios finales.
            </p>
          </div>
          <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
            {people.map((person) => (
              <li key={person.name}>
                <div className="flex items-center gap-x-6">
                  <img className="h-40 w-36 rounded-full" src={person.imageUrl} alt="" />
                  <div>
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                    <p className="text-sm font-semibold leading-6 text-indigo-600">{person.role}</p>
                    <p className="text-sm font-semibold leading-6 text-indigo-600">{person.email}</p>
                    <p className="text-sm font-semibold leading-6 text-indigo-600">{person.linkedin}</p>
                    <p className="text-sm font-semibold leading-6 text-indigo-600">{person.GitHub}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
  