import { notFound } from 'next/navigation';
import { ThemeContext } from '@/context/ThemeProvider';

const getItemById = async (id) => {
  //dummy for now!!
  const mockItem = {
    id,
    name: 'Red Party Dress',
    description: 'Stylish dress for parties. Size M. Gently used.',
    images: [
      '/images/dress1.jpg',
      '/images/dress2.jpg',
      '/images/dress3.jpg',
    ],
    uploader: 'Jane Doe',
    status: 'Available',
    points: 40,
  };

  return mockItem;
};

export default async function ItemDetailPage({ params }) {
  const item = await getItemById(params.id);

  if (!item) return notFound();

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white dark:bg-gray-900 text-black dark:text-white rounded-2xl shadow-md">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col gap-4">
          <img
            src={item.images[0]}
            alt="Main product"
            className="w-96 h-96 object-cover rounded-xl border"
          />
          <div className="flex gap-2">
            {item.images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Thumb ${i}`}
                className="w-20 h-20 object-cover rounded border cursor-pointer hover:scale-105 transition"
              />
            ))}
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-bold">{item.name}</h2>
          <p className="text-gray-700 dark:text-gray-300">{item.description}</p>

          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p><span className="font-semibold">Uploader:</span> {item.uploader}</p>
            <p>
              <span className="font-semibold">Status:</span>{' '}
              <span
                className={`ml-2 px-2 py-1 rounded-full text-white text-xs ${
                  item.status === 'Available' ? 'bg-green-500' : 'bg-red-500'
                }`}
              >
                {item.status}
              </span>
            </p>
          </div>

          <div className="flex gap-4 mt-4">
            <button className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700">
              Swap Request
            </button>
            <button className="px-4 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700">
              Redeem for {item.points} pts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
