import dbConnect from "@/lib/dbConnect";
import Cloth from "@/model/cloth";
import User from "@/model/user";

export async function GET(req) {
  try {
    console.log('Fetching cloths...');
    await dbConnect();

    const cloths = await Cloth.find({});

    const lists = await Promise.all(cloths.map(async (cloth) => {
      const user = await User.findById(cloth.Uploader).select("-password");

      return {
        id: cloth._id.toString(),
        title: cloth.title,
        description: cloth.description,
        size: cloth.size,
        condition: cloth.condition,
        type: cloth.type,
        seller: user,
        points: cloth.points,
        tags: cloth.tags,
        images: cloth.images,
        createdAt: cloth.createdAt,
        updatedAt: cloth.updatedAt,
        category: cloth.category,
        status: cloth.status,
      };
    }));

    return new Response(JSON.stringify({
      success: true,
      message: "Cloths fetched successfully",
      data: lists,
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error('Error fetching cloths:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to fetch cloths'
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
