import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  _id: string;
  name: string;
  price: number;
  clothing_image: string;
}

interface HomePageProps {
  offers: Product[];
  latestProducts: Product[];
}

export default async function HomePage() {
  let offers: Product[] = [];
  let latestProducts: Product[] = [];
  let error: string | null = null;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product/homepage`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
      cache: 'no-store', // Para asegurarse de que los datos no se almacenen en caché
    });

    if (!response.ok) {
      throw new Error(`Error al obtener productos del backend: ${response.statusText}`);
    }

    const dataApi = await response.json();

    offers = dataApi.data.discount_products || [];
    latestProducts = dataApi.data.featured_products || [];
  } catch (error: any) {
    error = error.message;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div>
      <Head>
        <title>Inicio | Fiji Swimwear</title>
        <meta name="description" content="Tienda de ropa de playa moderna y elegante" />
      </Head>

      {/* Sección de introducción */}
      <section className="bg-beige py-12 px-4 sm:px-8 lg:px-0">
        <div className="text-center my-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">Descubre nuestra nueva colección</h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6">Ropa de playa moderna y elegante para cada ocasión</p>
          <button className="px-6 py-3 sm:px-8 sm:py-4 bg-lightGray text-black text-lg rounded-full transition-all duration-300 hover:bg-beige hover:scale-105">
            Comprar Ahora
          </button>
        </div>
      </section>

      {/* Sección de Ofertas */}
      <section className="my-16 px-4 sm:px-8 lg:px-0">
        <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-left">Ofertas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {offers.map((offer) => (
            <Link key={offer._id} href={`/products/${offer._id}`} className="block">
              <div className="border rounded-lg shadow-lg overflow-hidden bg-whitePink transform hover:scale-105 transition-transform duration-300" style={{ width: '100%', maxWidth: '320px', height: '550px' }}>
                <div className="h-3/4">
                  <Image src={offer.clothing_image} alt={offer.name} width={320} height={400} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 text-center h-1/4 flex flex-col justify-center">
                  <h2 className="text-xl font-semibold mb-2">{offer.name}</h2>
                  <p className="text-lg sm:text-xl">S/. {offer.price.toFixed(2)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Sección de Últimos Productos */}
      <section className="my-16 px-4 sm:px-8 lg:px-0">
        <h2 className="text-3xl sm:text-4xl font-bold mb-10">Últimos Productos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {latestProducts.map((product) => (
            <Link key={product._id} href={`/products/${product._id}`} className="block">
              <div className="border rounded-lg shadow-lg overflow-hidden bg-whitePink transform hover:scale-105 transition-transform duration-300" style={{ width: '100%', maxWidth: '320px', height: '550px' }}>
                <div className="h-3/4">
                  <Image src={product.clothing_image} alt={product.name} width={320} height={400} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 text-center h-1/4 flex flex-col justify-center">
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                  <p className="text-lg sm:text-xl">S/. {product.price.toFixed(2)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
