import { notFound } from 'next/navigation';
import ThemeToggle from '@/app/components/ThemeToggle'

const getItemById = async (id) => {
  //dummy for now!!
  const mockItem = {
    id,
    name: 'Red Party Dress',
    description: 'A stunning red party dress perfect for festive occasions, evening events, and celebrations. Designed with a flattering silhouette, this dress features delicate sequin accents and a comfortable fit for size M. It has been gently worn and is in great condition with no visible damage or stains. The fabric is soft, breathable, and moves gracefully, making it an elegant and stylish choice for any event. Ideal for someone looking to make a statement while staying sustainable by embracing pre-loved fashion.',
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
  const previousItems = [
    {
      id: '101',
      name: 'Blue Casual Shirt',
      description: 'Cotton shirt, very comfy, size L',
      image: '/images/shirt1.jpg',
      points: 20,
    },
    {
      id: '102',
      name: 'Black Leather Jacket',
      description: 'Stylish jacket for winter. Size M.',
      image: '/images/jacket1.jpg',
      points: 60,
    },
    {
      id: '103',
      name: 'Floral Summer Dress',
      description: 'Breezy and colorful. Size S.',
      image: '/images/summer1.jpg',
      points: 30,
    },
  ];
  
  if (!item) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900 transition-all duration-500">

      <div className="flex justify-between items-center p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Item Details</h1>
        <ThemeToggle />
      </div>

      <div className="p-6 max-w-6xl mx-auto">
        <div className="bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm text-slate-800 dark:text-slate-100 rounded-2xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col gap-4">
                <img
                  src={item.images[0]}
                  alt="Main product"
                  className="w-96 h-96 object-cover rounded-xl border-2 border-slate-200 dark:border-slate-600 shadow-xl"
                />
                <div className="flex gap-2">
                  {item.images.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`Thumb ${i}`}
                      className="w-20 h-20 object-cover rounded-lg border-2 border-slate-200 dark:border-slate-600 cursor-pointer hover:scale-105 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 shadow-md"
                    />
                  ))}
                </div>
              </div>

              <div className="flex-1 space-y-6">
                <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100">{item.name}</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">{item.description}</p>

                <div className="text-sm text-slate-500 dark:text-slate-400 space-y-3 bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
                  <p><span className="font-semibold text-slate-700 dark:text-slate-300">Uploader:</span> {item.uploader}</p>
                  <p>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Status:</span>{' '}
                    <span
                      className={`ml-2 px-3 py-1 rounded-full text-white text-xs font-medium ${
                        item.status === 'Available' 
                          ? 'bg-emerald-500 dark:bg-emerald-600' 
                          : 'bg-red-500 dark:bg-red-600'
                      }`}
                    >
                      {item.status}
                    </span>
                  </p>
                </div>

                <div className="flex gap-4 mt-8">
                  <button className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    Swap Request
                  </button>
                  <button className="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    Redeem for {item.points} pts
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recommendations Section */}
        <div className="mt-12 bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 p-8">
          <h3 className="text-2xl font-semibold mb-8 text-slate-900 dark:text-slate-100">Other Items You May Like</h3>
          <div className="flex overflow-x-auto gap-6 pb-4">
            {previousItems.map((prevItem) => (
              <div
                key={prevItem.id}
                className="min-w-[240px] bg-slate-50/80 dark:bg-slate-700/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl border border-slate-200/50 dark:border-slate-600/50 p-5 hover:scale-[1.03] transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              >
                <img
                  src={prevItem.image}
                  alt={prevItem.name}
                  className="w-full h-40 object-cover rounded-lg mb-4 border border-slate-200 dark:border-slate-500 shadow-md"
                />
                <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">{prevItem.name}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 truncate mb-3">
                  {prevItem.description}
                </p>
                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  {prevItem.points} pts
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}