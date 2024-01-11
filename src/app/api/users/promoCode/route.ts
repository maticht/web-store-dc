import {connect} from "@/db/db";
import PromoCode from "@/models/promoCodeModel";
import {NextRequest, NextResponse} from "next/server";
import {currentUser, isAdmin} from "@/lib/auth";
connect()


export async function GET(request: NextRequest) {
    try {
        const user = await currentUser();
        // if(!user){
        //     return NextResponse.json({error: "Unauthorized."}, {status: 401})
        // }
        const allPromoCodes = await PromoCode.find({});
        return NextResponse.json({
            message: "All PromoCodes retrieved successfully",
            promo: allPromoCodes
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}