import { cloudinary } from "@/lib/cloudinary";

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');

        if (file) {
            // Convert file to buffer
            const buffer = await file.arrayBuffer();

            // Convert buffer to base64 string
            const base64String = Buffer.from(buffer).toString('base64');

            // Create data URI
            const dataURI = `data:${file.type};base64,${base64String}`;

            // Upload to Cloudinary
            const uploadResult = await cloudinary.uploader.upload(dataURI, {
                folder: 'reware',
                resource_type: 'image',
            });

            if (!uploadResult || !uploadResult.secure_url) {
                return new Response(JSON.stringify({ success: false, error: "Failed to upload image" }), { status: 500 });
            }


            return new Response(JSON.stringify({ success: true, message: "image_uploaded", image : uploadResult.secure_url }), { status: 200 });
        }

        return new Response(JSON.stringify({ success: false, error: "No valid fields to update" }), { status: 400 });

    } catch (error) {
        console.log("Error in profile picture update route:", error);
        return new Response(JSON.stringify({ success: false, error: "Internal server error" }), { status: 500 });
    }
}