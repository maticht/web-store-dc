import {connect} from "@/db/db";
import Product from "@/models/productModel";
import {NextRequest, NextResponse} from "next/server";
import {IProduct} from "@/types/Product";
import {ITokenData} from "@/types/TokenData";
import {getDataFromToken} from "@/helpers/getDataFromToken";
import {log} from "util";
import {currentUser, isAdmin} from "@/lib/auth";
import User from "@/models/userModel";
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_API_SECRET,
})

const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto",
};

connect()

export async function POST(request: NextRequest) {
    try {

        const user = await currentUser();

        if(!user){
            return NextResponse.json({error: "Unauthorized."}, {status: 401})
        }

        const userDB = await User.findById(user.id)

        if(!userDB){
            return NextResponse.json({error: "Unauthorized."}, {status: 401})
        }

        if(user?.isAdmin === false){
            return NextResponse.json({error: "Forbidden. You don't have administrator rights."}, {status: 403})
        }

        const data = await request.formData();

        //console.log(data)

        const title = data.get('title');
        const product = await Product.findOne({title});
        if (product) {
            return NextResponse.json({error: "Product already exist"}, {status: 400})
        }

        const description = data.get('description');
        const price = data.get('price');
        const category = data.get('category');
        const collection = data.get('collection');
        const sex = data.get('sex');
        const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => ({
            size: size,
            amount: data.get(size),
        }));

        const additionalInformation = [];

        data.forEach((value, key) => {
            if (typeof key === 'string' && key.startsWith('additionalInformation')) {
                const [index, field] = key
                    .match(/additionalInformation\[(\d+)\]\.(title|description)/)
                    .slice(1);

                if (!additionalInformation[index]) {
                    additionalInformation[index] = {};
                }

                additionalInformation[index][field] = value;
            }
        });

        console.log(additionalInformation)
        console.log("Title:", title);
        console.log("Description:", description);
        console.log("Price:", price);
        console.log("Sizes:", sizes);

        const promises = [];
        // @ts-ignore
        data.forEach((value, key) => {
            if (typeof key === 'string' && key.startsWith('picturesFiles[')) {
                const fileValue = value as File;
                promises.push(
                    cloudinary.uploader.upload(fileValue, opts, { folder: 'my-folder' })
                        .then((res) => res.secure_url)
                );
            }
        });

        const picturesNames = await Promise.all(promises);

        const newProduct = new Product({
            title: title,
            description: description,
            price:price,
            category:category,
            collection: collection,
            sex:sex,
            sizes: sizes,
            pictures: picturesNames,
            additionalInformation: additionalInformation
        })

        const savedProduct = await newProduct.save();
        //console.log(savedProduct);


        return NextResponse.json({
            message: "Product created successfully",
            success: true,
            savedProduct
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

export async function DELETE(request: NextRequest) {
    try {

        const user = await currentUser();

        if(!user){
            return NextResponse.json({error: "Unauthorized."}, {status: 401})
        }

        const userDB = await User.findById(user.id)

        if(!userDB){
            return NextResponse.json({error: "Unauthorized."}, {status: 401})
        }

        if(user?.isAdmin === false){
            return NextResponse.json({error: "Forbidden. You don't have administrator rights."}, {status: 403})
        }

        const reqBody: IProduct = await request.json()
        const {
            id
        } = reqBody;

        console.log(reqBody)

        const product = await Product.findById(id);
        if (!product) {
            return NextResponse.json({error: "No such product"}, {status: 400})
        }
        const deletedProduct = await Product.findByIdAndDelete(id);
        return NextResponse.json({error: "Product successfully deleted"}, {status: 200})
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

export async function GET(){
    try{

        const user = await currentUser();

        if(!user){
            return NextResponse.json({error: "Unauthorized."}, {status: 401})
        }

        const userDB = await User.findById(user.id)

        if(!userDB){
            return NextResponse.json({error: "Unauthorized."}, {status: 401})
        }

        if(user?.isAdmin === false){
            return NextResponse.json({error: "Forbidden. You don't have administrator rights."}, {status: 403})
        }

        const products:IProduct[] = await Product.find();
        return NextResponse.json({
            message: "All products",
            success: true,
            products
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}